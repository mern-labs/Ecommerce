import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import AdminPanel from "../pages/Admin/AdminPanel";

const AddProduct = () => {
  const navigate = useNavigate();

  const initialFormState = {
    name: "",
    brand: "",
    color: "",
    material: "",
    length: "",
    price: "",
    category: "",
    image: "",
    stock: "",
    instock: true
  };

  const [formData, setFormData] = useState(initialFormState);
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [errors, setErrors] = useState({});

  const categories = [
    "Party wear",
    "Casual wear",
    "Wedding wear",
    "Festive wear",
    "Office wear",
    "Traditional wear",
    "Designer wear",
    "Bridal wear",
    "Cotton",
    "Silk",
    "Chiffon",
    "Georgette",
    "Net",
    "Kanjivaram",
    "Banarasi"
  ];

  const materials = [
    "Chiffon",
    "Silk",
    "Cotton",
    "Georgette",
    "Net",
    "Satin",
    "Crepe",
    "Velvet",
    "Organza",
    "Tussar Silk",
    "Kanjivaram Silk",
    "Banarasi Silk"
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
      setFormData(prev => ({
        ...prev,
        image: file.name
      }));
      
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
    if (!formData.material) newErrors.material = "Material is required";
    if (!formData.length.trim()) newErrors.length = "Length is required";
    if (!formData.price || formData.price <= 0) newErrors.price = "Valid price is required";
    if (!formData.category) newErrors.category = "Category is required";
    if (!formData.stock || formData.stock < 0) newErrors.stock = "Valid stock quantity is required";
    if (!formData.image) newErrors.image = "Product image is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      alert("Please fill in all required fields correctly");
      return;
    }

    // Create product object matching MongoDB structure
    const productData = {
      name: formData.name,
      brand: formData.brand,
      color: formData.color,
      material: formData.material,
      length: formData.length,
      price: parseFloat(formData.price),
      category: formData.category,
      image: formData.image,
      stock: parseInt(formData.stock),
      instock: formData.instock,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    console.log("Product Data to Submit:", JSON.stringify(productData, null, 2));
    
    alert(`Product Added Successfully!\n\nProduct Data:\n${JSON.stringify(productData, null, 2)}`);
    // navigate('/admin/products');
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
                  placeholder="e.g., Indya"
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
                  placeholder="e.g., Peach"
                  className={`w-full px-4 py-3 border ${errors.color ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:ring-2 focus:ring-pink-400 focus:border-transparent outline-none transition-all`}
                />
                {errors.color && <p className="text-red-500 text-xs mt-1">{errors.color}</p>}
              </div>

              {/* Material */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Material <span className="text-red-500">*</span>
                </label>
                <select
                  name="material"
                  value={formData.material}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-3 border ${errors.material ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:ring-2 focus:ring-pink-400 focus:border-transparent outline-none transition-all`}
                >
                  <option value="">Select Material</option>
                  {materials.map((material, index) => (
                    <option key={index} value={material}>{material}</option>
                  ))}
                </select>
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
                  placeholder="e.g., 5.5 meters"
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
                  {formData.image && <p className="text-xs text-green-600 mt-1">✓ {formData.image}</p>}
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
              <div className="flex items-start gap-3 p-4 bg-gradient-to-r from-gray-50 to-gray-100 rounded-lg border border-gray-200">
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
                className="px-6 py-2.5 border-2 border-gray-300 text-gray-700 rounded-lg font-semibold hover:bg-gray-100 transition-all"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-8 py-2.5 bg-gradient-to-r from-pink-500 to-red-500 text-white rounded-lg font-semibold hover:from-pink-600 hover:to-red-600 transition-all shadow-lg hover:shadow-xl"
              >
                Add Product
              </button>
            </div>
          </div>
        </form>
      </div>
    </AdminPanel>
  );
};

export default AddProduct;