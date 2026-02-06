import React, { useState, useEffect, useCallback, useRef } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAdminData } from "../context/AdminContext";
import rotatingLogo from "../assets/saree logo.png";
import cornerLogo from "../assets/Logo_Fonts.png";

const AdminPanel = ({ children }) => {
  const [mounted, setMounted] = useState(false);
  const [flip, setFlip] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [notificationOpen, setNotificationOpen] = useState(false);
  const [showClearAllModal, setShowClearAllModal] = useState(false);
  const [clearedMessages, setClearedMessages] = useState(() => {
    // Initialize from localStorage
    const saved = localStorage.getItem('clearedMessages');
    return saved ? JSON.parse(saved) : [];
  });
  
  const { user, logout, messages, unreadCount, fetchMessages, setMessages } = useAdminData();
  const navigate = useNavigate();
  const location = useLocation();
  
  // Use ref to track if component is mounted and prevent multiple calls
  const fetchIntervalRef = useRef(null);

  useEffect(() => setMounted(true), []);
  
  // Rotating logo effect
  useEffect(() => {
    const interval = setInterval(() => setFlip((prev) => !prev), 2000);
    return () => clearInterval(interval);
  }, []);

  // Set up polling interval for messages (fetch every 30 seconds)
  useEffect(() => {
    if (!user) return;
    
    // Set up polling interval (30 seconds)
    fetchIntervalRef.current = setInterval(() => {
      fetchMessages();
    }, 30000);

    // Cleanup interval on unmount
    return () => {
      if (fetchIntervalRef.current) {
        clearInterval(fetchIntervalRef.current);
      }
    };
  }, [user, fetchMessages]);

  // Close mobile menu when resizing to desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setMobileMenuOpen(false);
        setNotificationOpen(false);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Close notification dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (notificationOpen && !event.target.closest('.notification-dropdown')) {
        setNotificationOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [notificationOpen]);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const handleClearAllClick = () => {
    setShowClearAllModal(true);
  };

  const handleConfirmClearAll = () => {
    // Get all visible message IDs (not already cleared)
    const messageIds = visibleMessages.map(msg => msg._id);
    
    // Merge with existing cleared messages
    const updatedClearedMessages = [...new Set([...clearedMessages, ...messageIds])];
    
    // Store cleared message IDs in localStorage
    localStorage.setItem('clearedMessages', JSON.stringify(updatedClearedMessages));
    setClearedMessages(updatedClearedMessages);
    
    setShowClearAllModal(false);
    setNotificationOpen(false);
  };

  const handleCancelClearAll = () => {
    setShowClearAllModal(false);
  };

  const handleNotificationClick = useCallback((messageId) => {
    navigate("/admin/messages");
    setNotificationOpen(false);
  }, [navigate]);

  // Filter out cleared messages ONLY for notification display
  const visibleMessages = messages.filter(msg => !clearedMessages.includes(msg._id));
  const visibleUnreadCount = visibleMessages.length;

  const sidebarItems = [
    {
      name: "Dashboard",
      path: "/admin/dashboard",
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
        </svg>
      ),
    },
    {
      name: "Users",
      path: "/admin/users",
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
        </svg>
      ),
    },
    {
      name: "Products",
      path: "/admin/products",
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
        </svg>
      ),
    },
    {
      name: "Orders",
      path: "/admin/orders",
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
        </svg>
      ),
    },
    {
      name: "Messages",
      path: "/admin/messages",
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      ),
      badge: visibleUnreadCount, // Show only non-cleared messages count
    },
    {
      name: "Settings",
      path: "/admin/settings",
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      ),
    },
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Admin Navbar */}
      <header className="w-full sticky top-0 z-50 bg-white shadow-md border-b border-gray-100">
        <nav className="max-w-480 mx-auto px-4 sm:px-6 md:px-8 lg:px-8 xl:px-12 2xl:px-16 py-2 lg:py-3 xl:py-3.5">
          
          {/* Top Rotating Logo */}
          <div className="w-full flex justify-center mb-2 lg:mb-3">
            <Link to="/admin/dashboard" className="flex items-center">
              <img
                src={rotatingLogo}
                alt="Rotating Logo"
                className="h-10 sm:h-12 md:h-14 lg:h-16 xl:h-18 2xl:h-20 object-contain cursor-pointer"
                style={{
                  transform: flip ? "rotateY(180deg)" : "rotateY(0deg)",
                  transition: "transform 0.6s ease-in-out",
                }}
              />
            </Link>
          </div>

          {/* Main Navbar Content */}
          <div className="w-full flex items-center justify-between gap-3 lg:gap-4">
            
            {/* Left: Corner Logo */}
            <Link to="/admin/dashboard" className="flex items-center shrink-0">
              <img
                src={cornerLogo}
                alt="Logo"
                className="h-7 sm:h-8 md:h-9 lg:h-10 xl:h-11 2xl:h-12 w-auto object-contain cursor-pointer"
              />
            </Link>

            {/* Center: Welcome Message - Hidden on mobile and tablet */}
            {user && (
              <div className="hidden lg:flex flex-1 justify-center items-center px-4 min-w-0">
                <h2 className="text-sm lg:text-base xl:text-lg font-semibold text-gray-700 truncate">
                  Welcome back, <span className="bg-linear-to-r from-pink-500 to-red-500 bg-clip-text text-transparent">{user.name}</span>!
                </h2>
              </div>
            )}

            {/* Right Side: Notifications, Profile & Mobile Menu */}
            <div className="flex items-center gap-2 lg:gap-3 shrink-0">
              
              {/* Notification Icon */}
              <div className="relative notification-dropdown">
                <button
                  onClick={() => setNotificationOpen(!notificationOpen)}
                  className="relative p-2 hover:bg-gray-100 rounded-full transition-all"
                  aria-label="Notifications"
                >
                  <svg className="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                  </svg>
                  {visibleUnreadCount > 0 && (
                    <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center animate-pulse">
                      {visibleUnreadCount > 9 ? '9+' : visibleUnreadCount}
                    </span>
                  )}
                </button>

                {/* Notification Dropdown */}
                {notificationOpen && (
                  <div className="absolute right-0 mt-2 md:mt-6 w-80 sm:w-96 bg-white rounded-xl shadow-2xl border border-gray-200 overflow-hidden animate-slideDown">
                    {/* Dropdown Header */}
                    <div className="bg-linear-to-r from-pink-500 to-rose-500 p-4 flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                        </svg>
                        <h3 className="font-semibold text-white">Notifications</h3>
                        {visibleUnreadCount > 0 && (
                          <span className="bg-white/30 text-white text-xs px-2 py-0.5 rounded-full">
                            {visibleUnreadCount}
                          </span>
                        )}
                      </div>
                      {visibleMessages.length > 0 && (
                        <button
                          onClick={handleClearAllClick}
                          className="text-xs text-white/90 hover:text-white underline"
                        >
                          Clear All
                        </button>
                      )}
                    </div>

                    {/* Notifications List */}
                    <div className="max-h-96 overflow-y-auto">
                      {visibleMessages.length === 0 ? (
                        <div className="p-8 text-center">
                          <svg className="w-12 h-12 text-gray-300 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
                          </svg>
                          <p className="text-sm text-gray-500">No new messages</p>
                        </div>
                      ) : (
                        <>
                          {visibleMessages.slice(0, 5).map((message, index) => (
                            <div
                              key={message._id || index}
                              onClick={() => handleNotificationClick(message._id)}
                              className="p-4 border-b border-gray-100 hover:bg-pink-50 cursor-pointer transition-colors"
                            >
                              <div className="flex items-start gap-3">
                                <div className="w-10 h-10 rounded-full bg-linear-to-r from-pink-500 to-rose-500 flex items-center justify-center text-white font-semibold text-sm shrink-0">
                                  {message.name?.charAt(0).toUpperCase() || "?"}
                                </div>
                                <div className="flex-1 min-w-0">
                                  <p className="font-semibold text-sm text-gray-800 truncate">
                                    {message.name || "Anonymous"}
                                  </p>
                                  <p className="text-xs text-gray-600 truncate">
                                    {message.email}
                                  </p>
                                  <p className="text-xs text-gray-500 line-clamp-2 mt-1">
                                    {message.message}
                                  </p>
                                  <p className="text-xs text-gray-400 mt-1">
                                    {new Date(message.createdAt).toLocaleDateString()}
                                  </p>
                                </div>
                              </div>
                            </div>
                          ))}
                          {visibleMessages.length > 5 && (
                            <Link
                              to="/admin/messages"
                              onClick={() => setNotificationOpen(false)}
                              className="block p-3 text-center text-sm font-medium text-pink-600 hover:bg-pink-50 transition-colors"
                            >
                              View all {visibleMessages.length} messages
                            </Link>
                          )}
                        </>
                      )}
                    </div>
                  </div>
                )}
              </div>

              {/* Desktop Profile Dropdown */}
              {user && (
                <div className="hidden lg:block relative group">
                  <div className="flex items-center gap-2 xl:gap-2.5 cursor-pointer px-2.5 xl:px-3 py-1.5 xl:py-2 rounded-full hover:bg-gray-50 transition-all duration-300">
                    <div className="w-8 h-8 xl:w-9 xl:h-9 2xl:w-10 2xl:h-10 rounded-full bg-linear-to-r from-pink-500 to-red-500 flex items-center justify-center text-white font-semibold shadow-md text-sm xl:text-base shrink-0">
                      {user.name?.charAt(0).toUpperCase()}
                    </div>
                    <div className="text-left min-w-0">
                      <p className="font-semibold text-gray-700 text-xs xl:text-sm 2xl:text-base max-w-20 xl:max-w-25 2xl:max-w-30 truncate">
                        {user.name}
                      </p>
                      <p className="text-[10px] xl:text-xs text-gray-500 whitespace-nowrap">Administrator</p>
                    </div>
                    <svg className="w-4 h-4 xl:w-5 xl:h-5 text-gray-400 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>

                  {/* Dropdown Menu */}
                  <div className="absolute right-0 mt-2 w-48 xl:w-52 2xl:w-56 bg-white rounded-xl shadow-xl border border-gray-100 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform origin-top scale-95 group-hover:scale-100 overflow-hidden">
                    <div className="p-3 xl:p-4 border-b border-gray-100">
                      <p className="text-xs xl:text-sm 2xl:text-base font-semibold text-gray-700 truncate">{user.name}</p>
                      <p className="text-[10px] xl:text-xs text-gray-500 truncate">{user.email}</p>
                      <span className="inline-block mt-1.5 px-2 py-0.5 bg-pink-100 text-pink-600 text-[10px] xl:text-xs rounded-full font-medium">
                        Admin
                      </span>
                    </div>
                    
                    <Link
                      to="/admin/profile"
                      className="flex items-center gap-2 xl:gap-3 px-3 xl:px-4 py-2.5 xl:py-3 hover:bg-pink-50 transition-colors duration-200 text-gray-700 hover:text-pink-500"
                    >
                      <svg className="w-4 h-4 xl:w-5 xl:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                      <span className="text-xs xl:text-sm font-medium">My Profile</span>
                    </Link>

                    <button
                      onClick={handleLogout}
                      className="w-full flex items-center gap-2 xl:gap-3 px-3 xl:px-4 py-2.5 xl:py-3 hover:bg-red-50 transition-colors duration-200 text-gray-700 hover:text-red-500 border-t border-gray-100"
                    >
                      <svg className="w-4 h-4 xl:w-5 xl:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                      </svg>
                      <span className="text-xs xl:text-sm font-medium">Logout</span>
                    </button>
                  </div>
                </div>
              )}

              {/* Mobile Menu Button */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="lg:hidden p-2 hover:bg-gray-100 rounded-lg transition-all shrink-0"
                aria-label="Toggle menu"
              >
                <svg
                  className="w-6 h-6 text-gray-700"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  {mobileMenuOpen ? (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  ) : (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  )}
                </svg>
              </button>
            </div>
          </div>

          {/* Mobile Menu Dropdown */}
          {mobileMenuOpen && (
            <div className="lg:hidden mt-4 bg-gray-50 rounded-xl shadow-inner border border-gray-200 overflow-hidden animate-slideDown">
              {/* Mobile User Info */}
              {user && (
                <div className="px-4 py-3 border-b border-gray-200 bg-linear-to-r from-pink-50 to-red-50">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-full bg-linear-to-r from-pink-500 to-red-500 flex items-center justify-center text-white font-bold shadow-md text-lg shrink-0">
                      {user.name?.charAt(0).toUpperCase()}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold text-gray-800 truncate">{user.name}</p>
                      <p className="text-xs text-gray-600 truncate">{user.email}</p>
                      <span className="inline-block mt-1 px-2 py-0.5 bg-pink-100 text-pink-600 text-[10px] rounded-full font-medium">
                        Administrator
                      </span>
                    </div>
                  </div>
                </div>
              )}

              {/* Mobile Navigation */}
              <ul className="py-2">
                {sidebarItems.map((item, i) => (
                  <li key={i}>
                    <Link
                      to={item.path}
                      onClick={() => setMobileMenuOpen(false)}
                      className={`flex items-center justify-between gap-3 px-4 py-3 font-semibold text-sm transition-all duration-300 ${
                        isActive(item.path)
                          ? "bg-pink-100 text-pink-600 border-l-4 border-pink-500"
                          : "text-gray-700 hover:bg-pink-50 hover:text-pink-500"
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        {item.icon}
                        <span>{item.name}</span>
                      </div>
                      {item.badge && item.badge > 0 && (
                        <span className="bg-red-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                          {item.badge > 9 ? '9+' : item.badge}
                        </span>
                      )}
                    </Link>
                  </li>
                ))}
              </ul>

              {/* Mobile Logout */}
              <div className="border-t border-gray-200">
                <button
                  onClick={handleLogout}
                  className="w-full flex items-center gap-3 px-4 py-3 hover:bg-red-50 transition-colors text-gray-700 hover:text-red-500"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                  </svg>
                  <span className="text-sm font-medium">Logout</span>
                </button>
              </div>
            </div>
          )}
        </nav>
      </header>

      {/* Main Content Area with Sidebar */}
      <div className="flex min-h-[calc(100vh-140px)] sm:min-h-[calc(100vh-150px)] lg:min-h-[calc(100vh-160px)]">
        {/* Desktop Sidebar - Fixed with Icons and Names */}
        <aside className="hidden lg:block fixed left-0 top-32.5 xl:top-37.5 2xl:top-41.25 h-[calc(100vh-130px)] xl:h-[calc(100vh-150px)] 2xl:h-[calc(100vh-165px)] bg-white border-r border-gray-200 shadow-lg z-40 w-64 xl:w-72 2xl:w-80">
          <nav className="h-full overflow-y-auto py-4 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
            <ul className="space-y-1 px-3">
              {sidebarItems.map((item, i) => (
                <li key={i}>
                  <Link
                    to={item.path}
                    className={`flex items-center justify-between gap-3 xl:gap-4 px-4 py-3 xl:py-3.5 rounded-lg font-medium text-sm xl:text-base transition-all duration-300 group ${
                      isActive(item.path)
                        ? "bg-linear-to-r from-pink-500 to-red-500 text-white shadow-md"
                        : "text-gray-700 hover:bg-pink-50 hover:text-pink-600"
                    }`}
                  >
                    <div className="flex items-center gap-3 xl:gap-4">
                      <span className={`${isActive(item.path) ? "" : "group-hover:scale-110"} transition-transform shrink-0`}>
                        {item.icon}
                      </span>
                      <span className="whitespace-nowrap">{item.name}</span>
                    </div>
                    {item.badge && item.badge > 0 && (
                      <span className={`text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center ${
                        isActive(item.path) ? "bg-white text-pink-600" : "bg-red-500 text-white"
                      }`}>
                        {item.badge > 9 ? '9+' : item.badge}
                      </span>
                    )}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 lg:ml-64 xl:ml-72 2xl:ml-80 w-full transition-all duration-300">
          <div className="p-4 sm:p-6 lg:p-8 xl:p-10 2xl:p-12 w-full">
            {children}
          </div>
        </main>
      </div>

      {/* Clear All Confirmation Modal */}
      {showClearAllModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-60 p-4">
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
                Clear All Notifications?
              </h3>
              <p className="text-gray-600 text-center mb-6">
                Are you sure you want to clear all {visibleMessages.length} message notifications? This action cannot be undone.
              </p>

              <div className="flex gap-3">
                <button
                  onClick={handleCancelClearAll}
                  className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-100 transition-colors font-medium"
                >
                  Cancel
                </button>

                <button
                  onClick={handleConfirmClearAll}
                  className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors font-medium"
                >
                  Clear All
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <style jsx>{`
        @keyframes slideDown {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-slideDown {
          animation: slideDown 0.3s ease-out;
        }
        
        /* Custom scrollbar styles */
        .scrollbar-thin::-webkit-scrollbar {
          width: 6px;
        }
        .scrollbar-thumb-gray-300::-webkit-scrollbar-thumb {
          background-color: #d1d5db;
          border-radius: 3px;
        }
        .scrollbar-track-gray-100::-webkit-scrollbar-track {
          background-color: #f3f4f6;
        }
      `}</style>
    </div>
  );
};

export default AdminPanel;