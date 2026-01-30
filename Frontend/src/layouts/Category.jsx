import React from "react"
import { useNavigate } from "react-router-dom"
import { useData } from "../context/Usecontext"
import apiInstance from "../interceptor/interceptor"

const Category = () => {
  const { products } = useData()
  const navigate = useNavigate()
  const baseURL = apiInstance.defaults.baseURL

  const categories = [...new Set(products.map(item => item.category))]

  if (!products || products.length === 0) {
    return (
      <p className="text-center mt-10 text-gray-500">
        No categories available
      </p>
    )
  }

  return (
    <div className="px-6 py-14 bg-gray-50">
      {/* Header */}
      <div className="text-center mb-14">
        <h1 className="text-4xl font-extrabold text-gray-800">
          Shop by Category
        </h1>
        <p className="mt-3 text-gray-500">
          Discover styles curated just for you
        </p>
        <div className="mt-4 flex justify-center">
          <span className="w-24 h-1 bg-linear-to-r from-pink-500 to-red-500 rounded-full"></span>
        </div>
      </div>

      {/* Category Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10">
        {categories.map((category, index) => {
          const categoryImage = products.find(
            item => item.category === category
          )?.image

          return (
            <div
              key={index}
              onClick={() =>
                navigate(`/products?category=${encodeURIComponent(category)}`)
              }
              className="relative group cursor-pointer rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 bg-white"
            >
              {/* Image */}
              <img
                src={`${baseURL}/uploads/products/${categoryImage}`}
                alt={category}
                className="w-full h-100 object-cover transform group-hover:scale-110 transition duration-700"
              />

              {/* Dark Gradient Overlay */}
              <div className="absolute inset-0 bg-linear-to-t from-black/70 via-black/20 to-transparent"></div>

              {/* Category Name */}
              <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 text-center">
                <h2 className="text-white text-2xl font-bold tracking-wide capitalize drop-shadow-lg">
                  {category}
                </h2>
                <span className="inline-block mt-2 px-4 py-1 text-xs text-white bg-white/20 rounded-full backdrop-blur">
                  Explore →
                </span>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default Category
