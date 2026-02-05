import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AdminPanel from "./AdminPanel";
import { useAdminData } from "../context/AdminContext";
import apiInstance, { deleteProduct, updateProduct } from "../interceptor/interceptor";
import { toast } from "react-toastify";

const AdminProducts = () => {
  const navigate = useNavigate();
  const { products, fetchProducts } = useAdminData();
  const baseURL = apiInstance.defaults.baseURL;

  // ── LOCAL SHADOW STATE ─────────────────────────────────────────────────────
  // This mirrors `products` from context but lets us apply instant local
  // mutations (optimistic updates) without waiting for fetchProducts to resolve.
  const [localProducts, setLocalProducts] = useState(products);

  // Keep the shadow in sync whenever context updates (e.g. initial load,
  // or after our background fetchProducts finishes).
  useEffect(() => {
    setLocalProducts(products);
  }, [products]);
  // ───────────────────────────────────────────────────────────────────────────

  const [searchQuery, setSearchQuery] = useState("");
  const [filterCategory, setFilterCategory] = useState("all");
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [productToDelete, setProductToDelete] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [editingProductId, setEditingProductId] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [showPreviewModal, setShowPreviewModal] = useState(false);
  const [previewProduct, setPreviewProduct] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    brand: "",
    color: "",
    material: "",
    length: "",
    price: "",
    category: "",
    image: "",
    stock: "",
    ratings: "",
    reviews: "",
    instock: true,
  });

  const categories = [
    "Party wear",
    "Cotton Saree",
    "Silk Saree",
    "Traditional Saree",
    "Fabric Saree",
    "Transparent Saree",
    "Plain Saree",
    "Digital Print Saree",
  ];

  // ── helpers ────────────────────────────────────────────────────────────────
  const getStatus = (stock = 0) => {
    if (stock === 0) return "Out of Stock";
    if (stock < 10) return "Low Stock";
    return "In Stock";
  };

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

  // ── derived / filtered — now reads from localProducts ─────────────────────
  const filteredProducts = localProducts.filter((p) => {
    const matchSearch = p.name?.toLowerCase().includes(searchQuery.toLowerCase());
    const matchCategory =
      filterCategory === "all"
        ? true
        : p.category?.toLowerCase() === filterCategory.toLowerCase();
    return matchSearch && matchCategory;
  });

  const totalSales = localProducts.reduce((sum, p) => sum + (p.sales || 0), 0);

  // ── Add ────────────────────────────────────────────────────────────────────
  const handleAddClick = () => {
    navigate("/admin/products/add");
  };

  // ── Edit ───────────────────────────────────────────────────────────────────
  const handleEditClick = (product) => {
    setEditingProductId(product._id || product.id);
    setFormData({
      name: product.name,
      brand: product.brand,
      color: product.color,
      material: product.material,
      length: product.length,
      price: product.price.toString(),
      category: product.category,
      image: product.image,
      stock: product.stock.toString(),
      ratings: product.ratings ? product.ratings.toString() : "",
      reviews: product.reviews ? product.reviews.toString() : "",
      instock: product.instock !== undefined ? product.instock : product.stock > 0,
    });
    setImagePreview(`${baseURL}/uploads/products/${product.image}`);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setEditingProductId(null);
    setImageFile(null);
    setImagePreview(null);
    setFormData({
      name: "",
      brand: "",
      color: "",
      material: "",
      length: "",
      price: "",
      category: "",
      image: "",
      stock: "",
      ratings: "",
      reviews: "",
      instock: true,
    });
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => setImagePreview(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsUpdating(true);

    try {
      const formDataToSend = new FormData();
      formDataToSend.append("name", formData.name);
      formDataToSend.append("brand", formData.brand);
      formDataToSend.append("color", formData.color);
      formDataToSend.append("material", formData.material);
      formDataToSend.append("length", formData.length);
      formDataToSend.append("price", formData.price);
      formDataToSend.append("category", formData.category);
      formDataToSend.append("stock", formData.stock);
      formDataToSend.append("ratings", formData.ratings || "0");
      formDataToSend.append("reviews", formData.reviews || "0");
      formDataToSend.append("instock", formData.instock);
      if (imageFile) {
        formDataToSend.append("image", imageFile);
      }

      const response = await updateProduct(editingProductId, formDataToSend);

      // ── OPTIMISTIC UPDATE: mutate localProducts instantly ──────────────────
      // Use the image filename returned by the server if a new file was
      // uploaded; otherwise keep the original.
      const updatedImage = response?.data?.image || formData.image;

      setLocalProducts((prev) =>
        prev.map((p) =>
          (p._id || p.id) === editingProductId
            ? {
                ...p,
                name: formData.name,
                brand: formData.brand,
                color: formData.color,
                material: formData.material,
                length: formData.length,
                price: Number(formData.price),
                category: formData.category,
                stock: Number(formData.stock),
                ratings: Number(formData.ratings) || 0,
                reviews: Number(formData.reviews) || 0,
                instock: formData.instock,
                image: updatedImage,
              }
            : p
        )
      );
      // ───────────────────────────────────────────────────────────────────────

      toast.success("Product updated successfully!");
      handleCloseModal();

      // Background sync — keeps context in sync with the DB.
      // Fire-and-forget; the useEffect above will pick up the new array.
      if (fetchProducts) fetchProducts();
    } catch (error) {
      console.error("Error updating product:", error);
      toast.error(
        `Failed to update product: ${error.response?.data?.message || error.message}`
      );
    } finally {
      setIsUpdating(false);
    }
  };

  // ── Delete ─────────────────────────────────────────────────────────────────
  const handleDeleteClick = (product) => {
    setProductToDelete(product);
    setShowDeleteModal(true);
  };

  const handleDeleteConfirm = async () => {
    if (!productToDelete) return;
    setIsDeleting(true);

    const productId = productToDelete._id || productToDelete.id;

    try {
      await deleteProduct(productId);

      // ── OPTIMISTIC REMOVAL: drop row from localProducts instantly ──────────
      setLocalProducts((prev) =>
        prev.filter((p) => (p._id || p.id) !== productId)
      );
      // ───────────────────────────────────────────────────────────────────────

      setShowDeleteModal(false);
      setProductToDelete(null);
      toast.success("Product deleted successfully!");

      // Background sync
      if (fetchProducts) fetchProducts();
    } catch (error) {
      console.error("Error deleting product:", error);
      toast.error(
        `Failed to delete product: ${error.response?.data?.message || error.message}`
      );
    } finally {
      setIsDeleting(false);
    }
  };

  const handleDeleteCancel = () => {
    setShowDeleteModal(false);
    setProductToDelete(null);
  };

  // ── Preview ────────────────────────────────────────────────────────────────
  const handlePreviewClick = (product) => {
    setPreviewProduct(product);
    setShowPreviewModal(true);
  };

  const handleClosePreview = () => {
    setShowPreviewModal(false);
    setPreviewProduct(null);
  };

  // ── Render ─────────────────────────────────────────────────────────────────
  return (
    <AdminPanel>
      <div className="space-y-6 -mt-3">

        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl lg:text-3xl xl:text-4xl font-bold text-gray-800">
              Products Management
            </h1>
            <p className="text-sm lg:text-base text-gray-600 mt-1">
              Manage your product inventory
            </p>
          </div>

          <button
            onClick={handleAddClick}
            className="px-4 py-2 bg-linear-to-r from-pink-500 to-red-500 text-white rounded-lg text-sm font-medium hover:from-pink-600 hover:to-red-600 transition-all shadow-lg"
          >
            <svg className="w-5 h-5 inline mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            Add New Product
          </button>
        </div>

        {/* Stats Cards — all read from localProducts */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white rounded-xl shadow-md border border-gray-100 p-5">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Products</p>
                <h3 className="text-2xl font-bold text-gray-800 mt-1">{localProducts.length}</h3>
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
                  {localProducts.filter((p) => p.stock > 0).length}
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
                  {localProducts.filter((p) => p.stock > 0 && p.stock < 10).length}
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
                <h3 className="text-2xl font-bold text-gray-800 mt-1">₹{totalSales}</h3>
              </div>
              <div className="p-3 bg-blue-100 rounded-lg">
                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                </svg>
              </div>
            </div>
          </div>
        </div>

        {/* Search & Filter */}
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
                <option key={idx} value={cat.toLowerCase()}>
                  {cat}
                </option>
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
                {filteredProducts.length === 0 ? (
                  <tr>
                    <td colSpan="8" className="px-5 lg:px-6 py-8 text-center text-gray-500">
                      No products found
                    </td>
                  </tr>
                ) : (
                  filteredProducts.map((product) => {
                    const status = getStatus(product.stock);
                    return (
                      <tr key={product._id || product.id} className="hover:bg-gray-50 transition-colors">
                        <td className="px-5 lg:px-6 py-4">
                          <input type="checkbox" className="w-4 h-4 text-pink-600 rounded border-gray-300 focus:ring-pink-500" />
                        </td>
                        <td className="px-5 lg:px-6 py-4">
                          <div className="flex items-center gap-3">
                            <img
                              src={`${baseURL}/uploads/products/${product.image}`}
                              alt={product.name}
                              className="w-12 h-12 object-cover rounded-lg"
                            />
                            <div>
                              <p className="text-sm font-semibold text-gray-800">{product.name}</p>
                              <p className="text-xs text-gray-500">{product.color} • {product.material}</p>
                            </div>
                          </div>
                        </td>
                        <td className="px-5 lg:px-6 py-4">
                          <span className="text-sm text-gray-700">{product.brand}</span>
                        </td>
                        <td className="px-5 lg:px-6 py-4">
                          <span className="text-sm text-gray-700">{product.category}</span>
                        </td>
                        <td className="px-5 lg:px-6 py-4">
                          <span className="text-sm font-semibold text-gray-800">₹{product.price}</span>
                        </td>
                        <td className="px-5 lg:px-6 py-4">
                          <span className="text-sm text-gray-700">{product.stock}</span>
                        </td>
                        <td className="px-5 lg:px-6 py-4">
                          <span className={`px-3 py-1 rounded-full text-xs font-semibold whitespace-nowrap ${getStatusColor(status)}`}>
                            {status}
                          </span>
                        </td>
                        <td className="px-5 lg:px-6 py-4">
                          <div className="flex items-center gap-2">
                            <button onClick={() => handlePreviewClick(product)} className="p-2 hover:bg-blue-50 rounded-lg transition-colors" title="View">
                              <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                              </svg>
                            </button>
                            <button onClick={() => handleEditClick(product)} className="p-2 hover:bg-green-50 rounded-lg transition-colors" title="Edit">
                              <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                              </svg>
                            </button>
                            <button onClick={() => handleDeleteClick(product)} className="p-2 hover:bg-red-50 rounded-lg transition-colors" title="Delete">
                              <svg className="w-5 h-5 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                              </svg>
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="px-5 lg:px-6 py-4 border-t border-gray-100 flex items-center justify-between">
            <p className="text-sm text-gray-600">
              Showing <span className="font-semibold">1-{filteredProducts.length}</span> of <span className="font-semibold">{localProducts.length}</span> products
            </p>
            <div className="flex gap-2">
              <button className="px-3 py-1.5 border border-gray-200 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors">Previous</button>
              <button className="px-3 py-1.5 bg-linear-to-r from-pink-500 to-red-500 text-white rounded-lg text-sm font-medium">1</button>
              <button className="px-3 py-1.5 border border-gray-200 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors">2</button>
              <button className="px-3 py-1.5 border border-gray-200 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors">Next</button>
            </div>
          </div>
        </div>
      </div>

      {/* ── Edit Product Modal ───────────────────────────────────────────────── */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-linear-to-r from-pink-500 to-red-500 text-white px-6 py-4 flex items-center justify-between rounded-t-2xl z-10">
              <h2 className="text-xl font-bold">Edit Product</h2>
              <button
                onClick={handleCloseModal}
                className="hover:bg-white hover:bg-opacity-20 rounded-full p-2 transition-all"
                disabled={isUpdating}
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Product Name <span className="text-red-500">*</span></label>
                  <input type="text" name="name" value={formData.name} onChange={handleInputChange} required disabled={isUpdating} placeholder="e.g., Plain Cotton Saree"
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-400 focus:border-transparent outline-none disabled:bg-gray-100 disabled:cursor-not-allowed" />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Brand <span className="text-red-500">*</span></label>
                  <input type="text" name="brand" value={formData.brand} onChange={handleInputChange} required disabled={isUpdating} placeholder="e.g., Royal Weaves"
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-400 focus:border-transparent outline-none disabled:bg-gray-100 disabled:cursor-not-allowed" />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Color <span className="text-red-500">*</span></label>
                  <input type="text" name="color" value={formData.color} onChange={handleInputChange} required disabled={isUpdating} placeholder="e.g., Cream, Red, Blue"
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-400 focus:border-transparent outline-none disabled:bg-gray-100 disabled:cursor-not-allowed" />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Material <span className="text-red-500">*</span></label>
                  <input type="text" name="material" value={formData.material} onChange={handleInputChange} required disabled={isUpdating} placeholder="e.g., Pure Cotton, Silk"
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-400 focus:border-transparent outline-none disabled:bg-gray-100 disabled:cursor-not-allowed" />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Length <span className="text-red-500">*</span></label>
                  <input type="text" name="length" value={formData.length} onChange={handleInputChange} required disabled={isUpdating} placeholder="e.g., 6m, 6.5m, 5.5m"
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-400 focus:border-transparent outline-none disabled:bg-gray-100 disabled:cursor-not-allowed" />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Price (₹) <span className="text-red-500">*</span></label>
                  <input type="number" name="price" value={formData.price} onChange={handleInputChange} required disabled={isUpdating} placeholder="e.g., 3200"
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-400 focus:border-transparent outline-none disabled:bg-gray-100 disabled:cursor-not-allowed" />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Category <span className="text-red-500">*</span></label>
                  <select name="category" value={formData.category} onChange={handleInputChange} required disabled={isUpdating}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-400 focus:border-transparent outline-none disabled:bg-gray-100 disabled:cursor-not-allowed">
                    <option value="">Select Category</option>
                    {categories.map((cat, index) => (
                      <option key={index} value={cat}>{cat}</option>
                    ))}
                  </select>
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Product Image</label>
                  <div className="flex items-start gap-4">
                    {imagePreview && (
                      <div className="shrink-0">
                        <img src={imagePreview} alt="Product preview" className="w-24 h-24 object-cover rounded-lg border-2 border-gray-200" />
                      </div>
                    )}
                    <div className="flex-1">
                      <div className="relative">
                        <input type="file" accept="image/*" onChange={handleImageChange} disabled={isUpdating} className="hidden" id="image-upload" />
                        <label htmlFor="image-upload"
                          className={`flex items-center justify-center gap-2 w-full px-4 py-3 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-pink-400 hover:bg-pink-50 transition-all ${isUpdating ? "opacity-50 cursor-not-allowed" : ""}`}>
                          <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                          </svg>
                          <span className="text-sm font-medium text-gray-600">
                            {imageFile ? imageFile.name : "Click to upload new image"}
                          </span>
                        </label>
                      </div>
                      <p className="text-xs text-gray-500 mt-2">Supported formats: JPG, PNG, WEBP (Max 5MB)</p>
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Stock Quantity <span className="text-red-500">*</span></label>
                  <input type="number" name="stock" value={formData.stock} onChange={handleInputChange} required min="0" disabled={isUpdating} placeholder="e.g., 40"
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-400 focus:border-transparent outline-none disabled:bg-gray-100 disabled:cursor-not-allowed" />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Ratings</label>
                  <input type="number" name="ratings" value={formData.ratings} onChange={handleInputChange} min="0" max="5" step="0.1" disabled={isUpdating} placeholder="e.g., 4.5"
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-400 focus:border-transparent outline-none disabled:bg-gray-100 disabled:cursor-not-allowed" />
                  <p className="text-xs text-gray-500 mt-1">Rating out of 5 (e.g., 4.8)</p>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Reviews Count</label>
                  <input type="number" name="reviews" value={formData.reviews} onChange={handleInputChange} min="0" disabled={isUpdating} placeholder="e.g., 47"
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-400 focus:border-transparent outline-none disabled:bg-gray-100 disabled:cursor-not-allowed" />
                  <p className="text-xs text-gray-500 mt-1">Number of customer reviews</p>
                </div>

                <div></div>

                <div className="md:col-span-2">
                  <label className={`flex items-center gap-3 cursor-pointer p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors ${isUpdating ? "opacity-50 cursor-not-allowed" : ""}`}>
                    <input type="checkbox" name="instock" checked={formData.instock} onChange={handleInputChange} disabled={isUpdating} className="w-5 h-5 text-pink-600 rounded focus:ring-pink-500" />
                    <div>
                      <span className="text-sm font-semibold text-gray-700 block">Product is in stock and available for sale</span>
                      <span className="text-xs text-gray-500">Toggle this to mark product as available or unavailable</span>
                    </div>
                  </label>
                </div>
              </div>

              <div className="flex items-center justify-end gap-3 mt-8 pt-6 border-t border-gray-200">
                <button type="button" onClick={handleCloseModal} disabled={isUpdating}
                  className="px-6 py-2.5 border border-gray-300 text-gray-700 rounded-lg font-semibold hover:bg-gray-50 transition-all disabled:opacity-50 disabled:cursor-not-allowed">
                  Cancel
                </button>
                <button type="submit" disabled={isUpdating}
                  className="px-6 py-2.5 bg-linear-to-r from-pink-500 to-red-500 text-white rounded-lg font-semibold hover:from-pink-600 hover:to-red-600 transition-all shadow-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2">
                  {isUpdating ? (
                    <>
                      <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Updating...
                    </>
                  ) : (
                    "Update Product"
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ── Delete Confirmation Modal ─────────────────────────────────────────── */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full">
            <div className="bg-linear-to-r from-red-500 to-red-600 text-white px-6 py-4 rounded-t-2xl">
              <h2 className="text-xl font-bold">Confirm Delete</h2>
            </div>

            <div className="p-6">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center">
                  <svg className="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-800">Delete Product?</h3>
                  <p className="text-sm text-gray-600">This action cannot be undone.</p>
                </div>
              </div>

              {productToDelete && (
                <div className="bg-gray-50 rounded-lg p-4 mb-6">
                  <p className="text-sm text-gray-600 mb-2">You are about to delete:</p>
                  <div className="flex items-center gap-3">
                    <img src={`${baseURL}/uploads/products/${productToDelete.image}`} alt={productToDelete.name} className="w-12 h-12 object-cover rounded-lg" />
                    <div>
                      <p className="font-semibold text-gray-800">{productToDelete.name}</p>
                      <p className="text-xs text-gray-500">{productToDelete.brand} • {productToDelete.category}</p>
                    </div>
                  </div>
                </div>
              )}

              <div className="flex items-center justify-end gap-3">
                <button onClick={handleDeleteCancel} disabled={isDeleting}
                  className="px-6 py-2.5 border border-gray-300 text-gray-700 rounded-lg font-semibold hover:bg-gray-50 transition-all disabled:opacity-50 disabled:cursor-not-allowed">
                  Cancel
                </button>
                <button onClick={handleDeleteConfirm} disabled={isDeleting}
                  className="px-6 py-2.5 bg-linear-to-r from-red-500 to-red-600 text-white rounded-lg font-semibold hover:from-red-600 hover:to-red-700 transition-all shadow-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2">
                  {isDeleting ? (
                    <>
                      <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Deleting...
                    </>
                  ) : (
                    "Delete Product"
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ── Product Preview Modal ─────────────────────────────────────────────── */}
      {showPreviewModal && previewProduct && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-linear-to-r from-blue-500 to-blue-600 text-white px-6 py-4 flex items-center justify-between rounded-t-2xl z-10">
              <h2 className="text-xl font-bold">Product Preview</h2>
              <button onClick={handleClosePreview} className="hover:bg-white hover:bg-opacity-20 rounded-full p-2 transition-all">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex items-center justify-center bg-gray-50 rounded-xl p-6">
                  <img src={`${baseURL}/uploads/products/${previewProduct.image}`} alt={previewProduct.name} className="max-w-full max-h-80 object-contain rounded-lg" />
                </div>

                <div className="space-y-4">
                  <div>
                    <h3 className="text-2xl font-bold text-gray-800 mb-2">{previewProduct.name}</h3>
                    <p className="text-3xl font-bold text-pink-600">₹{previewProduct.price}</p>
                  </div>

                  <div className="border-t border-gray-200 pt-4 space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-semibold text-gray-600">Brand:</span>
                      <span className="text-sm text-gray-800">{previewProduct.brand}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-semibold text-gray-600">Category:</span>
                      <span className="text-sm text-gray-800">{previewProduct.category}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-semibold text-gray-600">Color:</span>
                      <span className="text-sm text-gray-800">{previewProduct.color}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-semibold text-gray-600">Material:</span>
                      <span className="text-sm text-gray-800">{previewProduct.material}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-semibold text-gray-600">Length:</span>
                      <span className="text-sm text-gray-800">{previewProduct.length}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-semibold text-gray-600">Stock:</span>
                      <span className="text-sm text-gray-800">{previewProduct.stock} units</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-semibold text-gray-600">Status:</span>
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold whitespace-nowrap ${getStatusColor(getStatus(previewProduct.stock))}`}>
                        {getStatus(previewProduct.stock)}
                      </span>
                    </div>
                  </div>

                  <div className="flex gap-3 pt-4 border-t border-gray-200">
                    <button
                      onClick={() => { handleClosePreview(); handleEditClick(previewProduct); }}
                      className="flex-1 px-4 py-2.5 bg-linear-to-r from-green-500 to-green-600 text-white rounded-lg font-semibold hover:from-green-600 hover:to-green-700 transition-all shadow-lg">
                      Edit Product
                    </button>
                    <button
                      onClick={() => { handleClosePreview(); handleDeleteClick(previewProduct); }}
                      className="flex-1 px-4 py-2.5 bg-linear-to-r from-red-500 to-red-600 text-white rounded-lg font-semibold hover:from-red-600 hover:to-red-700 transition-all shadow-lg">
                      Delete Product
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <div className="px-6 pb-6">
              <button onClick={handleClosePreview} className="w-full px-6 py-2.5 border border-gray-300 text-gray-700 rounded-lg font-semibold hover:bg-gray-50 transition-all">
                Close Preview
              </button>
            </div>
          </div>
        </div>
      )}
    </AdminPanel>
  );
};

export default AdminProducts;