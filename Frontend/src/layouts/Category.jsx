import React from "react"
import { useNavigate } from "react-router-dom"
import { useData } from "../context/Usecontext"
import apiInstance from "../interceptor/interceptor"

const Category = () => {
  const { products } = useData()
  const navigate = useNavigate()
  const baseURL = apiInstance.defaults.baseURL

  // 🔹 Extract unique categories
  const categories = [
    ...new Set(products.map((item) => item.category))
  ]

  if (!products || products.length === 0) {
    return (
      <p className="text-center mt-10 text-gray-500">
        No categories available
      </p>
    )
  }

  return (
    <div className="p-6">
      {/* Heading */}
      <div className="text-center my-12">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-800">
          Shop by Category
        </h1>
        <p className="mt-3 text-gray-500">
          Find your style by category
        </p>
        <div className="mt-4 flex justify-center">
          <span className="w-20 h-1 bg-red-500 rounded-full"></span>
        </div>
      </div>

      {/* Category Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {categories.map((category, index) => {
          // 🔹 first product image for that category
          const categoryImage = products.find(
            (item) => item.category === category
          )?.image

          return (
            <div
              key={index}
              onClick={() => navigate(`/products?category=${category}`)}
              className="cursor-pointer border rounded-xl overflow-hidden shadow hover:shadow-xl transition bg-white group"
            >
              {/* Image */}
              <div className="overflow-hidden">
                <img
                  src={`${baseURL}/uploads/products/${categoryImage}`}
                  alt={category}
                  className="w-full h-100 object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>

              {/* Name */}
              <div className="p-4 text-center">
                <h2 className="text-lg font-semibold capitalize">
                  {category}
                </h2>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default Category
