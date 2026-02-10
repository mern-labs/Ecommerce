import React, { useState, useEffect } from "react";
import { useData } from "../context/Usecontext";
import { useLocation, useNavigate } from "react-router-dom";
import apiInstance from "../interceptor/interceptor";
import { makeOrder } from "../interceptor/interceptor";
import { toast } from "react-toastify";

const Checkout = () => {
  const { cart, fetchProductById, clearCart, fetchOrders, user } = useData();
  const location = useLocation();
  const navigate = useNavigate();

  const [checkoutCart, setCheckoutCart] = useState([]);
  const [loading, setLoading] = useState(false);
  const [payment, setPayment] = useState("cod");

  // Saved Addresses State
  const [savedAddresses, setSavedAddresses] = useState([]);
  const [selectedAddressId, setSelectedAddressId] = useState(null);
  const [showAddressForm, setShowAddressForm] = useState(false);

  // ✅ User Details State - MUST include address
  const [userDetails, setUserDetails] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",  // ✅ CRITICAL - Must be here
    city: "",
    state: "",
    pincode: "",
    country: "India",
  });

  const [errors, setErrors] = useState({});

  // Load saved addresses
  useEffect(() => {
    const loadSavedAddresses = () => {
      const saved = localStorage.getItem("savedAddresses");
      if (saved) {
        const addresses = JSON.parse(saved);
        setSavedAddresses(addresses);
        if (addresses.length > 0 && !selectedAddressId) {
          setSelectedAddressId(addresses[0].id);
          setUserDetails(addresses[0].details);
        }
      }
    };
    loadSavedAddresses();
  }, []);

  // Init cart
  useEffect(() => {
    const initCheckout = async () => {
      if (location.state?.buyNowItems) {
        const productsWithFullData = await Promise.all(
          location.state.buyNowItems.map(async (item) => {
            if (!item.name) {
              const full = await fetchProductById(item._id);
              return { ...full, quantity: item.quantity || 1 };
            }
            return item;
          })
        );
        setCheckoutCart(productsWithFullData);
      } else {
        setCheckoutCart(cart);
      }
    };
    initCheckout();
  }, [cart, location.state, fetchProductById]);

  // Pre-fill user details
  useEffect(() => {
    if (user && savedAddresses.length === 0) {
      setUserDetails((prev) => ({
        ...prev,
        name: user.name || "",
        email: user.email || "",
      }));
    }
  }, [user, savedAddresses]);

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserDetails({ ...userDetails, [name]: value });
    if (errors[name]) {
      setErrors({ ...errors, [name]: "" });
    }
  };

  // Validate form
  const validateForm = () => {
    const newErrors = {};

    if (!userDetails.name.trim()) {
      newErrors.name = "Name is required";
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!userDetails.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!emailRegex.test(userDetails.email)) {
      newErrors.email = "Invalid email format";
    }

    const phoneRegex = /^[0-9]{10}$/;
    if (!userDetails.phone.trim()) {
      newErrors.phone = "Phone number is required";
    } else if (!phoneRegex.test(userDetails.phone)) {
      newErrors.phone = "Phone number must be 10 digits";
    }

    // ✅ CRITICAL - Check address
    if (!userDetails.address.trim()) {
      newErrors.address = "Address is required";
    }

    const pincodeRegex = /^[0-9]{6}$/;
    if (!userDetails.pincode.trim()) {
      newErrors.pincode = "Pincode is required";
    } else if (!pincodeRegex.test(userDetails.pincode)) {
      newErrors.pincode = "Pincode must be 6 digits";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Save address
  const saveAddress = () => {
    if (!validateForm()) {
      toast.error("Please fill all required fields correctly");
      return;
    }

    const newAddress = {
      id: Date.now().toString(),
      details: { ...userDetails },
    };

    const updatedAddresses = [...savedAddresses, newAddress];
    setSavedAddresses(updatedAddresses);
    localStorage.setItem("savedAddresses", JSON.stringify(updatedAddresses));

    setSelectedAddressId(newAddress.id);
    setShowAddressForm(false);
    toast.success("Address saved successfully! 📍");
  };

  // Select address
  const selectAddress = (addressId) => {
    setSelectedAddressId(addressId);
    const selected = savedAddresses.find((addr) => addr.id === addressId);
    if (selected) {
      setUserDetails(selected.details);
    }
  };

  // Delete address
  const deleteAddress = (addressId) => {
    const updatedAddresses = savedAddresses.filter(
      (addr) => addr.id !== addressId
    );
    setSavedAddresses(updatedAddresses);
    localStorage.setItem("savedAddresses", JSON.stringify(updatedAddresses));

    if (selectedAddressId === addressId) {
      if (updatedAddresses.length > 0) {
        setSelectedAddressId(updatedAddresses[0].id);
        setUserDetails(updatedAddresses[0].details);
      } else {
        setSelectedAddressId(null);
        setShowAddressForm(true);
        setUserDetails({
          name: user?.name || "",
          email: user?.email || "",
          phone: "",
          address: "",
          city: "",
          state: "",
          pincode: "",
          country: "India",
        });
      }
    }

    toast.info("Address deleted");
  };

  // Add new address
  const addNewAddress = () => {
    setShowAddressForm(true);
    setSelectedAddressId(null);
    setUserDetails({
      name: user?.name || "",
      email: user?.email || "",
      phone: "",
      address: "",
      city: "",
      state: "",
      pincode: "",
      country: "India",
    });
  };

  // Cancel address form
  const cancelAddressForm = () => {
    setShowAddressForm(false);
    if (savedAddresses.length > 0) {
      setSelectedAddressId(savedAddresses[0].id);
      setUserDetails(savedAddresses[0].details);
    }
  };

  // Remove product
  const removeProduct = (id) => {
    setCheckoutCart((prev) => prev.filter((item) => item._id !== id));
    toast.info("Item removed from checkout");
  };

  // Price calculation
  const totalPrice = checkoutCart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const tax = Math.round(totalPrice * 0.05);
  const delivery = totalPrice > 999 ? 0 : 49;
  const grandTotal = totalPrice + tax + delivery;

  // ✅ PLACE ORDER - FIXED with detailed logging
  const placeOrder = async () => {
    if (!validateForm()) {
      toast.error("Please fill all required fields correctly");
      return;
    }

    if (checkoutCart.length === 0) {
      toast.warning("Your cart is empty");
      return;
    }

    try {
      setLoading(true);

      // ✅ Build order payload with all fields
      const orderPayload = {
        items: checkoutCart.map((item) => ({
          product: item._id,
          quantity: item.quantity,
          price: item.price,
        })),
        totalAmount: grandTotal,
        userDetails: {
          name: userDetails.name.trim(),
          email: userDetails.email.trim().toLowerCase(),
          phone: userDetails.phone.trim(),
          address: userDetails.address.trim(),  // ✅ ENSURE THIS IS INCLUDED
          city: userDetails.city.trim(),
          state: userDetails.state.trim(),
          pincode: userDetails.pincode.trim(),
          country: userDetails.country,
        },
        paymentMethod: payment,
      };

      // 🔍 DEBUG: Log what we're sending
      console.log("📦 Order Payload:", JSON.stringify(orderPayload, null, 2));
      console.log("Address field:", orderPayload.userDetails.address);

      // Make the order
      const response = await makeOrder(orderPayload);

      console.log("✅ Order Response:", response);

      toast.success("Order placed successfully 🎉");

      setCheckoutCart([]);

      if (location.state?.fromCart) {
        clearCart();
      }

      if (fetchOrders) {
        await fetchOrders();
      }

      setTimeout(() => {
        navigate("/orders");
      }, 500);
    } catch (err) {
      console.error("❌ Order error:", err);
      toast.error(err.response?.data?.message || "Order failed. Try again.");
    } finally {
      setLoading(false);
    }
  };

  // Empty cart UI
  if (checkoutCart.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-gray-500 px-4">
        <div className="text-5xl sm:text-6xl mb-4">🛒</div>
        <p className="text-lg sm:text-xl font-semibold text-center">
          Your cart is empty
        </p>
        <button
          onClick={() => navigate("/")}
          className="mt-6 px-6 py-2 bg-pink-500 text-white rounded-lg hover:bg-pink-600 transition"
        >
          Continue Shopping
        </button>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen p-4 sm:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-6 sm:mb-8">
          Checkout
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
          {/* LEFT SECTION */}
          <div className="lg:col-span-2 space-y-6">
            {/* CART ITEMS */}
            <div className="space-y-4">
              <h2 className="text-xl sm:text-2xl font-semibold">
                Order Items ({checkoutCart.length})
              </h2>
              {checkoutCart.map((item) => (
                <div
                  key={item._id}
                  className="flex flex-col sm:flex-row gap-4 sm:gap-5 bg-white p-4 sm:p-5 rounded-xl sm:rounded-2xl shadow-md hover:shadow-lg transition"
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full sm:w-24 md:w-32 h-48 sm:h-24 md:h-32 object-cover rounded-lg"
                  />

                  <div className="flex-1">
                    <h3 className="text-lg sm:text-xl font-semibold line-clamp-2">
                      {item.name}
                    </h3>
                    <p className="text-gray-500 text-sm sm:text-base mt-1">
                      Quantity: {item.quantity}
                    </p>
                    <p className="text-base sm:text-lg font-bold text-pink-600 mt-2">
                      ₹{item.price * item.quantity}
                    </p>

                    <button
                      onClick={() => removeProduct(item._id)}
                      className="mt-3 text-red-500 font-semibold hover:underline text-sm sm:text-base"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* SAVED ADDRESSES */}
            {!showAddressForm && savedAddresses.length > 0 && (
              <div className="bg-white p-4 sm:p-6 rounded-xl sm:rounded-2xl shadow-md">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-xl sm:text-2xl font-bold">
                    Saved Addresses
                  </h2>
                  <button
                    onClick={addNewAddress}
                    className="px-4 py-2 bg-pink-500 text-white rounded-lg hover:bg-pink-600 transition text-sm sm:text-base"
                  >
                    + Add New
                  </button>
                </div>

                <div className="space-y-3">
                  {savedAddresses.map((addr) => (
                    <div
                      key={addr.id}
                      className={`p-4 border-2 rounded-lg cursor-pointer transition ${
                        selectedAddressId === addr.id
                          ? "border-pink-500 bg-pink-50"
                          : "border-gray-200 hover:border-pink-300"
                      }`}
                      onClick={() => selectAddress(addr.id)}
                    >
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <input
                              type="radio"
                              checked={selectedAddressId === addr.id}
                              onChange={() => selectAddress(addr.id)}
                              className="w-4 h-4 text-pink-500"
                            />
                            <h3 className="font-semibold text-base sm:text-lg">
                              {addr.details.name}
                            </h3>
                          </div>
                          <p className="text-sm text-gray-600 ml-6">
                            {addr.details.phone}
                          </p>
                          <p className="text-sm text-gray-600 ml-6">
                            {addr.details.address}, {addr.details.city},{" "}
                            {addr.details.state} - {addr.details.pincode}
                          </p>
                        </div>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            deleteAddress(addr.id);
                          }}
                          className="text-red-500 hover:text-red-700 p-2"
                        >
                          🗑️
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* ADDRESS FORM */}
            {(showAddressForm || savedAddresses.length === 0) && (
              <>
                {/* PERSONAL INFO */}
                <div className="bg-white p-4 sm:p-6 rounded-xl sm:rounded-2xl shadow-md">
                  <h2 className="text-xl sm:text-2xl font-bold mb-4">
                    Personal Information
                  </h2>

                  <div className="space-y-4">
                    {/* Name */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Full Name <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={userDetails.name}
                        onChange={handleChange}
                        placeholder="Enter your full name"
                        className={`w-full px-3 sm:px-4 py-2 sm:py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 text-sm sm:text-base ${
                          errors.name ? "border-red-500" : "border-gray-300"
                        }`}
                      />
                      {errors.name && (
                        <p className="text-red-500 text-xs sm:text-sm mt-1">
                          {errors.name}
                        </p>
                      )}
                    </div>

                    {/* Email & Phone */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Email <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="email"
                          name="email"
                          value={userDetails.email}
                          onChange={handleChange}
                          placeholder="your.email@example.com"
                          className={`w-full px-3 sm:px-4 py-2 sm:py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 text-sm sm:text-base ${
                            errors.email ? "border-red-500" : "border-gray-300"
                          }`}
                        />
                        {errors.email && (
                          <p className="text-red-500 text-xs sm:text-sm mt-1">
                            {errors.email}
                          </p>
                        )}
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Phone <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="tel"
                          name="phone"
                          value={userDetails.phone}
                          onChange={handleChange}
                          placeholder="10-digit number"
                          maxLength="10"
                          className={`w-full px-3 sm:px-4 py-2 sm:py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 text-sm sm:text-base ${
                            errors.phone ? "border-red-500" : "border-gray-300"
                          }`}
                        />
                        {errors.phone && (
                          <p className="text-red-500 text-xs sm:text-sm mt-1">
                            {errors.phone}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                {/* DELIVERY ADDRESS */}
                <div className="bg-white p-4 sm:p-6 rounded-xl sm:rounded-2xl shadow-md">
                  <h2 className="text-xl sm:text-2xl font-bold mb-4">
                    Delivery Address
                  </h2>

                  <div className="space-y-4">
                    {/* ✅ ADDRESS FIELD - CRITICAL */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Address <span className="text-red-500">*</span>
                      </label>
                      <textarea
                        name="address"
                        value={userDetails.address}
                        onChange={handleChange}
                        placeholder="House No., Street, Area, Landmark"
                        rows="3"
                        className={`w-full px-3 sm:px-4 py-2 sm:py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 text-sm sm:text-base ${
                          errors.address ? "border-red-500" : "border-gray-300"
                        }`}
                      />
                      {errors.address && (
                        <p className="text-red-500 text-xs sm:text-sm mt-1">
                          {errors.address}
                        </p>
                      )}
                    </div>

                    {/* City & State */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          City
                        </label>
                        <input
                          type="text"
                          name="city"
                          value={userDetails.city}
                          onChange={handleChange}
                          placeholder="Enter city"
                          className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 text-sm sm:text-base"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          State
                        </label>
                        <input
                          type="text"
                          name="state"
                          value={userDetails.state}
                          onChange={handleChange}
                          placeholder="Enter state"
                          className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 text-sm sm:text-base"
                        />
                      </div>
                    </div>

                    {/* Pincode & Country */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Pincode <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          name="pincode"
                          value={userDetails.pincode}
                          onChange={handleChange}
                          placeholder="6-digit pincode"
                          maxLength="6"
                          className={`w-full px-3 sm:px-4 py-2 sm:py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 text-sm sm:text-base ${
                            errors.pincode
                              ? "border-red-500"
                              : "border-gray-300"
                          }`}
                        />
                        {errors.pincode && (
                          <p className="text-red-500 text-xs sm:text-sm mt-1">
                            {errors.pincode}
                          </p>
                        )}
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Country
                        </label>
                        <input
                          type="text"
                          name="country"
                          value={userDetails.country}
                          onChange={handleChange}
                          className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 text-sm sm:text-base"
                        />
                      </div>
                    </div>

                    {showAddressForm && (
                      <button
                        onClick={saveAddress}
                        className="w-full py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 transition font-semibold"
                      >
                        💾 Save This Address
                      </button>
                    )}
                  </div>
                </div>
              </>
            )}

            {/* PAYMENT METHOD */}
            <div className="bg-white p-4 sm:p-6 rounded-xl sm:rounded-2xl shadow-md">
              <h2 className="text-xl sm:text-2xl font-bold mb-4">
                Payment Method
              </h2>
              <div className="space-y-3">
                <label className="flex items-center space-x-3 cursor-pointer p-3 border rounded-lg hover:bg-gray-50 transition">
                  <input
                    type="radio"
                    name="payment"
                    value="cod"
                    checked={payment === "cod"}
                    onChange={(e) => setPayment(e.target.value)}
                    className="w-4 h-4 text-pink-500 focus:ring-pink-500"
                  />
                  <div className="flex-1">
                    <p className="font-semibold text-sm sm:text-base">
                      Cash on Delivery (COD)
                    </p>
                    <p className="text-xs sm:text-sm text-gray-500">
                      Pay when you receive
                    </p>
                  </div>
                </label>

                <label className="flex items-center space-x-3 cursor-pointer p-3 border rounded-lg hover:bg-gray-50 transition">
                  <input
                    type="radio"
                    name="payment"
                    value="online"
                    checked={payment === "online"}
                    onChange={(e) => setPayment(e.target.value)}
                    className="w-4 h-4 text-pink-500 focus:ring-pink-500"
                  />
                  <div className="flex-1">
                    <p className="font-semibold text-sm sm:text-base">
                      Online Payment
                    </p>
                    <p className="text-xs sm:text-sm text-gray-500">
                      Credit/Debit Card, UPI, Net Banking
                    </p>
                  </div>
                </label>
              </div>
            </div>
          </div>

          {/* RIGHT SECTION - Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white p-4 sm:p-6 rounded-xl sm:rounded-2xl shadow-md lg:sticky lg:top-50">
              <h2 className="text-xl sm:text-2xl font-bold mb-6">
                Order Summary
              </h2>

              <div className="space-y-3 text-sm sm:text-base">
                <div className="flex justify-between">
                  <span className="text-gray-600">
                    Subtotal ({checkoutCart.length} items)
                  </span>
                  <span className="font-semibold">₹{totalPrice}</span>
                </div>

                <div className="flex justify-between">
                  <span className="text-gray-600">Tax (5%)</span>
                  <span className="font-semibold">₹{tax}</span>
                </div>

                <div className="flex justify-between">
                  <span className="text-gray-600">Delivery</span>
                  <span className="font-semibold text-green-600">
                    {delivery === 0 ? "FREE" : `₹${delivery}`}
                  </span>
                </div>

                <div className="border-t pt-3 mt-3 flex justify-between text-lg sm:text-xl font-bold">
                  <span>Total</span>
                  <span className="text-pink-600">₹{grandTotal}</span>
                </div>
              </div>

              <button
                onClick={placeOrder}
                disabled={loading}
                className={`mt-6 w-full py-3 sm:py-4 rounded-xl text-base sm:text-lg font-bold text-white transition-all ${
                  loading
                    ? "bg-pink-400 cursor-not-allowed opacity-70"
                    : "bg-linear-to-r from-pink-500 to-red-500 hover:shadow-lg hover:scale-105 active:scale-95"
                }`}
              >
                {loading ? (
                  <span className="flex items-center justify-center gap-2">
                    <div className="animate-spin h-5 w-5 border-2 border-white border-t-transparent rounded-full"></div>
                    Placing Order...
                  </span>
                ) : (
                  "Place Order"
                )}
              </button>

              <div className="mt-4 flex items-center justify-center gap-2 text-xs sm:text-sm text-gray-500">
                <svg
                  className="w-4 h-4"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                    clipRule="evenodd"
                  />
                </svg>
                <span>Secure Checkout</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;