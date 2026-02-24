import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getProducts } from "../interceptor/interceptor";
import { useData } from "../context/Usecontext";

const Category = () => {
  const { products, setProducts } = useData();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    // Extract categories from already-loaded context products
    if (products && products.length > 0) {
      const uniqueCategories = [
        ...new Set(products.map((item) => item.category).filter(Boolean)),
      ];
      setCategories(uniqueCategories);
      return; // ✅ Skip fetch — products already in context
    }

    // Only fetch if context is empty
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const res = await getProducts();
        const productsData = res.data || [];
        setProducts(productsData);

        const uniqueCategories = [
          ...new Set(productsData.map((item) => item.category).filter(Boolean)),
        ];
        setCategories(uniqueCategories);
      } catch (err) {
        console.log("Product fetch error:", err.message);
        setProducts([]);
        setCategories([]);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [products]); // ✅ React to products changes in context

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-xl text-gray-500">Loading categories...</p>
      </div>
    );
  }

  if (!categories || categories.length === 0) {
    return (
      <p className="text-center mt-10 text-gray-500">No categories available</p>
    );
  }

  return (
    <div className="px-6 py-6 bg-gray-50">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-4xl font-extrabold text-gray-800">
          Shop by Category
        </h1>
        <p className="mt-3 text-gray-500">
          Discover styles curated just for you
        </p>
        <div className="mt-4 flex justify-center">
          <span className="w-24 h-1 bg-gradient-to-r from-pink-500 to-red-500 rounded-full"></span>
        </div>
      </div>

      {/* Category Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10">
        {categories.map((category, index) => {
          const categoryImage = products.find(
            (item) => item.category === category
          )?.image;

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
                src={categoryImage}
                alt={category}
                className="w-full h-64 object-cover transform group-hover:scale-110 transition duration-700"
              />

              {/* Dark Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>

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
          );
        })}
      </div>
    </div>
  );
};

export default Category;
