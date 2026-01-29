import React, { useState } from "react"
import { useData } from "../context/Usecontext"
import apiInstance from "../interceptor/interceptor"
import addtocartIcon from "../assets/addtocart.png"
import wishlistIcon from "../assets/wishlist.png"

const Products = () => {
  const { products, addToCart, addToWishlist } = useData()
  const baseURL = apiInstance.defaults.baseURL

  const [quantities, setQuantities] = useState({})
  const [addedToCart, setAddedToCart] = useState({}) // ✅ NEW

  const handleAddToCart = (product) => {
    addToCart(product, 1)
    setQuantities(prev => ({ ...prev, [product._id]: 1 }))
    setAddedToCart(prev => ({ ...prev, [product._id]: true })) // ✅ mark added
  }

  const handleIncrement = (productId) => {
    setQuantities(prev => {
      const newQty = prev[productId] + 1
      addToCart(products.find(p => p._id === productId), newQty)
      return { ...prev, [productId]: newQty }
    })
  }

  const handleDecrement = (productId) => {
    setQuantities(prev => {
      const newQty = Math.max(1, prev[productId] - 1)
      addToCart(products.find(p => p._id === productId), newQty)
      return { ...prev, [productId]: newQty }
    })
  }

  if (!products || products.length === 0) {
    return <p className="text-center mt-10 text-gray-500">No products available</p>
  }

  return (
    <div className="p-6">

      {/* Heading */}
      <div className="text-center my-12">
        <h1 className="text-4xl font-bold text-gray-800">
          ✨ Our Exclusive Collection ✨
        </h1>
        <p className="mt-3 text-gray-500">
          Discover handpicked styles crafted for every occasion
        </p>
        <div className="mt-4 flex justify-center">
          <span className="w-24 h-1 bg-red-500 rounded-full"></span>
        </div>
      </div>

      {/* Products */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((item) => (
          <div
            key={item._id}
            className="border rounded-xl shadow-md hover:shadow-xl transition p-4 bg-white"
          >
            {/* Image */}
            <div className="relative group overflow-hidden rounded-lg">
              <img
                src={`${baseURL}/uploads/products/${item.image}`}
                alt={item.name}
                className="w-full h-100 object-cover transition-transform duration-500 group-hover:scale-105"
              />

              {/* Hover Buttons */}
              {!addedToCart[item._id] && (
                <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-4 opacity-0 group-hover:opacity-100 transition">
                  <button
                    onClick={() => addToWishlist(item)}
                    className="w-10 h-10 bg-white rounded-full shadow flex items-center justify-center hover:scale-110"
                  >
                    <img src={wishlistIcon} className="w-6 h-6" />
                  </button>

                  <button
                    onClick={() => handleAddToCart(item)}
                    className="w-10 h-10 bg-white rounded-full shadow flex items-center justify-center hover:scale-110"
                  >
                    <img src={addtocartIcon} className="w-6 h-6" />
                  </button>
                </div>
              )}
            </div>

            {/* Info */}
            <h3 className="text-lg font-semibold mt-3">{item.name}</h3>
            <p className="text-gray-700 font-medium">₹{item.price}</p>

            {/* Quantity Controls → ONLY AFTER ADD TO CART */}
            {addedToCart[item._id] && (
              <div className="mt-3 flex items-center justify-center gap-3">
                <button
                  onClick={() => handleDecrement(item._id)}
                  className="px-3 py-1 bg-gray-200 rounded-lg hover:bg-gray-300"
                >
                  −
                </button>
                <span className="font-semibold">{quantities[item._id]}</span>
                <button
                  onClick={() => handleIncrement(item._id)}
                  className="px-3 py-1 bg-gray-200 rounded-lg hover:bg-gray-300"
                >
                  +
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

export default Products
