import React, { useEffect, useState } from "react";
import rotatingLogo from "../assets/saree logo.png";
import cornerLogo from "../assets/Logo_Fonts.png";
import Button from "./Button";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useData } from "../context/Usecontext";
import addtocartIcon from "../assets/addtocart.png";
import wishlistIcon from "../assets/wishlist.png";
import apiInstance from "../interceptor/interceptor";
import { getOrder } from "../interceptor/interceptor";

const Navbar = () => {
  const [mounted, setMounted] = useState(false);
  const [activeMenu, setActiveMenu] = useState("Home");
  const [flip, setFlip] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileSearchOpen, setMobileSearchOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [orderNotifications, setOrderNotifications] = useState([]);
  const [readNotifications, setReadNotifications] = useState(new Set());

  const { user, logout, cart, wishlist, order } = useData();
  const navigate = useNavigate();
  const location = useLocation();
  const baseURL = apiInstance.defaults.baseURL;

  useEffect(() => setMounted(true), []);
  
  useEffect(() => {
    const interval = setInterval(() => setFlip((prev) => !prev), 2000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const fetchOrderNotifications = async () => {
      if (user) {
        try {
          const res = await getOrder();
          const orders = res.orders || [];
          
          const notifications = orders.map(order => ({
            id: order._id,
            type: "order",
            orderId: order._id,
            status: order.status,
            totalAmount: order.totalAmount,
            itemCount: order.items?.length || 0,
            createdAt: order.createdAt,
            items: order.items,
          }));
          
          setOrderNotifications(notifications);
        } catch (err) {
          console.log("Failed to fetch order notifications:", err.message);
        }
      }
    };
    
    fetchOrderNotifications();
  }, [user, order]);

  // ✅ FIXED: Scroll detection with debouncing to prevent jitter
  useEffect(() => {
    let ticking = false;
    
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          // Logo hides when scrolled more than 80px
          setIsScrolled(window.scrollY > 80);
          ticking = false;
        });
        ticking = true;
      }
    };
    
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const path = location.pathname;
    if (path === "/home" || path === "/") {
      setActiveMenu("Home");
    } else if (path === "/shop") {
      setActiveMenu("Shop");
    } else if (path.startsWith("/products")) {
      setActiveMenu("products");
    } else if (path === "/about") {
      setActiveMenu("About");
    } else if (path === "/contact") {
      setActiveMenu("Contact");
    }
    
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [location]);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setMobileMenuOpen(false);
        setMobileSearchOpen(false);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (notificationsOpen && !event.target.closest('.notification-container')) {
        setNotificationsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [notificationsOpen]);

  const handleLogout = () => {
    logout();
    setMobileMenuOpen(false);
    navigate("/home");
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;
    navigate(`/shop?search=${searchQuery}`);
    setMobileSearchOpen(false);
    setMobileMenuOpen(false);
  };

  const handleMenuClick = (itemName) => {
    setActiveMenu(itemName);
    setMobileMenuOpen(false);
  };

  const markAsRead = (id) => {
    setReadNotifications(prev => new Set([...prev, id]));
  };

  const markAllAsRead = () => {
    const allIds = orderNotifications.map(n => n.id);
    setReadNotifications(new Set(allIds));
  };

  const handleNotificationClick = (notification) => {
    markAsRead(notification.id);
    setNotificationsOpen(false);
    setMobileMenuOpen(false);
    navigate("/orders");
  };

  const unreadCount = orderNotifications.filter(n => !readNotifications.has(n.id)).length;

  const getNotificationMessage = (notification) => {
    const itemText = notification.itemCount === 1 ? "item" : "items";
    return `Order #${notification.orderId.slice(-6)} - ${notification.itemCount} ${itemText} - ₹${notification.totalAmount}`;
  };

  const getNotificationTime = (createdAt) => {
    const now = new Date();
    const orderDate = new Date(createdAt);
    const diffMs = now - orderDate;
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 60) return `${diffMins} min${diffMins !== 1 ? 's' : ''} ago`;
    if (diffHours < 24) return `${diffHours} hour${diffHours !== 1 ? 's' : ''} ago`;
    if (diffDays < 7) return `${diffDays} day${diffDays !== 1 ? 's' : ''} ago`;
    return orderDate.toLocaleDateString();
  };

  const getStatusColor = (status) => {
    switch(status) {
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "processing":
        return "bg-blue-100 text-blue-800";
      case "shipped":
        return "bg-indigo-100 text-indigo-800";
      case "delivered":
        return "bg-green-100 text-green-800";
      default:
        return "bg-red-100 text-red-800";
    }
  };

  const menuItems = [
    { name: "Home", path: "/home" },
    { name: "Shop", path: "/shop" },
    { name: "products", path: "/products/filter" },
    { name: "About", path: "/about" },
    { name: "Contact", path: "/contact" },
  ];

  return (
    <header className={`w-full sticky top-0 z-50 bg-white shadow-md border-b border-gray-100 transition-all duration-300 ${
      isScrolled ? 'shadow-lg' : ''
    }`}>
      <nav className="max-w-480 mx-auto px-3 sm:px-4 md:px-6 lg:px-6 xl:px-8 2xl:px-12 py-2 lg:py-2.5 xl:py-3">
        
        {/* ✅ FIXED: ROTATING LOGO - Hides on scroll with smooth animation without causing layout shift */}
        <div 
          className={`w-full flex justify-center overflow-hidden transition-all duration-500 ease-in-out ${
            isScrolled 
              ? 'h-0 opacity-0' 
              : 'h-12 sm:h-14 md:h-15 lg:h-16 xl:h-18 2xl:h-20 mb-2 lg:mb-2.5 xl:mb-3 opacity-100'
          }`}
        >
          <Link to="/home">
            <img
              src={rotatingLogo}
              alt="Rotating Logo"
              className="h-full object-contain cursor-pointer hover:scale-110 transition-all duration-100"
              style={{
                transform: `rotateY(${flip ? '360deg' : '0deg'}) ${isScrolled ? 'scale(0)' : 'scale(1)'}`,
                transition: "transform 0.6s ease-in-out",
              }}
            />
          </Link>
        </div>

        <div className="w-full flex items-center justify-between gap-2 lg:gap-3 xl:gap-4">
          
          {/* ✅ CORNER LOGO - Grows slightly when scrolled */}
          <Link to="/home" className="flex items-center shrink-0 group">
            <img
              src={cornerLogo}
              alt="Logo"
              className={`w-auto object-contain cursor-pointer transform group-hover:scale-105 transition-all duration-300 ${
                isScrolled 
                  ? 'h-9 sm:h-10 md:h-11 lg:h-11 xl:h-12 2xl:h-13' 
                  : 'h-8 sm:h-9 md:h-10 lg:h-10 xl:h-11 2xl:h-12'
              }`}
            />
          </Link>

          <ul className="hidden lg:flex items-center gap-3 xl:gap-5 2xl:gap-8 flex-1 justify-center mx-2 xl:mx-4">
            {menuItems.map((item, i) => (
              <li key={i} className="transform hover:scale-105 transition-transform duration-200">
                <Link
                  to={item.path}
                  onClick={() => setActiveMenu(item.name)}
                  className={`relative font-semibold uppercase tracking-wide text-[11px] xl:text-xs 2xl:text-sm transition-all duration-300 hover:text-pink-500 group whitespace-nowrap ${
                    activeMenu === item.name ? "text-pink-500" : "text-gray-700"
                  }`}
                >
                  {item.name}
                  <span
                    className={`absolute -bottom-1 left-0 h-0.5 bg-linear-to-r from-pink-500 to-red-500 transition-all duration-300 ${
                      activeMenu === item.name ? "w-full" : "w-0 group-hover:w-full"
                    }`}
                  ></span>
                </Link>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-1.5 sm:gap-2 lg:gap-2 xl:gap-3 2xl:gap-4">
            
            <form
              onSubmit={handleSearch}
              className="hidden lg:flex items-center bg-gray-50 border border-gray-200 rounded-full px-2.5 xl:px-3.5 2xl:px-4 py-1.5 xl:py-1.5 2xl:py-2 focus-within:ring-2 focus-within:ring-pink-400 focus-within:shadow-lg transition-all duration-300"
            >
              <input
                type="text"
                placeholder="Search..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-20 xl:w-28 2xl:w-40 bg-transparent outline-none text-[11px] xl:text-xs 2xl:text-sm text-gray-700 placeholder-gray-400"
              />
              <button
                type="submit"
                className="ml-1.5 xl:ml-2 bg-linear-to-r from-pink-500 to-red-500 text-white px-2 xl:px-2.5 2xl:px-3 py-0.5 xl:py-1 rounded-full text-[10px] xl:text-xs 2xl:text-sm font-semibold hover:from-pink-600 hover:to-red-600 transform hover:scale-105 transition-all duration-300 whitespace-nowrap"
              >
                Search
              </button>
            </form>

            <button
              onClick={() => setMobileSearchOpen(!mobileSearchOpen)}
              className="lg:hidden p-2 hover:bg-gray-100 rounded-full transition-all duration-300 transform hover:scale-110"
              aria-label="Toggle search"
            >
              <svg className="w-5 h-5 sm:w-6 sm:h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </button>

            {!user ? (
              <Link to="/login" className="hidden sm:block">
                <Button
                  text="Login"
                  property="bg-gradient-to-r from-pink-500 to-red-500 hover:from-pink-600 hover:to-red-600 text-white px-3 lg:px-3.5 xl:px-5 2xl:px-6 py-1.5 lg:py-1.5 xl:py-2 2xl:py-2.5 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 font-semibold cursor-pointer text-[11px] lg:text-xs xl:text-sm whitespace-nowrap"
                />
              </Link>
            ) : (
              <div className="hidden sm:flex items-center gap-1 lg:gap-1.5 xl:gap-2 2xl:gap-3">
                
                <div className="relative notification-container">
                  <button
                    onClick={() => setNotificationsOpen(!notificationsOpen)}
                    className={`p-1.5 lg:p-1.5 xl:p-2 rounded-full transition-all duration-300 transform hover:scale-110 ${
                      unreadCount > 0 ? "bg-purple-100 animate-pulse-subtle" : "hover:bg-purple-50"
                    }`}
                  >
                    <svg className="w-5 h-5 lg:w-5 lg:h-5 xl:w-6 xl:h-6 2xl:w-7 2xl:h-7 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                    </svg>
                    {unreadCount > 0 && (
                      <span className="absolute -top-0.5 -right-0.5 lg:-top-1 lg:-right-1 bg-purple-500 text-white text-[9px] lg:text-[10px] xl:text-xs font-bold rounded-full w-4 h-4 lg:w-4 lg:h-4 xl:w-5 xl:h-5 flex items-center justify-center animate-bounce-subtle">
                        {unreadCount}
                      </span>
                    )}
                  </button>
                </div>

                <Link to="/wishlist" className="relative transform hover:scale-110 transition-transform duration-300">
                  <div
                    className={`p-1.5 lg:p-1.5 xl:p-2 rounded-full transition-all duration-300 ${
                      wishlist.length > 0 ? "bg-pink-100 animate-pulse-subtle" : "hover:bg-pink-50"
                    }`}
                  >
                    <img src={wishlistIcon} alt="Wishlist" className="w-5 h-5 lg:w-5 lg:h-5 xl:w-6 xl:h-6 2xl:w-7 2xl:h-7" />
                    {wishlist.length > 0 && (
                      <span className="absolute -top-0.5 -right-0.5 lg:-top-1 lg:-right-1 bg-pink-500 text-white text-[9px] lg:text-[10px] xl:text-xs font-bold rounded-full w-4 h-4 lg:w-4 lg:h-4 xl:w-5 xl:h-5 flex items-center justify-center animate-bounce-subtle">
                        {wishlist.length}
                      </span>
                    )}
                  </div>
                </Link>

                <Link to="/addtocard" className="relative transform hover:scale-110 transition-transform duration-300">
                  <div
                    className={`p-1.5 lg:p-1.5 xl:p-2 rounded-full transition-all duration-300 ${
                      cart.length > 0 ? "bg-green-100 animate-pulse-subtle" : "hover:bg-green-50"
                    }`}
                  >
                    <img src={addtocartIcon} alt="Cart" className="w-5 h-5 lg:w-5 lg:h-5 xl:w-6 xl:h-6 2xl:w-7 2xl:h-7" />
                    {cart.length > 0 && (
                      <span className="absolute -top-0.5 -right-0.5 lg:-top-1 lg:-right-1 bg-green-500 text-white text-[9px] lg:text-[10px] xl:text-xs font-bold rounded-full w-4 h-4 lg:w-4 lg:h-4 xl:w-5 xl:h-5 flex items-center justify-center animate-bounce-subtle">
                        {cart.length}
                      </span>
                    )}
                  </div>
                </Link>

                <div className="hidden lg:block relative group">
                  <div className="flex items-center gap-1 xl:gap-1.5 2xl:gap-2 cursor-pointer px-1.5 xl:px-2 2xl:px-3 py-1 xl:py-1.5 2xl:py-2 rounded-full hover:bg-gray-50 transition-all duration-300 transform hover:scale-105">
                    <div className="w-6 h-6 xl:w-7 xl:h-7 2xl:w-8 2xl:h-8 rounded-full bg-linear-to-r from-pink-500 to-red-500 flex items-center justify-center text-white font-semibold shadow-md text-[10px] xl:text-xs 2xl:text-sm">
                      {user.name?.charAt(0).toUpperCase()}
                    </div>
                    <span className="font-semibold text-gray-700 max-w-15 xl:max-w-20 2xl:max-w-32 truncate text-[11px] xl:text-xs 2xl:text-sm">
                      {user.name}
                    </span>
                  </div>
                  <div className="absolute right-0 mt-2 w-40 xl:w-44 2xl:w-48 bg-white rounded-xl shadow-xl border border-gray-100 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform origin-top scale-95 group-hover:scale-100 overflow-hidden">
                    <div className="p-2 xl:p-2.5 2xl:p-3 border-b border-gray-100 bg-linear-to-r from-pink-50 to-red-50">
                      <p className="text-[11px] xl:text-xs 2xl:text-sm font-semibold text-gray-700 truncate">{user.name}</p>
                      <p className="text-[10px] xl:text-xs text-gray-500 truncate">{user.email}</p>
                    </div>
                    <Link
                      to="/orders"
                      className="flex items-center gap-2 xl:gap-2.5 2xl:gap-3 px-3 xl:px-3.5 2xl:px-4 py-2 xl:py-2 2xl:py-2.5 hover:bg-pink-50 transition-all duration-200 text-gray-700 hover:text-pink-500 transform hover:translate-x-1"
                    >
                      <span className="text-[11px] xl:text-xs 2xl:text-sm font-medium">My Orders</span>
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="w-full flex items-center gap-2 xl:gap-2.5 2xl:gap-3 px-3 xl:px-3.5 2xl:px-4 py-2 xl:py-2 2xl:py-2.5 hover:bg-red-50 transition-all duration-200 text-gray-700 hover:text-red-500 border-t border-gray-100 transform hover:translate-x-1"
                    >
                      <span className="text-[11px] xl:text-xs 2xl:text-sm font-medium">Logout</span>
                    </button>
                  </div>
                </div>
              </div>
            )}

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 hover:bg-gray-100 rounded-lg transition-all duration-300 transform hover:scale-110"
              aria-label="Toggle menu"
            >
              <svg
                className="w-5 h-5 sm:w-6 sm:h-6 text-gray-700 transition-transform duration-300"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                style={{ transform: mobileMenuOpen ? 'rotate(90deg)' : 'rotate(0)' }}
              >
                {mobileMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Notification Dropdown - Shows on both mobile and desktop */}
        {user && notificationsOpen && (
          <div className="fixed left-4 right-4 sm:left-auto sm:right-6 lg:right-8 xl:right-12 top-24 sm:top-20 lg:top-24 w-auto sm:w-80 xl:w-96 bg-white rounded-xl shadow-2xl border border-gray-200 overflow-hidden animate-slideDown z-60 notification-container">
            <div className="bg-linear-to-r from-purple-500 to-pink-500 px-4 py-3 flex items-center justify-between">
              <h3 className="text-white font-semibold text-sm xl:text-base">Order Notifications</h3>
              <div className="flex items-center gap-2">
                {orderNotifications.length > 0 && (
                  <button
                    onClick={markAllAsRead}
                    className="text-white text-xs hover:underline transition-all duration-200"
                  >
                    Mark all read
                  </button>
                )}
                <button
                  onClick={() => setNotificationsOpen(false)}
                  className="text-white hover:bg-white/20 rounded-full p-1 transition-all duration-200"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>

            <div className="max-h-96 overflow-y-auto custom-scrollbar">
              {orderNotifications.length === 0 ? (
                <div className="p-8 text-center">
                  <svg className="w-16 h-16 mx-auto text-gray-300 mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                  </svg>
                  <p className="text-gray-500 text-sm">No orders yet</p>
                </div>
              ) : (
                orderNotifications.map((notification) => (
                  <div
                    key={notification.id}
                    className={`px-4 py-3 border-b border-gray-100 hover:bg-gray-50 transition-all duration-200 cursor-pointer group ${
                      !readNotifications.has(notification.id) ? "bg-purple-50" : ""
                    }`}
                    onClick={() => handleNotificationClick(notification)}
                  >
                    <div className="flex gap-3">
                      <div className="shrink-0 w-10 h-10 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center">
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M3 1a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 11.846 4.632 14 6.414 14H15a1 1 0 000-2H6.414l1-1H14a1 1 0 00.894-.553l3-6A1 1 0 0017 3H6.28l-.31-1.243A1 1 0 005 1H3zM16 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM6.5 18a1.5 1.5 0 100-3 1.5 1.5 0 000 3z" />
                        </svg>
                      </div>

                      <div className="flex-1 min-w-0">
                        <p className={`text-sm ${!readNotifications.has(notification.id) ? "font-semibold text-gray-900" : "text-gray-700"}`}>
                          {getNotificationMessage(notification)}
                        </p>
                        <div className="flex items-center gap-2 mt-1">
                          <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${getStatusColor(notification.status)}`}>
                            {notification.status}
                          </span>
                          <span className="text-xs text-gray-500">
                            {getNotificationTime(notification.createdAt)}
                          </span>
                        </div>
                      </div>

                      <div className="shrink-0 opacity-0 group-hover:opacity-100 transition-opacity duration-200 text-gray-400">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            {orderNotifications.length > 0 && (
              <div className="bg-gray-50 px-4 py-2 flex justify-center items-center border-t border-gray-200">
                <Link
                  to="/orders"
                  onClick={() => setNotificationsOpen(false)}
                  className="text-xs text-purple-600 hover:text-purple-700 font-medium transition-colors duration-200"
                >
                  View All Orders
                </Link>
              </div>
            )}
          </div>
        )}

        {mobileSearchOpen && (
          <div className="lg:hidden mt-3 animate-slideDown">
            <form onSubmit={handleSearch} className="flex items-center bg-gray-50 border border-gray-200 rounded-full px-4 py-2.5 focus-within:ring-2 focus-within:ring-pink-400 focus-within:shadow-lg transition-all duration-300">
              <input
                type="text"
                placeholder="Search sarees, categories..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="flex-1 bg-transparent outline-none text-sm text-gray-700 placeholder-gray-400"
                autoFocus
              />
              <button
                type="submit"
                className="ml-3 bg-linear-to-r from-pink-500 to-red-500 text-white px-4 py-1.5 rounded-full text-sm font-semibold hover:from-pink-600 hover:to-red-600 transform hover:scale-105 transition-all duration-300"
              >
                Search
              </button>
            </form>
          </div>
        )}

        {mobileMenuOpen && (
          <div className="lg:hidden mt-3 bg-gray-50 rounded-xl shadow-inner border border-gray-200 overflow-hidden animate-slideDown">
            <ul className="py-2">
              {menuItems.map((item, i) => (
                <li key={i} className="transform transition-all duration-200 hover:translate-x-2">
                  <Link
                    to={item.path}
                    onClick={() => handleMenuClick(item.name)}
                    className={`block px-4 py-3 font-semibold uppercase tracking-wide text-sm transition-all duration-300 ${
                      activeMenu === item.name
                        ? "bg-pink-100 text-pink-600 border-l-4 border-pink-500"
                        : "text-gray-700 hover:bg-pink-50 hover:text-pink-500"
                    }`}
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>

            {user ? (
              <div className="border-t border-gray-200 bg-white">
                <div className="px-4 py-3 border-b border-gray-200 bg-linear-to-r from-pink-50 to-red-50">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-linear-to-r from-pink-500 to-red-500 flex items-center justify-center text-white font-bold shadow-md transform hover:scale-110 transition-transform duration-300">
                      {user.name?.charAt(0).toUpperCase()}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold text-gray-800 truncate">{user.name}</p>
                      <p className="text-xs text-gray-600 truncate">{user.email}</p>
                    </div>
                  </div>
                </div>

                <div className="sm:hidden border-b border-gray-200">
                  <button
                    onClick={() => {
                      setNotificationsOpen(!notificationsOpen);
                      setMobileMenuOpen(false);
                    }}
                    className="w-full flex items-center justify-between px-4 py-3 hover:bg-purple-50 transition-all duration-200"
                  >
                    <div className="flex items-center gap-3">
                      <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                      </svg>
                      <span className="text-sm font-medium text-gray-700">Order Notifications</span>
                    </div>
                    {unreadCount > 0 && (
                      <span className="bg-purple-500 text-white text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center animate-bounce-subtle">
                        {unreadCount}
                      </span>
                    )}
                  </button>

                  <Link
                    to="/wishlist"
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex items-center justify-between px-4 py-3 hover:bg-pink-50 transition-all duration-200"
                  >
                    <div className="flex items-center gap-3">
                      <img src={wishlistIcon} alt="Wishlist" className="w-6 h-6" />
                      <span className="text-sm font-medium text-gray-700">Wishlist</span>
                    </div>
                    {wishlist.length > 0 && (
                      <span className="bg-pink-500 text-white text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center">
                        {wishlist.length}
                      </span>
                    )}
                  </Link>

                  <Link
                    to="/addtocard"
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex items-center justify-between px-4 py-3 hover:bg-green-50 transition-all duration-200"
                  >
                    <div className="flex items-center gap-3">
                      <img src={addtocartIcon} alt="Cart" className="w-6 h-6" />
                      <span className="text-sm font-medium text-gray-700">Cart</span>
                    </div>
                    {cart.length > 0 && (
                      <span className="bg-green-500 text-white text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center">
                        {cart.length}
                      </span>
                    )}
                  </Link>
                </div>

                <div className="border-t border-gray-200">
                  <Link
                    to="/orders"
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex items-center gap-3 px-4 py-3 hover:bg-pink-50 transition-all duration-200 text-gray-700 hover:text-pink-500 transform hover:translate-x-2"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                    </svg>
                    <span className="text-sm font-medium">My Orders</span>
                  </Link>
                  
                  <button
                    onClick={handleLogout}
                    className="w-full flex items-center gap-3 px-4 py-3 hover:bg-red-50 transition-all duration-200 text-gray-700 hover:text-red-500 border-t border-gray-200 transform hover:translate-x-2"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                    </svg>
                    <span className="text-sm font-medium">Logout</span>
                  </button>
                </div>
              </div>
            ) : (
              <div className="p-4 border-t border-gray-200 bg-white">
                <Link to="/login" onClick={() => setMobileMenuOpen(false)}>
                  <Button
                    text="Login"
                    property="w-full bg-gradient-to-r from-pink-500 to-red-500 hover:from-pink-600 hover:to-red-600 text-white px-6 py-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 font-semibold cursor-pointer text-center"
                  />
                </Link>
              </div>
            )}
          </div>
        )}
      </nav>

      <style>{`
        @keyframes slideDown {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes pulse-subtle {
          0%, 100% {
            opacity: 1;
          }
          50% {
            opacity: 0.8;
          }
        }
        
        @keyframes bounce-subtle {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-3px);
          }
        }
        
        .animate-slideDown {
          animation: slideDown 0.3s ease-out;
        }
        
        .animate-pulse-subtle {
          animation: pulse-subtle 2s ease-in-out infinite;
        }
        
        .animate-bounce-subtle {
          animation: bounce-subtle 2s ease-in-out infinite;
        }
        
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        
        .custom-scrollbar::-webkit-scrollbar-track {
          background: #f1f1f1;
        }
        
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #d946ef;
          border-radius: 3px;
        }
        
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #c026d3;
        }
      `}</style>
    </header>
  );
};

export default Navbar;