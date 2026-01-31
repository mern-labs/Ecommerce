import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import AdminPanel from "./AdminPanel";

const AdminProducts = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [filterCategory, setFilterCategory] = useState("all");
  const [showModal, setShowModal] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  // Initial product form state matching the model
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

  // Sample products with complete model structure
  const [products, setProducts] = useState([
    { 
      id: 1, 
      name: "Banarasi Silk Saree", 
      brand: "Royal Weaves",
      color: "Golden",
      material: "Pure Silk",
      length: "6.5m",
      category: "Silk", 
      price: "₹15,500", 
      stock: 45, 
      sales: 234, 
      status: "In Stock", 
      image: "🥻",
      instock: true 
    },
    { 
      id: 2, 
      name: "Kanjivaram Saree", 
      brand: "Silk Heritage",
      color: "Red",
      material: "Kanjivaram Silk",
      length: "6m",
      category: "Silk", 
      price: "₹18,900", 
      stock: 32, 
      sales: 198, 
      status: "In Stock", 
      image: "🥻",
      instock: true 
    },
    { 
      id: 3, 
      name: "Cotton Saree", 
      brand: "Cotton Tales",
      color: "Blue",
      material: "Pure Cotton",
      length: "5.5m",
      category: "Cotton", 
      price: "₹3,200", 
      stock: 78, 
      sales: 176, 
      status: "In Stock", 
      image: "🥻",
      instock: true 
    },
    { 
      id: 4, 
      name: "Designer Saree", 
      brand: "Fashion Elite",
      color: "Pink",
      material: "Designer Fabric",
      length: "6.5m",
      category: "Designer", 
      price: "₹25,000", 
      stock: 12, 
      sales: 145, 
      status: "Low Stock", 
      image: "🥻",
      instock: true 
    },
    { 
      id: 5, 
      name: "Chiffon Saree", 
      brand: "Elegant Drapes",
      color: "Peach",
      material: "Chiffon",
      length: "5.5m",
      category: "Chiffon", 
      price: "₹5,500", 
      stock: 0, 
      sales: 89, 
      status: "Out of Stock", 
      image: "🥻",
      instock: false 
    },
    { 
      id: 6, 
      name: "Georgette Saree", 
      brand: "Style Studio",
      color: "Green",
      material: "Georgette",
      length: "6m",
      category: "Georgette", 
      price: "₹6,800", 
      stock: 56, 
      sales: 123, 
      status: "In Stock", 
      image: "🥻",
      instock: true 
    },
    { 
      id: 7, 
      name: "Net Saree", 
      brand: "Modern Weaves",
      color: "Black",
      material: "Net",
      length: "5.5m",
      category: "Net", 
      price: "₹4,200", 
      stock: 8, 
      sales: 67, 
      status: "Low Stock", 
      image: "🥻",
      instock: true 
    },
    { 
      id: 8, 
      name: "Tussar Silk Saree", 
      brand: "Royal Weaves",
      color: "Cream",
      material: "Tussar Silk",
      length: "6.5m",
      category: "Silk", 
      price: "₹12,300", 
      stock: 23, 
      sales: 98, 
      status: "In Stock", 
      image: "🥻",
      instock: true 
    },
  ]);

  const categories = [
    "Plain Saree",
    "Silk",
    "Cotton",
    "Designer",
    "Chiffon",
    "Georgette",
    "Net",
    "Kanjivaram",
    "Banarasi",
    "Printed",
    "Embroidered"
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case "In Stock":
        return "bg-green-100 text-green-700";
      case "Low Stock":
        return "bg-yellow-100 text-yellow-700";
      case "Out of Stock":
        return "bg-red-100 text-red-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  const handleAddProduct = () => {
    navigate('/admin/products/add');
  };

  const handleEditProduct = (product) => {
    setEditMode(true);
    setSelectedProduct(product);
    setFormData({
      name: product.name,
      brand: product.brand,
      color: product.color,
      material: product.material,
      length: product.length,
      price: product.price.replace('₹', '').replace(',', ''),
      category: product.category,
      image: product.image,
      stock: product.stock.toString(),
      instock: product.instock
    });
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setFormData(initialFormState);
    setSelectedProduct(null);
    setEditMode(false);
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Create product object matching the exact model structure
    const plainCottonSaree = {
      name: formData.name,
      brand: formData.brand,
      color: formData.color,
      material: formData.material,
      length: formData.length,
      price: formData.price,
      category: formData.category,
      image: formData.image || "🥻",
      stock: parseInt(formData.stock),
      instock: formData.instock
    };

    console.log(editMode ? "Updating Product:" : "Adding New Product:", plainCottonSaree);
    
    // Here you would typically make an API call to save the product
    // For demonstration, we'll just log it
    alert(`Product ${editMode ? 'Updated' : 'Added'} Successfully!\n\nProduct Data:\n${JSON.stringify(plainCottonSaree, null, 2)}`);
    
    handleCloseModal();
  };

  return (
    <AdminPanel>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl lg:text-3xl xl:text-4xl font-bold text-gray-800">Products Management</h1>
            <p className="text-sm lg:text-base text-gray-600 mt-1">Manage your product inventory</p>
          </div>
          <button 
            onClick={handleAddProduct}
            className="px-4 py-2 bg-gradient-to-r from-pink-500 to-red-500 text-white rounded-lg text-sm font-medium hover:from-pink-600 hover:to-red-600 transition-all shadow-lg"
          >
            <svg className="w-5 h-5 inline mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            Add New Product
          </button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white rounded-xl shadow-md border border-gray-100 p-5">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Products</p>
                <h3 className="text-2xl font-bold text-gray-800 mt-1">{products.length}</h3>
              </div>
              <div className="p-3 bg-purple-100 rounded-lg">
                <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                </svg>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-md border border-gray-100 p-5">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">In Stock</p>
                <h3 className="text-2xl font-bold text-gray-800 mt-1">
                  {products.filter(p => p.status === "In Stock").length}
                </h3>
              </div>
              <div className="p-3 bg-green-100 rounded-lg">
                <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-md border border-gray-100 p-5">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Low Stock</p>
                <h3 className="text-2xl font-bold text-gray-800 mt-1">
                  {products.filter(p => p.status === "Low Stock").length}
                </h3>
              </div>
              <div className="p-3 bg-yellow-100 rounded-lg">
                <svg className="w-6 h-6 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-md border border-gray-100 p-5">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Sales</p>
                <h3 className="text-2xl font-bold text-gray-800 mt-1">1.2K</h3>
              </div>
              <div className="p-3 bg-blue-100 rounded-lg">
                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                </svg>
              </div>
            </div>
          </div>
        </div>

        {/* Search and Filter */}
        <div className="bg-white rounded-xl shadow-md border border-gray-100 p-5">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search products by name..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-pink-400 focus:border-transparent outline-none text-sm"
                />
                <svg className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
            </div>
            <select
              value={filterCategory}
              onChange={(e) => setFilterCategory(e.target.value)}
              className="px-4 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-pink-400 focus:border-transparent outline-none text-sm font-medium"
            >
              <option value="all">All Categories</option>
              {categories.map((cat, idx) => (
                <option key={idx} value={cat.toLowerCase()}>{cat}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Products Table */}
        <div className="bg-white rounded-xl shadow-md border border-gray-100 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-5 lg:px-6 py-4 text-left">
                    <input type="checkbox" className="w-4 h-4 text-pink-600 rounded border-gray-300 focus:ring-pink-500" />
                  </th>
                  <th className="px-5 lg:px-6 py-4 text-left text-xs lg:text-sm font-semibold text-gray-700 uppercase tracking-wider">Product</th>
                  <th className="px-5 lg:px-6 py-4 text-left text-xs lg:text-sm font-semibold text-gray-700 uppercase tracking-wider">Brand</th>
                  <th className="px-5 lg:px-6 py-4 text-left text-xs lg:text-sm font-semibold text-gray-700 uppercase tracking-wider">Category</th>
                  <th className="px-5 lg:px-6 py-4 text-left text-xs lg:text-sm font-semibold text-gray-700 uppercase tracking-wider">Price</th>
                  <th className="px-5 lg:px-6 py-4 text-left text-xs lg:text-sm font-semibold text-gray-700 uppercase tracking-wider">Stock</th>
                  <th className="px-5 lg:px-6 py-4 text-left text-xs lg:text-sm font-semibold text-gray-700 uppercase tracking-wider">Status</th>
                  <th className="px-5 lg:px-6 py-4 text-left text-xs lg:text-sm font-semibold text-gray-700 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {products.map((product) => (
                  <tr key={product.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-5 lg:px-6 py-4">
                      <input type="checkbox" className="w-4 h-4 text-pink-600 rounded border-gray-300 focus:ring-pink-500" />
                    </td>
                    <td className="px-5 lg:px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-pink-500 to-red-500 flex items-center justify-center text-2xl">
                          {product.image}
                        </div>
                        <div>
                          <p className="text-sm font-semibold text-gray-800">{product.name}</p>
                          <p className="text-xs text-gray-500">{product.color} • {product.material}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-5 lg:px-6 py-4"><span className="text-sm text-gray-700">{product.brand}</span></td>
                    <td className="px-5 lg:px-6 py-4"><span className="text-sm text-gray-700">{product.category}</span></td>
                    <td className="px-5 lg:px-6 py-4"><span className="text-sm font-semibold text-gray-800">{product.price}</span></td>
                    <td className="px-5 lg:px-6 py-4"><span className="text-sm text-gray-700">{product.stock}</span></td>
                    <td className="px-5 lg:px-6 py-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(product.status)}`}>{product.status}</span>
                    </td>
                    <td className="px-5 lg:px-6 py-4">
                      <div className="flex items-center gap-2">
                        <button className="p-2 hover:bg-blue-50 rounded-lg transition-colors" title="View">
                          <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                          </svg>
                        </button>
                        <button 
                          onClick={() => handleEditProduct(product)}
                          className="p-2 hover:bg-green-50 rounded-lg transition-colors" 
                          title="Edit"
                        >
                          <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                          </svg>
                        </button>
                        <button className="p-2 hover:bg-red-50 rounded-lg transition-colors" title="Delete">
                          <svg className="w-5 h-5 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                          </svg>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="px-5 lg:px-6 py-4 border-t border-gray-100 flex items-center justify-between">
            <p className="text-sm text-gray-600">
              Showing <span className="font-semibold">1-{products.length}</span> of <span className="font-semibold">{products.length}</span> products
            </p>
            <div className="flex gap-2">
              <button className="px-3 py-1.5 border border-gray-200 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors">Previous</button>
              <button className="px-3 py-1.5 bg-gradient-to-r from-pink-500 to-red-500 text-white rounded-lg text-sm font-medium">1</button>
              <button className="px-3 py-1.5 border border-gray-200 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors">2</button>
              <button className="px-3 py-1.5 border border-gray-200 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors">Next</button>
            </div>
          </div>
        </div>
      </div>

      {/* Edit Product Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="sticky top-0 bg-gradient-to-r from-pink-500 to-red-500 text-white px-6 py-4 flex items-center justify-between rounded-t-2xl z-10">
              <h2 className="text-xl font-bold">Edit Product</h2>
              <button 
                onClick={handleCloseModal}
                className="hover:bg-white hover:bg-opacity-20 rounded-full p-2 transition-all"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Modal Body */}
            <form onSubmit={handleSubmit} className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
                    required
                    placeholder="e.g., Plain Cotton Saree"
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-400 focus:border-transparent outline-none"
                  />
                </div>

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
                    required
                    placeholder="e.g., Royal Weaves"
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-400 focus:border-transparent outline-none"
                  />
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
                    required
                    placeholder="e.g., Cream, Red, Blue"
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-400 focus:border-transparent outline-none"
                  />
                </div>

                {/* Material */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Material <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="material"
                    value={formData.material}
                    onChange={handleInputChange}
                    required
                    placeholder="e.g., Pure Cotton, Silk"
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-400 focus:border-transparent outline-none"
                  />
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
                    required
                    placeholder="e.g., 6m, 6.5m, 5.5m"
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-400 focus:border-transparent outline-none"
                  />
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
                    required
                    placeholder="e.g., 3200"
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-400 focus:border-transparent outline-none"
                  />
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
                    required
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-400 focus:border-transparent outline-none"
                  >
                    <option value="">Select Category</option>
                    {categories.map((cat, index) => (
                      <option key={index} value={cat}>{cat}</option>
                    ))}
                  </select>
                </div>

                {/* Image */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Image
                  </label>
                  <input
                    type="text"
                    name="image"
                    value={formData.image}
                    onChange={handleInputChange}
                    placeholder="e.g., plain-cotton-cream.jpg or 🥻"
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-400 focus:border-transparent outline-none"
                  />
                  <p className="text-xs text-gray-500 mt-1">Leave empty to use default icon 🥻</p>
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
                    required
                    min="0"
                    placeholder="e.g., 40"
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-400 focus:border-transparent outline-none"
                  />
                </div>

                {/* In Stock Toggle */}
                <div className="md:col-span-2">
                  <label className="flex items-center gap-3 cursor-pointer p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                    <input
                      type="checkbox"
                      name="instock"
                      checked={formData.instock}
                      onChange={handleInputChange}
                      className="w-5 h-5 text-pink-600 rounded focus:ring-pink-500"
                    />
                    <div>
                      <span className="text-sm font-semibold text-gray-700 block">
                        Product is in stock and available for sale
                      </span>
                      <span className="text-xs text-gray-500">
                        Toggle this to mark product as available or unavailable
                      </span>
                    </div>
                  </label>
                </div>
              </div>

              {/* Modal Footer */}
              <div className="flex items-center justify-end gap-3 mt-8 pt-6 border-t border-gray-200">
                <button
                  type="button"
                  onClick={handleCloseModal}
                  className="px-6 py-2.5 border border-gray-300 text-gray-700 rounded-lg font-semibold hover:bg-gray-50 transition-all"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 bg-gradient-to-r from-pink-500 to-red-500 text-white rounded-lg font-semibold hover:from-pink-600 hover:to-red-600 transition-all shadow-lg"
                >
                  Update Product
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </AdminPanel>
  );
};

export default AdminProducts;