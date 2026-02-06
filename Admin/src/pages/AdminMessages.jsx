import React, { useState } from "react";
import { deleteMessage } from "../interceptor/interceptor";
import AdminPanel from "./AdminPanel";
import { useAdminData } from "../context/AdminContext";

const AdminMessages = () => {
  const [selectedMessage, setSelectedMessage] = useState(null);
  const [deleteConfirm, setDeleteConfirm] = useState(null);
  const [toast, setToast] = useState(null);

  const { messages, messageLoading, setMessages, setUnreadCount, refetchMessages } = useAdminData();

  const showToast = (message, type = "success") => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

  const handleDelete = async (messageId) => {
    try {
      await deleteMessage(messageId);
      const updatedMessages = messages.filter(msg => msg._id !== messageId);
      setMessages(updatedMessages);
      setUnreadCount(updatedMessages.length);
      
      if (selectedMessage?._id === messageId) {
        setSelectedMessage(null);
      }
      setDeleteConfirm(null);
      showToast("Message deleted successfully!", "success");
    } catch (err) {
      console.error("Error deleting message:", err);
      showToast("Failed to delete message. Please try again.", "error");
    }
  };

  const truncateText = (text, maxLength = 100) => {
    if (!text) return "No message provided";
    return text.length > maxLength ? text.substring(0, maxLength) + "..." : text;
  };

  const renderContent = () => {
    if (messageLoading) {
      return (
        <div className="flex items-center justify-center min-h-100">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-pink-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Loading messages...</p>
          </div>
        </div>
      );
    }

    return (
      <>
        {/* Header */}
        <div className="space-y-6 -mt-3 mb-3">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Contact Messages</h1>
          <p className="text-gray-600">Manage customer inquiries and contact form submissions</p>
        </div>

        {/* Messages Count */}
        <div className="bg-linear-to-r from-pink-500 to-red-500 rounded-2xl p-6 mb-6 text-white shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-2xl font-bold">{messages.length}</p>
              <p className="text-pink-100">Total Messages</p>
            </div>
            <button
              onClick={refetchMessages}
              className="px-4 py-2 bg-white/20 hover:bg-white/30 rounded-lg transition-all backdrop-blur-sm"
            >
              🔄 Refresh
            </button>
          </div>
        </div>

        {/* Messages List or Empty State */}
        {messages.length === 0 ? (
          <div className="text-center py-16 bg-gray-50 rounded-2xl">
            <div className="text-6xl mb-4">📭</div>
            <h3 className="text-xl font-semibold text-gray-700 mb-2">No Messages Yet</h3>
            <p className="text-gray-500">Contact form submissions will appear here</p>
          </div>
        ) : (
          <div className="space-y-4">
            {messages.map((message, index) => (
              <div
                key={message._id || index}
                className="bg-white rounded-2xl shadow-md hover:shadow-lg transition-all border border-gray-100 overflow-hidden"
              >
                {/* Message Header */}
                <div className="bg-linear-to-r from-pink-50 to-purple-50 px-6 py-4 border-b border-gray-100">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-linear-to-r from-pink-500 to-red-500 flex items-center justify-center text-white font-bold">
                        {message.name?.charAt(0).toUpperCase() || "?"}
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-800">{message.name || "Anonymous"}</h3>
                        <p className="text-sm text-gray-500">
                          {new Date(message.createdAt).toLocaleDateString('en-US', {
                            month: 'short',
                            day: 'numeric',
                            year: 'numeric'
                          })}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Message Body */}
                <div className="px-6 py-4 space-y-3">
                  {/* Email */}
                  <div className="flex items-start gap-2">
                    <span className="text-sm font-medium text-gray-500 min-w-15">Email</span>
                    <span className="text-sm text-gray-800 flex-1">{message.email || "N/A"}</span>
                  </div>

                  {/* Phone */}
                  <div className="flex items-start gap-2">
                    <span className="text-sm font-medium text-gray-500 min-w-15">Phone</span>
                    <span className="text-sm text-gray-800 flex-1">{message.phone || "N/A"}</span>
                  </div>

                  {/* Message Preview */}
                  <div className="flex items-start gap-2">
                    <span className="text-sm font-medium text-gray-500 min-w-15">Message</span>
                    <span className="text-sm text-gray-600 flex-1 italic">
                      {truncateText(message.message, 100)}
                    </span>
                  </div>
                </div>

                {/* Message Footer - Actions */}
                <div className="px-6 py-4 bg-gray-50 flex gap-3">
                  <button
                    onClick={() => setSelectedMessage(message)}
                    className="flex-1 px-4 py-2 bg-pink-50 text-pink-600 rounded-lg hover:bg-pink-100 transition-all text-sm font-medium flex items-center justify-center gap-2"
                  >
                    👁️ View Full Message
                  </button>
                  <button
                    onClick={() => setDeleteConfirm(message)}
                    className="px-4 py-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-all text-sm font-medium flex items-center justify-center gap-2"
                  >
                    🗑️ Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Message Detail Modal */}
        {selectedMessage && (
          <div
            className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50"
            onClick={() => setSelectedMessage(null)}
          >
            <div
              className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-auto"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal Header */}
              <div className="bg-linear-to-r from-pink-500 to-purple-600 px-6 py-6 text-white sticky top-0">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center text-white font-bold text-lg">
                      {selectedMessage.name?.charAt(0).toUpperCase() || "?"}
                    </div>
                    <div>
                      <h3 className="text-xl font-bold">{selectedMessage.name || "Anonymous"}</h3>
                      <p className="text-pink-100 text-sm">
                        {new Date(selectedMessage.createdAt).toLocaleDateString('en-US', {
                          weekday: 'long',
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric'
                        })}
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={() => setSelectedMessage(null)}
                    className="p-2 hover:bg-white/20 rounded-lg transition-all text-white"
                  >
                    ✕
                  </button>
                </div>
              </div>

              {/* Modal Body */}
              <div className="p-6 space-y-6">
                {/* Contact Info */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-gray-50 rounded-xl p-4">
                    <p className="text-sm font-medium text-gray-500 mb-1">Email Address</p>
                    <p className="text-gray-800 break-all">{selectedMessage.email || "N/A"}</p>
                  </div>
                  <div className="bg-gray-50 rounded-xl p-4">
                    <p className="text-sm font-medium text-gray-500 mb-1">Phone Number</p>
                    <p className="text-gray-800">{selectedMessage.phone || "N/A"}</p>
                  </div>
                </div>

                {/* Message Content */}
                <div className="bg-linear-to-br from-pink-50 to-purple-50 rounded-xl p-6">
                  <p className="text-sm font-medium text-gray-700 mb-3">Full Message</p>
                  <p className="text-gray-800 leading-relaxed whitespace-pre-wrap">
                    {selectedMessage.message || "No message provided"}
                  </p>
                </div>

                {/* Actions */}
                <div className="flex gap-3 pt-4">
                  <button
                    onClick={() => {
                      setDeleteConfirm(selectedMessage);
                      setSelectedMessage(null);
                    }}
                    className="flex-1 px-6 py-3 bg-red-500 text-white rounded-xl hover:bg-red-600 transition-all font-semibold flex items-center justify-center gap-2"
                  >
                    🗑️ Delete Message
                  </button>
                  <button
                    onClick={() => setSelectedMessage(null)}
                    className="px-6 py-3 bg-gray-100 text-gray-700 rounded-xl hover:bg-gray-200 transition-all font-semibold"
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Delete Confirmation Modal */}
        {deleteConfirm && (
          <div
            className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50"
            onClick={() => setDeleteConfirm(null)}
          >
            <div
              className="bg-white rounded-2xl shadow-2xl max-w-md w-full"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-6">
                <div className="w-16 h-16 rounded-full bg-red-100 flex items-center justify-center mx-auto mb-4">
                  <span className="text-3xl">⚠️</span>
                </div>
                <h3 className="text-xl font-bold text-gray-800 text-center mb-2">Delete Message?</h3>
                <p className="text-gray-600 text-center mb-6">
                  Are you sure you want to delete the message from <span className="font-semibold">{deleteConfirm.name}</span>? This action cannot be undone.
                </p>
                <div className="flex gap-3">
                  <button
                    onClick={() => setDeleteConfirm(null)}
                    className="flex-1 px-6 py-3 bg-gray-100 text-gray-700 rounded-xl hover:bg-gray-200 transition-all font-semibold"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={() => handleDelete(deleteConfirm._id)}
                    className="flex-1 px-6 py-3 bg-red-500 text-white rounded-xl hover:bg-red-600 transition-all font-semibold"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Toast Notification - Top Right */}
        {toast && (
          <div className="fixed top-6 right-6 z-50 animate-slide-in-right">
            <div className={`rounded-xl shadow-2xl px-6 py-4 flex items-center gap-3 min-w-75 ${
              toast.type === "success" 
                ? "bg-linear-to-r from-green-500 to-emerald-500 text-white" 
                : "bg-linear-to-r from-red-500 to-rose-500 text-white"
            }`}>
              <span className="text-2xl">
                {toast.type === "success" ? "✓" : "✕"}
              </span>
              <span className="font-medium flex-1">{toast.message}</span>
              <button
                onClick={() => setToast(null)}
                className="p-1 hover:bg-white/20 rounded transition-all"
              >
                ✕
              </button>
            </div>
          </div>
        )}
      </>
    );
  };

  return (
    <AdminPanel>
      <style jsx>{`
        @keyframes slide-in-right {
          from {
            opacity: 0;
            transform: translateX(100%);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        
        .animate-slide-in-right {
          animation: slide-in-right 0.4s ease-out;
        }
      `}</style>
      {renderContent()}
    </AdminPanel>
  );
};

export default AdminMessages;