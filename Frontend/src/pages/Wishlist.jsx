import React from "react"
import { useData } from "../context/Usecontext"
import apiInstance from "../interceptor/interceptor"

const Wishlist = () => {
  const { wishlist, removeFromWishlist } = useData()
  const baseURL = apiInstance.defaults.baseURL

  if (!wishlist || wishlist.length === 0) {
    return <p className="text-center mt-10 text-gray-500">❤️ Your wishlist is empty</p>
  }

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold text-center mb-8">❤️ My Wishlist</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {wishlist.map(item => (
          <div key={item._id} className="border rounded-xl shadow hover:shadow-lg transition bg-white">
            <img
              src={`${baseURL}/uploads/products/${item.image}`}
              alt={item.name}
              className="w-full h-80 object-cover"
            />
            <div className="p-4 text-center">
              <h2 className="font-semibold">{item.name}</h2>
              <p className="text-gray-600">₹{item.price}</p>
              <button
                onClick={() => removeFromWishlist(item._id)}
                className="mt-3 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
              >
                Remove
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Wishlist
