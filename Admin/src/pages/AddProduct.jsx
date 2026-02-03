import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import AdminPanel from "./AdminPanel";
import { createProduct } from "../interceptor/interceptor";
import { useAdminData } from "../context/AdminContext";
import { toast } from "react-toastify";

const AddProduct = () => {
  const navigate = useNavigate();
  const { fetchProducts } = useAdminData();

  const initialFormState = {
    name: "",
    brand: "",
    color: "",
    material: "",
    length: "",
    price: "",
    category: "",
    stock: "",
    ratings: "",
    reviews: "",
    instock: true
  };

  const [formData, setFormData] = useState(initialFormState);
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const categories = [
    "Party wear",
    "Cotton Saree",
    "Silk Saree",
    "Traditional Saree",
    "Fabric Saree",
    "Transparent Saree",
    "Plain Saree",
    "Digital Print Saree"
  ];

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    
    // Clear error for this field
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ""
      }));
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Validate file type
      const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
      if (!validTypes.includes(file.type)) {
        setErrors(prev => ({
          ...prev,
          image: "Please upload a valid image file (JPG, PNG, WEBP)"
        }));
        return;
      }

      // Validate file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        setErrors(prev => ({
          ...prev,
          image: "Image size should be less than 5MB"
        }));
        return;
      }

      setImageFile(file);
      
      // Create preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);

      // Clear error
      setErrors(prev => ({
        ...prev,
        image: ""
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) newErrors.name = "Product name is required";
    if (!formData.brand.trim()) newErrors.brand = "Brand is required";
    if (!formData.color.trim()) newErrors.color = "Color is required";
    if (!formData.material.trim()) newErrors.material = "Material is required";
    if (!formData.length.trim()) newErrors.length = "Length is required";
    if (!formData.price || formData.price <= 0) newErrors.price = "Valid price is required";
    if (!formData.category) newErrors.category = "Category is required";
    if (!formData.stock || formData.stock < 0) newErrors.stock = "Valid stock quantity is required";
    if (!imageFile) newErrors.image = "Product image is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      toast.error("Please fill in all required fields correctly");
      return;
    }

    setIsSubmitting(true);

    try {
      // Create FormData for file upload
      const formDataToSend = new FormData();
      formDataToSend.append('name', formData.name);
      formDataToSend.append('brand', formData.brand);
      formDataToSend.append('color', formData.color);
      formDataToSend.append('material', formData.material);
      formDataToSend.append('length', formData.length);
      formDataToSend.append('price', parseFloat(formData.price));
      formDataToSend.append('category', formData.category);
      formDataToSend.append('stock', parseInt(formData.stock));
      formDataToSend.append('ratings', formData.ratings ? parseFloat(formData.ratings) : 0);
      formDataToSend.append('reviews', formData.reviews ? parseInt(formData.reviews) : 0);
      formDataToSend.append('instock', formData.instock);
      formDataToSend.append('image', imageFile);

      // Call the API using the interceptor
      const response = await createProduct(formDataToSend);
      
      console.log('Product added successfully:', response);
      
      toast.success('Product added successfully!');
      
      // Refresh the products list immediately
      if (fetchProducts) {
        await fetchProducts();
      }
      
      // Navigate back to products page
      navigate('/admin/products');
      
    } catch (error) {
      console.error('Error adding product:', error);
      console.error('Error response:', error.response?.data);
      toast.error(`Failed to add product: ${error.response?.data?.message || error.message}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCancel = () => {
    if (window.confirm("Are you sure you want to cancel? All changes will be lost.")) {
      navigate('/admin/products');
    }
  };

  const handleReset = () => {
    if (window.confirm("Are you sure you want to reset the form?")) {
      setFormData(initialFormState);
      setImageFile(null);
      setImagePreview(null);
      setErrors({});
    }
  };

  return (
    <AdminPanel>
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-6">
          <button
            onClick={handleCancel}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-800 mb-4 transition-colors group"
          >
            <svg className="w-5 h-5 group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to Products
          </button>
          <h1 className="text-3xl lg:text-4xl font-bold text-gray-800">Add New Product</h1>
          <p className="text-gray-600 mt-2">Fill in the details to add a new product to your inventory</p>
        </div>

        {/* Form Section */}
        <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden">
          <div className="bg-gradient-to-r from-pink-500 to-red-500 text-white px-6 py-4">
            <h2 className="text-xl font-bold">Product Information</h2>
          </div>

          <div className="p-6 space-y-6">
            {/* Product Name */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Product Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                placeholder="e.g., Chiffon Printed Saree"
                className={`w-full px-4 py-3 border ${errors.name ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:ring-2 focus:ring-pink-400 focus:border-transparent outline-none transition-all`}
              />
              {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Brand */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Brand <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="brand"
                  value={formData.brand}
                  onChange={handleInputChange}
                  placeholder="e.g., Royal Weaves"
                  className={`w-full px-4 py-3 border ${errors.brand ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:ring-2 focus:ring-pink-400 focus:border-transparent outline-none transition-all`}
                />
                {errors.brand && <p className="text-red-500 text-xs mt-1">{errors.brand}</p>}
              </div>

              {/* Color */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Color <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="color"
                  value={formData.color}
                  onChange={handleInputChange}
                  placeholder="e.g., Peach, Red, Blue"
                  className={`w-full px-4 py-3 border ${errors.color ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:ring-2 focus:ring-pink-400 focus:border-transparent outline-none transition-all`}
                />
                {errors.color && <p className="text-red-500 text-xs mt-1">{errors.color}</p>}
              </div>

              {/* Material - Changed from dropdown to text input */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Material <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="material"
                  value={formData.material}
                  onChange={handleInputChange}
                  placeholder="e.g., Chiffon, Silk, Cotton, Georgette"
                  className={`w-full px-4 py-3 border ${errors.material ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:ring-2 focus:ring-pink-400 focus:border-transparent outline-none transition-all`}
                />
                {errors.material && <p className="text-red-500 text-xs mt-1">{errors.material}</p>}
              </div>

              {/* Length */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Length <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="length"
                  value={formData.length}
                  onChange={handleInputChange}
                  placeholder="e.g., 5.5m, 6m, 6.5m"
                  className={`w-full px-4 py-3 border ${errors.length ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:ring-2 focus:ring-pink-400 focus:border-transparent outline-none transition-all`}
                />
                {errors.length && <p className="text-red-500 text-xs mt-1">{errors.length}</p>}
              </div>

              {/* Price */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Price (₹) <span className="text-red-500">*</span>
                </label>
                <input
                  type="number"
                  name="price"
                  value={formData.price}
                  onChange={handleInputChange}
                  min="0"
                  step="0.01"
                  placeholder="e.g., 1599"
                  className={`w-full px-4 py-3 border ${errors.price ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:ring-2 focus:ring-pink-400 focus:border-transparent outline-none transition-all`}
                />
                {errors.price && <p className="text-red-500 text-xs mt-1">{errors.price}</p>}
              </div>

              {/* Category */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Category <span className="text-red-500">*</span>
                </label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-3 border ${errors.category ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:ring-2 focus:ring-pink-400 focus:border-transparent outline-none transition-all`}
                >
                  <option value="">Select Category</option>
                  {categories.map((cat, index) => (
                    <option key={index} value={cat}>{cat}</option>
                  ))}
                </select>
                {errors.category && <p className="text-red-500 text-xs mt-1">{errors.category}</p>}
              </div>

              {/* Stock */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Stock Quantity <span className="text-red-500">*</span>
                </label>
                <input
                  type="number"
                  name="stock"
                  value={formData.stock}
                  onChange={handleInputChange}
                  min="0"
                  placeholder="e.g., 18"
                  className={`w-full px-4 py-3 border ${errors.stock ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:ring-2 focus:ring-pink-400 focus:border-transparent outline-none transition-all`}
                />
                {errors.stock && <p className="text-red-500 text-xs mt-1">{errors.stock}</p>}
              </div>

              {/* Ratings (Optional) */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Ratings (Optional)
                </label>
                <input
                  type="number"
                  name="ratings"
                  value={formData.ratings}
                  onChange={handleInputChange}
                  min="0"
                  max="5"
                  step="0.1"
                  placeholder="e.g., 4.5"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-400 focus:border-transparent outline-none transition-all"
                />
                <p className="text-xs text-gray-500 mt-1">Rating out of 5 (e.g., 4.8)</p>
              </div>

              {/* Reviews Count (Optional) */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Reviews Count (Optional)
                </label>
                <input
                  type="number"
                  name="reviews"
                  value={formData.reviews}
                  onChange={handleInputChange}
                  min="0"
                  placeholder="e.g., 47"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-400 focus:border-transparent outline-none transition-all"
                />
                <p className="text-xs text-gray-500 mt-1">Number of customer reviews</p>
              </div>
            </div>

            {/* Image Upload */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Product Image <span className="text-red-500">*</span>
              </label>
              <div className="flex items-start gap-4">
                <div className="flex-1">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className={`w-full px-4 py-3 border ${errors.image ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:ring-2 focus:ring-pink-400 focus:border-transparent outline-none transition-all file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-pink-50 file:text-pink-700 hover:file:bg-pink-100 cursor-pointer`}
                  />
                  <p className="text-xs text-gray-500 mt-2">
                    Upload a product image (JPG, PNG, WEBP). Max size: 5MB
                  </p>
                  {imageFile && <p className="text-xs text-green-600 mt-1">✓ {imageFile.name}</p>}
                  {errors.image && <p className="text-red-500 text-xs mt-1">{errors.image}</p>}
                </div>
                {imagePreview && (
                  <div className="w-32 h-32 border-2 border-gray-200 rounded-lg overflow-hidden shadow-md">
                    <img 
                      src={imagePreview} 
                      alt="Preview" 
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}
              </div>
            </div>

            {/* In Stock Toggle */}
            <div>
              <div className="flex items-start gap-3 p-4 bg-gray-50 rounded-lg border border-gray-200">
                <input
                  type="checkbox"
                  name="instock"
                  id="instock"
                  checked={formData.instock}
                  onChange={handleInputChange}
                  className="w-5 h-5 text-pink-600 rounded focus:ring-pink-500 mt-0.5 cursor-pointer"
                />
                <label htmlFor="instock" className="cursor-pointer flex-1">
                  <span className="text-sm font-semibold text-gray-700 block">
                    Product is in stock and available for sale
                  </span>
                  <span className="text-xs text-gray-500 mt-1 block">
                    Toggle this to mark product as available or unavailable
                  </span>
                </label>
              </div>
            </div>
          </div>

          {/* Form Footer */}
          <div className="px-6 py-4 bg-gray-50 border-t border-gray-200 flex items-center justify-between gap-3">
            <button
              type="button"
              onClick={handleReset}
              className="px-4 py-2.5 text-gray-600 hover:text-gray-800 font-semibold transition-all"
            >
              Reset Form
            </button>
            <div className="flex gap-3">
              <button
                type="button"
                onClick={handleCancel}
                disabled={isSubmitting}
                className="px-6 py-2.5 border-2 border-gray-300 text-gray-700 rounded-lg font-semibold hover:bg-gray-100 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className="px-8 py-2.5 bg-gradient-to-r from-pink-500 to-red-500 text-white rounded-lg font-semibold hover:from-pink-600 hover:to-red-600 transition-all shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
              >
                {isSubmitting ? (
                  <>
                    <svg className="animate-spin h-5 w-5" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Adding...
                  </>
                ) : (
                  'Add Product'
                )}
              </button>
            </div>
          </div>
        </form>
      </div>
    </AdminPanel>
  );
};

export default AddProduct;