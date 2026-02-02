import React, { useState } from "react";
import AdminPanel from "./AdminPanel";

const AdminUsers = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");

  const users = [
    { id: 1, name: "Priya Sharma", email: "priya@example.com", role: "Customer", orders: 15, joined: "Jan 15, 2024", status: "Active" },
    { id: 2, name: "Anjali Patel", email: "anjali@example.com", role: "Customer", orders: 8, joined: "Feb 20, 2024", status: "Active" },
    { id: 3, name: "Meera Reddy", email: "meera@example.com", role: "Customer", orders: 23, joined: "Mar 10, 2024", status: "Active" },
    { id: 4, name: "Lakshmi Iyer", email: "lakshmi@example.com", role: "Customer", orders: 5, joined: "Apr 5, 2024", status: "Inactive" },
    { id: 5, name: "Divya Kumar", email: "divya@example.com", role: "Admin", orders: 0, joined: "May 12, 2024", status: "Active" },
    { id: 6, name: "Sneha Gupta", email: "sneha@example.com", role: "Customer", orders: 12, joined: "Jun 8, 2024", status: "Active" },
    { id: 7, name: "Kavya Singh", email: "kavya@example.com", role: "Customer", orders: 7, joined: "Jul 22, 2024", status: "Inactive" },
    { id: 8, name: "Riya Nair", email: "riya@example.com", role: "Customer", orders: 19, joined: "Aug 30, 2024", status: "Active" },
  ];

  const getStatusColor = (status) => {
    return status === "Active" ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-700";
  };

  const getRoleBadge = (role) => {
    return role === "Admin" ? "bg-pink-100 text-pink-700" : "bg-blue-100 text-blue-700";
  };

  return (
    <AdminPanel>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl lg:text-3xl xl:text-4xl font-bold text-gray-800">Users Management</h1>
            <p className="text-sm lg:text-base text-gray-600 mt-1">Manage and monitor all users</p>
          </div>
          <button className="px-4 py-2 bg-gradient-to-r from-pink-500 to-red-500 text-white rounded-lg text-sm font-medium hover:from-pink-600 hover:to-red-600 transition-all shadow-lg">
            <svg className="w-5 h-5 inline mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            Add New User
          </button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white rounded-xl shadow-md border border-gray-100 p-5">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Users</p>
                <h3 className="text-2xl font-bold text-gray-800 mt-1">{users.length}</h3>
              </div>
              <div className="p-3 bg-blue-100 rounded-lg">
                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-md border border-gray-100 p-5">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Active Users</p>
                <h3 className="text-2xl font-bold text-gray-800 mt-1">
                  {users.filter(u => u.status === "Active").length}
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
                <p className="text-sm text-gray-600">Admins</p>
                <h3 className="text-2xl font-bold text-gray-800 mt-1">
                  {users.filter(u => u.role === "Admin").length}
                </h3>
              </div>
              <div className="p-3 bg-pink-100 rounded-lg">
                <svg className="w-6 h-6 text-pink-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-md border border-gray-100 p-5">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">New This Month</p>
                <h3 className="text-2xl font-bold text-gray-800 mt-1">12</h3>
              </div>
              <div className="p-3 bg-purple-100 rounded-lg">
                <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
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
                  placeholder="Search users by name or email..."
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
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="px-4 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-pink-400 focus:border-transparent outline-none text-sm font-medium"
            >
              <option value="all">All Status</option>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>
          </div>
        </div>

        {/* Users Table */}
        <div className="bg-white rounded-xl shadow-md border border-gray-100 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-5 lg:px-6 py-4 text-left">
                    <input type="checkbox" className="w-4 h-4 text-pink-600 rounded border-gray-300 focus:ring-pink-500" />
                  </th>
                  <th className="px-5 lg:px-6 py-4 text-left text-xs lg:text-sm font-semibold text-gray-700 uppercase tracking-wider">User</th>
                  <th className="px-5 lg:px-6 py-4 text-left text-xs lg:text-sm font-semibold text-gray-700 uppercase tracking-wider">Role</th>
                  <th className="px-5 lg:px-6 py-4 text-left text-xs lg:text-sm font-semibold text-gray-700 uppercase tracking-wider">Orders</th>
                  <th className="px-5 lg:px-6 py-4 text-left text-xs lg:text-sm font-semibold text-gray-700 uppercase tracking-wider">Joined</th>
                  <th className="px-5 lg:px-6 py-4 text-left text-xs lg:text-sm font-semibold text-gray-700 uppercase tracking-wider">Status</th>
                  <th className="px-5 lg:px-6 py-4 text-left text-xs lg:text-sm font-semibold text-gray-700 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {users.map((user) => (
                  <tr key={user.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-5 lg:px-6 py-4">
                      <input type="checkbox" className="w-4 h-4 text-pink-600 rounded border-gray-300 focus:ring-pink-500" />
                    </td>
                    <td className="px-5 lg:px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-r from-pink-500 to-red-500 flex items-center justify-center text-white font-semibold">
                          {user.name.charAt(0)}
                        </div>
                        <div>
                          <p className="text-sm font-semibold text-gray-800">{user.name}</p>
                          <p className="text-xs text-gray-600">{user.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-5 lg:px-6 py-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getRoleBadge(user.role)}`}>{user.role}</span>
                    </td>
                    <td className="px-5 lg:px-6 py-4"><span className="text-sm font-medium text-gray-800">{user.orders}</span></td>
                    <td className="px-5 lg:px-6 py-4"><span className="text-sm text-gray-700">{user.joined}</span></td>
                    <td className="px-5 lg:px-6 py-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(user.status)}`}>{user.status}</span>
                    </td>
                    <td className="px-5 lg:px-6 py-4">
                      <div className="flex items-center gap-2">
                        <button className="p-2 hover:bg-blue-50 rounded-lg transition-colors" title="View">
                          <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                          </svg>
                        </button>
                        <button className="p-2 hover:bg-green-50 rounded-lg transition-colors" title="Edit">
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
              Showing <span className="font-semibold">1-{users.length}</span> of <span className="font-semibold">{users.length}</span> users
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
    </AdminPanel>
  );
};

export default AdminUsers;