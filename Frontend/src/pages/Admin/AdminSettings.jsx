import React, { useState } from "react";
import AdminPanel from "./AdminPanel";

const AdminSettings = () => {
  const [activeTab, setActiveTab] = useState("general");

  const tabs = [
    { id: "general", name: "General", icon: "⚙️" },
    { id: "profile", name: "Profile", icon: "👤" },
    { id: "security", name: "Security", icon: "🔒" },
    { id: "notifications", name: "Notifications", icon: "🔔" },
    { id: "payment", name: "Payment", icon: "💳" },
  ];

  return (
    <AdminPanel>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-2xl lg:text-3xl xl:text-4xl font-bold text-gray-800">Settings</h1>
          <p className="text-sm lg:text-base text-gray-600 mt-1">Manage your admin preferences and configurations</p>
        </div>

        {/* Tabs Navigation */}
        <div className="bg-white rounded-xl shadow-md border border-gray-100 overflow-hidden">
          <div className="flex overflow-x-auto">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex-1 min-w-fit px-6 py-4 text-sm font-semibold transition-all ${
                  activeTab === tab.id
                    ? "bg-gradient-to-r from-pink-500 to-red-500 text-white"
                    : "text-gray-600 hover:bg-gray-50"
                }`}
              >
                <span className="mr-2">{tab.icon}</span>
                {tab.name}
              </button>
            ))}
          </div>
        </div>

        {/* General Settings */}
        {activeTab === "general" && (
          <div className="bg-white rounded-xl shadow-md border border-gray-100 p-6 lg:p-8">
            <h2 className="text-xl font-bold text-gray-800 mb-6">General Settings</h2>
            
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Store Name</label>
                <input
                  type="text"
                  defaultValue="Saree Shop"
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-pink-400 focus:border-transparent outline-none"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Store Email</label>
                <input
                  type="email"
                  defaultValue="admin@sareeshop.com"
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-pink-400 focus:border-transparent outline-none"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Store Phone</label>
                <input
                  type="tel"
                  defaultValue="+91 98765 43210"
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-pink-400 focus:border-transparent outline-none"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Store Address</label>
                <textarea
                  rows="3"
                  defaultValue="123 Saree Street, Fashion District, Mumbai, India"
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-pink-400 focus:border-transparent outline-none"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Currency</label>
                <select className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-pink-400 focus:border-transparent outline-none">
                  <option value="INR">INR (₹)</option>
                  <option value="USD">USD ($)</option>
                  <option value="EUR">EUR (€)</option>
                </select>
              </div>

              <button className="px-6 py-2.5 bg-gradient-to-r from-pink-500 to-red-500 text-white rounded-lg font-semibold hover:from-pink-600 hover:to-red-600 transition-all shadow-lg">
                Save Changes
              </button>
            </div>
          </div>
        )}

        {/* Profile Settings */}
        {activeTab === "profile" && (
          <div className="bg-white rounded-xl shadow-md border border-gray-100 p-6 lg:p-8">
            <h2 className="text-xl font-bold text-gray-800 mb-6">Profile Settings</h2>
            
            <div className="space-y-6">
              <div className="flex items-center gap-6">
                <div className="w-24 h-24 rounded-full bg-gradient-to-r from-pink-500 to-red-500 flex items-center justify-center text-white text-3xl font-bold shadow-lg">
                  A
                </div>
                <div>
                  <button className="px-4 py-2 bg-pink-100 text-pink-600 rounded-lg text-sm font-semibold hover:bg-pink-200 transition-colors">
                    Change Photo
                  </button>
                  <p className="text-xs text-gray-600 mt-2">JPG, PNG or GIF (Max 2MB)</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">First Name</label>
                  <input
                    type="text"
                    defaultValue="Admin"
                    className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-pink-400 focus:border-transparent outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Last Name</label>
                  <input
                    type="text"
                    defaultValue="User"
                    className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-pink-400 focus:border-transparent outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Email Address</label>
                <input
                  type="email"
                  defaultValue="admin@example.com"
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-pink-400 focus:border-transparent outline-none"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Phone Number</label>
                <input
                  type="tel"
                  defaultValue="+91 98765 43210"
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-pink-400 focus:border-transparent outline-none"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Bio</label>
                <textarea
                  rows="4"
                  placeholder="Tell us about yourself..."
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-pink-400 focus:border-transparent outline-none"
                />
              </div>

              <button className="px-6 py-2.5 bg-gradient-to-r from-pink-500 to-red-500 text-white rounded-lg font-semibold hover:from-pink-600 hover:to-red-600 transition-all shadow-lg">
                Update Profile
              </button>
            </div>
          </div>
        )}

        {/* Security Settings */}
        {activeTab === "security" && (
          <div className="bg-white rounded-xl shadow-md border border-gray-100 p-6 lg:p-8">
            <h2 className="text-xl font-bold text-gray-800 mb-6">Security Settings</h2>
            
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Current Password</label>
                <input
                  type="password"
                  placeholder="Enter current password"
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-pink-400 focus:border-transparent outline-none"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">New Password</label>
                <input
                  type="password"
                  placeholder="Enter new password"
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-pink-400 focus:border-transparent outline-none"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Confirm New Password</label>
                <input
                  type="password"
                  placeholder="Confirm new password"
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-pink-400 focus:border-transparent outline-none"
                />
              </div>

              <button className="px-6 py-2.5 bg-gradient-to-r from-pink-500 to-red-500 text-white rounded-lg font-semibold hover:from-pink-600 hover:to-red-600 transition-all shadow-lg">
                Change Password
              </button>

              <div className="border-t border-gray-200 pt-6 mt-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Two-Factor Authentication</h3>
                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div>
                    <p className="text-sm font-semibold text-gray-800">Enable 2FA</p>
                    <p className="text-xs text-gray-600 mt-1">Add an extra layer of security to your account</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" className="sr-only peer" />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-pink-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-pink-600"></div>
                  </label>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Notifications Settings */}
        {activeTab === "notifications" && (
          <div className="bg-white rounded-xl shadow-md border border-gray-100 p-6 lg:p-8">
            <h2 className="text-xl font-bold text-gray-800 mb-6">Notification Preferences</h2>
            
            <div className="space-y-4">
              {[
                { title: "Email Notifications", desc: "Receive email updates about orders and activities" },
                { title: "Order Updates", desc: "Get notified when orders are placed or updated" },
                { title: "Product Updates", desc: "Notifications about low stock and new products" },
                { title: "User Activities", desc: "Get alerts about new user registrations" },
                { title: "Payment Notifications", desc: "Receive alerts for successful payments" },
                { title: "Weekly Reports", desc: "Get weekly summary reports via email" },
              ].map((item, index) => (
                <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                  <div>
                    <p className="text-sm font-semibold text-gray-800">{item.title}</p>
                    <p className="text-xs text-gray-600 mt-1">{item.desc}</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" defaultChecked className="sr-only peer" />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-pink-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-pink-600"></div>
                  </label>
                </div>
              ))}
            </div>

            <button className="mt-6 px-6 py-2.5 bg-gradient-to-r from-pink-500 to-red-500 text-white rounded-lg font-semibold hover:from-pink-600 hover:to-red-600 transition-all shadow-lg">
              Save Preferences
            </button>
          </div>
        )}

        {/* Payment Settings */}
        {activeTab === "payment" && (
          <div className="bg-white rounded-xl shadow-md border border-gray-100 p-6 lg:p-8">
            <h2 className="text-xl font-bold text-gray-800 mb-6">Payment Settings</h2>
            
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Payment Gateway</label>
                  <select className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-pink-400 focus:border-transparent outline-none">
                    <option>Razorpay</option>
                    <option>Stripe</option>
                    <option>PayPal</option>
                    <option>Paytm</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Tax Rate (%)</label>
                  <input
                    type="number"
                    defaultValue="18"
                    className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-pink-400 focus:border-transparent outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">API Key</label>
                <input
                  type="text"
                  placeholder="Enter your payment gateway API key"
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-pink-400 focus:border-transparent outline-none"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Secret Key</label>
                <input
                  type="password"
                  placeholder="Enter your payment gateway secret key"
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-pink-400 focus:border-transparent outline-none"
                />
              </div>

              <div className="space-y-4 pt-4 border-t border-gray-200">
                <h3 className="text-lg font-semibold text-gray-800">Payment Methods</h3>
                {[
                  { name: "Credit/Debit Cards", enabled: true },
                  { name: "UPI Payments", enabled: true },
                  { name: "Net Banking", enabled: true },
                  { name: "Cash on Delivery", enabled: false },
                  { name: "Wallet Payments", enabled: true },
                ].map((method, index) => (
                  <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <p className="text-sm font-semibold text-gray-800">{method.name}</p>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" defaultChecked={method.enabled} className="sr-only peer" />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-pink-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-pink-600"></div>
                    </label>
                  </div>
                ))}
              </div>

              <button className="px-6 py-2.5 bg-gradient-to-r from-pink-500 to-red-500 text-white rounded-lg font-semibold hover:from-pink-600 hover:to-red-600 transition-all shadow-lg">
                Save Payment Settings
              </button>
            </div>
          </div>
        )}
      </div>
    </AdminPanel>
  );
};

export default AdminSettings;