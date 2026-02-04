import React, { useState, useEffect } from "react";
import AdminPanel from "./AdminPanel";
import { getUsers, deleteUser } from "../interceptor/interceptor";
import { toast } from "react-toastify";

const AdminUsers = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [userToDelete, setUserToDelete] = useState(null);
  const [deleteLoading, setDeleteLoading] = useState(false);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await getUsers();
      console.log("Fetched users:", response.data); // Debug log
      setUsers(response.data || []);
    } catch (err) {
      setError(err.message || "Failed to fetch users");
      console.error("Error fetching users:", err);
    } finally {
      setLoading(false);
    }
  };

  // Calculate counts with flexible field checking
  const totalUsers = users.length;
  
  // Check for active users - handle different possible field names
  const activeUsers = users.filter((u) => {
    // Try different variations of status field
    return u.status === "Active" || 
           u.status === "active" || 
           u.isActive === true ||
           u.active === true;
  }).length;
  
  // Check for admin users - handle different possible field names
  const adminUsers = users.filter((u) => {
    // Try different variations of role field
    return u.role === "Admin" || 
           u.role === "admin" || 
           u.isAdmin === true ||
           u.admin === true;
  }).length;

  // Regular users (non-admin users)
  const regularUsers = users.filter((u) => {
    // Try different variations of role field - exclude admins
    return u.role !== "Admin" && 
           u.role !== "admin" && 
           u.isAdmin !== true &&
           u.admin !== true;
  }).length;

  // Filter users based on search query only
  const filteredUsers = users.filter((user) => {
    const matchesSearch =
      user.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email?.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesSearch;
  });

  // Handle delete user — opens the confirmation modal
  const handleDeleteUser = (user) => {
    setUserToDelete(user);
    setShowDeleteModal(true);
  };

  // Confirm delete — calls the API, then updates local state
  const confirmDelete = async () => {
    try {
      setDeleteLoading(true);
      await deleteUser(userToDelete._id);

      // Remove the deleted user from local state
      setUsers((prev) => prev.filter((u) => u._id !== userToDelete._id));

      // Close modal and reset
      setShowDeleteModal(false);
      setUserToDelete(null);
      toast.success("User deleted successfully");
    } catch (err) {
      console.error("Error deleting user:", err);
      const errorMessage =
        err?.response?.data?.message ||
        err?.message ||
        "Failed to delete user. Please try again.";
      toast.error(errorMessage);
    } finally {
      setDeleteLoading(false);
    }
  };

  const getStatusColor = (status) => {
    return status === "Active"
      ? "bg-green-100 text-green-700"
      : "bg-gray-100 text-gray-700";
  };

  const getRoleBadge = (role) => {
    return role === "Admin"
      ? "bg-pink-100 text-pink-700"
      : "bg-blue-100 text-blue-700";
  };

  // Loading state
  if (loading) {
    return (
      <AdminPanel>
        <div className="flex items-center justify-center h-96">
          <div className="text-center">
            <div className="w-16 h-16 border-4 border-pink-500 border-t-transparent rounded-full animate-spin mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading users...</p>
          </div>
        </div>
      </AdminPanel>
    );
  }

  // Error state
  if (error) {
    return (
      <AdminPanel>
        <div className="flex items-center justify-center h-96">
          <div className="text-center">
            <svg
              className="w-16 h-16 text-red-500 mx-auto"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <p className="mt-4 text-red-600 font-semibold">{error}</p>
            <button
              onClick={fetchUsers}
              className="mt-4 px-4 py-2 bg-pink-500 text-white rounded-lg hover:bg-pink-600 transition-colors"
            >
              Retry
            </button>
          </div>
        </div>
      </AdminPanel>
    );
  }

  return (
    <AdminPanel>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-2xl lg:text-3xl xl:text-4xl font-bold text-gray-800">
            Users Management
          </h1>
          <p className="text-sm lg:text-base text-gray-600 mt-1">
            Manage and monitor all users
          </p>
        </div>

        {/* Stats Cards - Only 3 cards now */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {/* Total Users */}
          <div className="bg-white rounded-xl shadow-md border border-gray-100 p-5">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Users</p>
                <h3 className="text-2xl font-bold text-gray-800 mt-1">
                  {totalUsers}
                </h3>
              </div>
              <div className="p-3 bg-blue-100 rounded-lg">
                <svg
                  className="w-6 h-6 text-blue-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
                  />
                </svg>
              </div>
            </div>
          </div>

          {/* Users (excluding admins) */}
          <div className="bg-white rounded-xl shadow-md border border-gray-100 p-5">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Users</p>
                <h3 className="text-2xl font-bold text-gray-800 mt-1">
                  {regularUsers}
                </h3>
              </div>
              <div className="p-3 bg-green-100 rounded-lg">
                <svg
                  className="w-6 h-6 text-green-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
            </div>
          </div>

          {/* Admins */}
          <div className="bg-white rounded-xl shadow-md border border-gray-100 p-5">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Admins</p>
                <h3 className="text-2xl font-bold text-gray-800 mt-1">
                  {adminUsers}
                </h3>
              </div>
              <div className="p-3 bg-pink-100 rounded-lg">
                <svg
                  className="w-6 h-6 text-pink-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                  />
                </svg>
              </div>
            </div>
          </div>
        </div>

        {/* Search Only - Status dropdown removed */}
        <div className="bg-white rounded-xl shadow-md border border-gray-100 p-5">
          <div className="relative">
            <input
              type="text"
              placeholder="Search users by name or email..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-pink-400 focus:border-transparent outline-none text-sm"
            />
            <svg
              className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>
        </div>

        {/* Users Table */}
        <div className="bg-white rounded-xl shadow-md border border-gray-100 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-5 lg:px-6 py-4 text-left">
                    <input
                      type="checkbox"
                      className="w-4 h-4 text-pink-600 rounded border-gray-300 focus:ring-pink-500"
                    />
                  </th>
                  <th className="px-5 lg:px-6 py-4 text-left text-xs lg:text-sm font-semibold text-gray-700 uppercase tracking-wider">
                    User
                  </th>
                  <th className="px-5 lg:px-6 py-4 text-left text-xs lg:text-sm font-semibold text-gray-700 uppercase tracking-wider">
                    Role
                  </th>
                  <th className="px-5 lg:px-6 py-4 text-left text-xs lg:text-sm font-semibold text-gray-700 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {filteredUsers.length === 0 ? (
                  <tr>
                    <td
                      colSpan="4"
                      className="px-5 lg:px-6 py-8 text-center text-gray-500"
                    >
                      No users found
                    </td>
                  </tr>
                ) : (
                  filteredUsers.map((user) => (
                    <tr
                      key={user._id}
                      className="hover:bg-gray-50 transition-colors"
                    >
                      <td className="px-5 lg:px-6 py-4">
                        <input
                          type="checkbox"
                          className="w-4 h-4 text-pink-600 rounded border-gray-300 focus:ring-pink-500"
                        />
                      </td>
                      <td className="px-5 lg:px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-linear-to-r from-pink-500 to-red-500 flex items-center justify-center text-white font-semibold">
                            {user.name?.charAt(0).toUpperCase()}
                          </div>
                          <div>
                            <p className="text-sm font-semibold text-gray-800">
                              {user.name}
                            </p>
                            <p className="text-xs text-gray-600">
                              {user.email}
                            </p>
                          </div>
                        </div>
                      </td>
                      <td className="px-5 lg:px-6 py-4">
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-semibold ${getRoleBadge(
                            user.role
                          )}`}
                        >
                          {user.role}
                        </span>
                      </td>
                      <td className="px-5 lg:px-6 py-4">
                        <div className="flex items-center gap-2">
                          {/* Delete button */}
                          <button
                            onClick={() => handleDeleteUser(user)}
                            className="p-2 hover:bg-red-50 rounded-lg transition-colors"
                            title="Delete"
                          >
                            <svg
                              className="w-5 h-5 text-red-600"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                              />
                            </svg>
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="px-5 lg:px-6 py-4 border-t border-gray-100 flex items-center justify-between">
            <p className="text-sm text-gray-600">
              Showing{" "}
              <span className="font-semibold">1-{filteredUsers.length}</span> of{" "}
              <span className="font-semibold">{users.length}</span> users
            </p>
            <div className="flex gap-2">
              <button className="px-3 py-1.5 border border-gray-200 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors">
                Previous
              </button>
              <button className="px-3 py-1.5 bg-linear-to-r from-pink-500 to-red-500 text-white rounded-lg text-sm font-medium">
                1
              </button>
              <button className="px-3 py-1.5 border border-gray-200 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors">
                2
              </button>
              <button className="px-3 py-1.5 border border-gray-200 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors">
                Next
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      {showDeleteModal && userToDelete && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full">
            <div className="p-6">
              <div className="flex items-center justify-center w-16 h-16 bg-red-100 rounded-full mx-auto mb-4">
                <svg
                  className="w-8 h-8 text-red-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                  />
                </svg>
              </div>

              <h3 className="text-xl font-bold text-gray-800 text-center mb-2">
                Delete User
              </h3>
              <p className="text-gray-600 text-center mb-6">
                Are you sure you want to delete{" "}
                <span className="font-semibold">{userToDelete.name}</span>? This
                action cannot be undone.
              </p>

              <div className="flex gap-3">
                {/* Cancel button — closes modal, resets userToDelete */}
                <button
                  onClick={() => {
                    setShowDeleteModal(false);
                    setUserToDelete(null);
                  }}
                  disabled={deleteLoading}
                  className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-100 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Cancel
                </button>

                {/* Delete button — calls confirmDelete, shows spinner while loading */}
                <button
                  onClick={confirmDelete}
                  disabled={deleteLoading}
                  className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {deleteLoading ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      Deleting...
                    </>
                  ) : (
                    "Delete"
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </AdminPanel>
  );
};

export default AdminUsers;