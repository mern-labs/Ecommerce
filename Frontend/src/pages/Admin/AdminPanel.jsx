import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useData } from "../../context/Usecontext";
import rotatingLogo from "../../assets/saree logo.jpg";
import cornerLogo from "../../assets/Logo_Fonts.png";

const AdminPanel = ({ children }) => {
  const [mounted, setMounted] = useState(false);
  const [flip, setFlip] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  const { user, logout } = useData();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => setMounted(true), []);
  
  // Rotating logo effect
  useEffect(() => {
    const interval = setInterval(() => setFlip((prev) => !prev), 2000);
    return () => clearInterval(interval);
  }, []);

  // Close mobile menu when resizing to desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setMobileMenuOpen(false);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

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
        <nav className="max-w-[1920px] mx-auto px-3 sm:px-4 md:px-6 lg:px-6 xl:px-8 2xl:px-12 py-2 lg:py-2.5 xl:py-3">
          
          {/* Top Rotating Logo */}
          <div className="w-full flex justify-center mb-2 lg:mb-2.5 xl:mb-3">
            <Link to="/admin/dashboard">
              <img
                src={rotatingLogo}
                alt="Rotating Logo"
                className="h-12 sm:h-14 md:h-15 lg:h-16 xl:h-18 2xl:h-20 object-contain cursor-pointer"
                style={{
                  transform: flip ? "rotateY(180deg)" : "rotateY(0deg)",
                  transition: "transform 0.6s ease-in-out",
                }}
              />
            </Link>
          </div>

          {/* Main Navbar Content */}
          <div className="w-full flex items-center justify-between gap-2 lg:gap-3 xl:gap-4">
            
            {/* Left: Corner Logo */}
            <Link to="/admin/dashboard" className="flex items-center flex-shrink-0">
              <img
                src={cornerLogo}
                alt="Logo"
                className="h-8 sm:h-9 md:h-10 lg:h-10 xl:h-11 2xl:h-12 w-auto object-contain cursor-pointer"
              />
            </Link>

            {/* Center: Welcome Message - Hidden on mobile */}
            {user && (
              <div className="hidden md:flex flex-1 justify-center items-center px-4">
                <h2 className="text-sm lg:text-base xl:text-lg font-semibold text-gray-700">
                  Welcome back, <span className="bg-gradient-to-r from-pink-500 to-red-500 bg-clip-text text-transparent">{user.name}</span>!
                </h2>
              </div>
            )}

            {/* Right Side: Profile & Mobile Menu */}
            <div className="flex items-center gap-2 lg:gap-3 xl:gap-4">
              
              {/* Desktop Profile Dropdown */}
              {user && (
                <div className="hidden lg:block relative group">
                  <div className="flex items-center gap-1.5 xl:gap-2 2xl:gap-3 cursor-pointer px-2 xl:px-3 2xl:px-4 py-1.5 xl:py-2 2xl:py-2.5 rounded-full hover:bg-gray-50 transition-all duration-300">
                    <div className="w-8 h-8 xl:w-9 xl:h-9 2xl:w-10 2xl:h-10 rounded-full bg-gradient-to-r from-pink-500 to-red-500 flex items-center justify-center text-white font-semibold shadow-md text-sm xl:text-base">
                      {user.name?.charAt(0).toUpperCase()}
                    </div>
                    <div className="text-left">
                      <p className="font-semibold text-gray-700 text-xs xl:text-sm 2xl:text-base max-w-[100px] xl:max-w-[120px] 2xl:max-w-[150px] truncate">
                        {user.name}
                      </p>
                      <p className="text-[10px] xl:text-xs text-gray-500">Administrator</p>
                    </div>
                    <svg className="w-4 h-4 xl:w-5 xl:h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>

                  {/* Dropdown Menu */}
                  <div className="absolute right-0 mt-2 w-48 xl:w-52 2xl:w-56 bg-white rounded-xl shadow-xl border border-gray-100 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform origin-top scale-95 group-hover:scale-100 overflow-hidden">
                    <div className="p-3 xl:p-3.5 2xl:p-4 border-b border-gray-100">
                      <p className="text-xs xl:text-sm 2xl:text-base font-semibold text-gray-700 truncate">{user.name}</p>
                      <p className="text-[10px] xl:text-xs text-gray-500 truncate">{user.email}</p>
                      <span className="inline-block mt-1 px-2 py-0.5 bg-pink-100 text-pink-600 text-[10px] xl:text-xs rounded-full font-medium">
                        Admin
                      </span>
                    </div>
                    
                    <Link
                      to="/admin/profile"
                      className="flex items-center gap-2 xl:gap-3 px-3 xl:px-4 py-2 xl:py-2.5 hover:bg-pink-50 transition-colors duration-200 text-gray-700 hover:text-pink-500"
                    >
                      <svg className="w-4 h-4 xl:w-5 xl:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                      <span className="text-xs xl:text-sm font-medium">My Profile</span>
                    </Link>

                    <button
                      onClick={handleLogout}
                      className="w-full flex items-center gap-2 xl:gap-3 px-3 xl:px-4 py-2 xl:py-2.5 hover:bg-red-50 transition-colors duration-200 text-gray-700 hover:text-red-500 border-t border-gray-100"
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
                className="lg:hidden p-2 hover:bg-gray-100 rounded-lg transition-all"
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
            <div className="lg:hidden mt-3 bg-gray-50 rounded-xl shadow-inner border border-gray-200 overflow-hidden animate-slideDown">
              {/* Mobile User Info */}
              {user && (
                <div className="px-4 py-3 border-b border-gray-200 bg-gradient-to-r from-pink-50 to-red-50">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-r from-pink-500 to-red-500 flex items-center justify-center text-white font-bold shadow-md text-lg">
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
                      className={`flex items-center gap-3 px-4 py-3 font-semibold text-sm transition-all duration-300 ${
                        isActive(item.path)
                          ? "bg-pink-100 text-pink-600 border-l-4 border-pink-500"
                          : "text-gray-700 hover:bg-pink-50 hover:text-pink-500"
                      }`}
                    >
                      {item.icon}
                      <span>{item.name}</span>
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
      <div className="flex">
        {/* Desktop Sidebar - Fixed with Icons and Names */}
        <aside className="hidden lg:block fixed left-0 top-[140px] xl:top-[160px] 2xl:top-[180px] h-[calc(100vh-140px)] xl:h-[calc(100vh-160px)] 2xl:h-[calc(100vh-180px)] bg-white border-r border-gray-200 shadow-lg z-40 w-64 xl:w-72 2xl:w-80">
          <nav className="h-full overflow-y-auto py-4">
            <ul className="space-y-1 px-2 xl:px-3">
              {sidebarItems.map((item, i) => (
                <li key={i}>
                  <Link
                    to={item.path}
                    className={`flex items-center gap-3 xl:gap-4 px-3 xl:px-4 py-3 xl:py-3.5 rounded-lg font-medium text-sm xl:text-base transition-all duration-300 group ${
                      isActive(item.path)
                        ? "bg-gradient-to-r from-pink-500 to-red-500 text-white shadow-md"
                        : "text-gray-700 hover:bg-pink-50 hover:text-pink-600"
                    }`}
                  >
                    <span className={`${isActive(item.path) ? "" : "group-hover:scale-110"} transition-transform`}>
                      {item.icon}
                    </span>
                    <span className="whitespace-nowrap">{item.name}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 lg:ml-64 xl:ml-72 2xl:ml-80 transition-all duration-300">
          <div className="p-4 sm:p-6 lg:p-8 xl:p-10 2xl:p-12">
            {children}
          </div>
        </main>
      </div>

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
      `}</style>
    </div>
  );
};

export default AdminPanel;