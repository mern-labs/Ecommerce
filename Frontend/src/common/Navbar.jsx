import React, { useEffect, useState } from "react";
import rotatingLogo from "../assets/saree logo.jpg"; // Top rotating logo
import cornerLogo from "../assets/Logo_Fonts.png";   // Left corner logo
import Button from "./Button";
import { Link, useNavigate } from "react-router-dom";
import { useData } from "../context/Usecontext";
import addtocartIcon from "../assets/addtocart.png";
import wishlistIcon from "../assets/wishlist.png";

const Navbar = () => {
  const [mounted, setMounted] = useState(false);
  const [activeMenu, setActiveMenu] = useState("Home");
  const [flip, setFlip] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileSearchOpen, setMobileSearchOpen] = useState(false);

  const { user, logout, cart, wishlist } = useData();
  const navigate = useNavigate();

  useEffect(() => setMounted(true), []);
  useEffect(() => {
    const interval = setInterval(() => setFlip((prev) => !prev), 2000);
    return () => clearInterval(interval);
  }, []);

  // Close mobile menu when resizing to desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setMobileMenuOpen(false);
        setMobileSearchOpen(false);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleLogout = () => {
    logout();
    setMobileMenuOpen(false);
    navigate("/home");
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;
    navigate(`/shop?search=${searchQuery}`);
    setMobileSearchOpen(false);
    setMobileMenuOpen(false);
  };

  const handleMenuClick = (itemName) => {
    setActiveMenu(itemName);
    setMobileMenuOpen(false);
  };

  const menuItems = [
    { name: "Home", path: "/home" },
    { name: "Shop", path: "/shop" },
    { name: "products", path: "products/filter" },
    { name: "About", path: "/about" },
    { name: "Contact", path: "/contact" },
  ];

  return (
    <header className="w-full sticky top-0 z-50 bg-white shadow-md border-b border-gray-100">
      <nav className="max-w-[1920px] mx-auto px-3 sm:px-4 md:px-6 lg:px-6 xl:px-8 2xl:px-12 py-2 lg:py-2.5 xl:py-3">
        
        {/* Top Rotating Logo - Visible on all screens */}
        <div className="w-full flex justify-center mb-2 lg:mb-2.5 xl:mb-3">
          <Link to="/home">
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
          <Link to="/home" className="flex items-center flex-shrink-0">
            <img
              src={cornerLogo}
              alt="Logo"
              className="h-8 sm:h-9 md:h-10 lg:h-10 xl:h-11 2xl:h-12 w-auto object-contain cursor-pointer"
            />
          </Link>

          {/* Desktop Menu - Hidden on mobile/tablet */}
          <ul className="hidden lg:flex items-center gap-3 xl:gap-5 2xl:gap-8 flex-1 justify-center mx-2 xl:mx-4">
            {menuItems.map((item, i) => (
              <li key={i}>
                <Link
                  to={item.path}
                  onClick={() => setActiveMenu(item.name)}
                  className={`relative font-semibold uppercase tracking-wide text-[11px] xl:text-xs 2xl:text-sm transition-all duration-300 hover:text-pink-500 group whitespace-nowrap ${
                    activeMenu === item.name ? "text-pink-500" : "text-gray-700"
                  }`}
                >
                  {item.name}
                  <span
                    className={`absolute -bottom-1 left-0 h-0.5 bg-gradient-to-r from-pink-500 to-red-500 transition-all duration-300 ${
                      activeMenu === item.name ? "w-full" : "w-0 group-hover:w-full"
                    }`}
                  ></span>
                </Link>
              </li>
            ))}
          </ul>

          {/* Right Side Actions */}
          <div className="flex items-center gap-1.5 sm:gap-2 lg:gap-2 xl:gap-3 2xl:gap-4">
            
            {/* Desktop Search Bar - Hidden on mobile/tablet */}
            <form
              onSubmit={handleSearch}
              className="hidden lg:flex items-center bg-gray-50 border border-gray-200 rounded-full px-2.5 xl:px-3.5 2xl:px-4 py-1.5 xl:py-1.5 2xl:py-2 focus-within:ring-2 focus-within:ring-pink-400 transition-all"
            >
              <input
                type="text"
                placeholder="Search..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-20 xl:w-28 2xl:w-40 bg-transparent outline-none text-[11px] xl:text-xs 2xl:text-sm text-gray-700 placeholder-gray-400"
              />
              <button
                type="submit"
                className="ml-1.5 xl:ml-2 bg-gradient-to-r from-pink-500 to-red-500 text-white px-2 xl:px-2.5 2xl:px-3 py-0.5 xl:py-1 rounded-full text-[10px] xl:text-xs 2xl:text-sm font-semibold hover:from-pink-600 hover:to-red-600 transition-all whitespace-nowrap"
              >
                Search
              </button>
            </form>

            {/* Mobile Search Icon - Visible on mobile/tablet only */}
            <button
              onClick={() => setMobileSearchOpen(!mobileSearchOpen)}
              className="lg:hidden p-2 hover:bg-gray-100 rounded-full transition-all"
              aria-label="Toggle search"
            >
              <svg className="w-5 h-5 sm:w-6 sm:h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </button>

            {/* User Actions */}
            {!user ? (
              <Link to="/login" className="hidden sm:block">
                <Button
                  text="Login"
                  property="bg-gradient-to-r from-pink-500 to-red-500 hover:from-pink-600 hover:to-red-600 text-white px-3 lg:px-3.5 xl:px-5 2xl:px-6 py-1.5 lg:py-1.5 xl:py-2 2xl:py-2.5 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 font-semibold cursor-pointer text-[11px] lg:text-xs xl:text-sm whitespace-nowrap"
                />
              </Link>
            ) : (
              <div className="hidden sm:flex items-center gap-1 lg:gap-1.5 xl:gap-2 2xl:gap-3">
                {/* Wishlist */}
                <Link to="/wishlist" className="relative">
                  <div
                    className={`p-1.5 lg:p-1.5 xl:p-2 rounded-full transition-all ${
                      wishlist.length > 0 ? "bg-pink-100 animate-pulse" : "hover:bg-pink-50"
                    }`}
                  >
                    <img src={wishlistIcon} alt="Wishlist" className="w-5 h-5 lg:w-5 lg:h-5 xl:w-6 xl:h-6 2xl:w-7 2xl:h-7" />
                    {wishlist.length > 0 && (
                      <span className="absolute -top-0.5 -right-0.5 lg:-top-1 lg:-right-1 bg-pink-500 text-white text-[9px] lg:text-[10px] xl:text-xs font-bold rounded-full w-4 h-4 lg:w-4 lg:h-4 xl:w-5 xl:h-5 flex items-center justify-center">
                        {wishlist.length}
                      </span>
                    )}
                  </div>
                </Link>

                {/* Cart */}
                <Link to="/addtocard" className="relative">
                  <div
                    className={`p-1.5 lg:p-1.5 xl:p-2 rounded-full transition-all ${
                      cart.length > 0 ? "bg-green-100 animate-pulse" : "hover:bg-green-50"
                    }`}
                  >
                    <img src={addtocartIcon} alt="Cart" className="w-5 h-5 lg:w-5 lg:h-5 xl:w-6 xl:h-6 2xl:w-7 2xl:h-7" />
                    {cart.length > 0 && (
                      <span className="absolute -top-0.5 -right-0.5 lg:-top-1 lg:-right-1 bg-green-500 text-white text-[9px] lg:text-[10px] xl:text-xs font-bold rounded-full w-4 h-4 lg:w-4 lg:h-4 xl:w-5 xl:h-5 flex items-center justify-center">
                        {cart.length}
                      </span>
                    )}
                  </div>
                </Link>

                {/* Profile Dropdown - Desktop */}
                <div className="hidden lg:block relative group">
                  <div className="flex items-center gap-1 xl:gap-1.5 2xl:gap-2 cursor-pointer px-1.5 xl:px-2 2xl:px-3 py-1 xl:py-1.5 2xl:py-2 rounded-full hover:bg-gray-50 transition-all duration-300">
                    <div className="w-6 h-6 xl:w-7 xl:h-7 2xl:w-8 2xl:h-8 rounded-full bg-gradient-to-r from-pink-500 to-red-500 flex items-center justify-center text-white font-semibold shadow-md text-[10px] xl:text-xs 2xl:text-sm">
                      {user.name?.charAt(0).toUpperCase()}
                    </div>
                    <span className="font-semibold text-gray-700 max-w-[60px] xl:max-w-[80px] 2xl:max-w-32 truncate text-[11px] xl:text-xs 2xl:text-sm">
                      {user.name}
                    </span>
                  </div>
                  <div className="absolute right-0 mt-2 w-40 xl:w-44 2xl:w-48 bg-white rounded-xl shadow-xl border border-gray-100 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform origin-top scale-95 group-hover:scale-100 overflow-hidden">
                    <div className="p-2 xl:p-2.5 2xl:p-3 border-b border-gray-100">
                      <p className="text-[11px] xl:text-xs 2xl:text-sm font-semibold text-gray-700 truncate">{user.name}</p>
                      <p className="text-[10px] xl:text-xs text-gray-500 truncate">{user.email}</p>
                    </div>
                    <Link
                      to="/orders"
                      className="flex items-center gap-2 xl:gap-2.5 2xl:gap-3 px-3 xl:px-3.5 2xl:px-4 py-2 xl:py-2 2xl:py-2.5 hover:bg-pink-50 transition-colors duration-200 text-gray-700 hover:text-pink-500"
                    >
                      <span className="text-[11px] xl:text-xs 2xl:text-sm font-medium">My Orders</span>
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="w-full flex items-center gap-2 xl:gap-2.5 2xl:gap-3 px-3 xl:px-3.5 2xl:px-4 py-2 xl:py-2 2xl:py-2.5 hover:bg-red-50 transition-colors duration-200 text-gray-700 hover:text-red-500 border-t border-gray-100"
                    >
                      <span className="text-[11px] xl:text-xs 2xl:text-sm font-medium">Logout</span>
                    </button>
                  </div>
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
                className="w-5 h-5 sm:w-6 sm:h-6 text-gray-700"
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

        {/* Mobile Search Bar - Expandable */}
        {mobileSearchOpen && (
          <div className="lg:hidden mt-3 animate-slideDown">
            <form onSubmit={handleSearch} className="flex items-center bg-gray-50 border border-gray-200 rounded-full px-4 py-2.5 focus-within:ring-2 focus-within:ring-pink-400 transition-all">
              <input
                type="text"
                placeholder="Search sarees, categories..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="flex-1 bg-transparent outline-none text-sm text-gray-700 placeholder-gray-400"
                autoFocus
              />
              <button
                type="submit"
                className="ml-3 bg-gradient-to-r from-pink-500 to-red-500 text-white px-4 py-1.5 rounded-full text-sm font-semibold hover:from-pink-600 hover:to-red-600 transition-all"
              >
                Search
              </button>
            </form>
          </div>
        )}

        {/* Mobile Menu - Slide Down */}
        {mobileMenuOpen && (
          <div className="lg:hidden mt-3 bg-gray-50 rounded-xl shadow-inner border border-gray-200 overflow-hidden animate-slideDown">
            {/* Mobile Menu Items */}
            <ul className="py-2">
              {menuItems.map((item, i) => (
                <li key={i}>
                  <Link
                    to={item.path}
                    onClick={() => handleMenuClick(item.name)}
                    className={`block px-4 py-3 font-semibold uppercase tracking-wide text-sm transition-all duration-300 ${
                      activeMenu === item.name
                        ? "bg-pink-100 text-pink-600 border-l-4 border-pink-500"
                        : "text-gray-700 hover:bg-pink-50 hover:text-pink-500"
                    }`}
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>

            {/* Mobile User Section */}
            {user ? (
              <div className="border-t border-gray-200 bg-white">
                {/* User Info */}
                <div className="px-4 py-3 border-b border-gray-200 bg-gradient-to-r from-pink-50 to-red-50">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-r from-pink-500 to-red-500 flex items-center justify-center text-white font-bold shadow-md">
                      {user.name?.charAt(0).toUpperCase()}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold text-gray-800 truncate">{user.name}</p>
                      <p className="text-xs text-gray-600 truncate">{user.email}</p>
                    </div>
                  </div>
                </div>

                {/* Mobile Actions */}
                <div className="py-2 sm:hidden">
                  <Link
                    to="/wishlist"
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex items-center justify-between px-4 py-3 hover:bg-pink-50 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <img src={wishlistIcon} alt="Wishlist" className="w-6 h-6" />
                      <span className="text-sm font-medium text-gray-700">Wishlist</span>
                    </div>
                    {wishlist.length > 0 && (
                      <span className="bg-pink-500 text-white text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center">
                        {wishlist.length}
                      </span>
                    )}
                  </Link>

                  <Link
                    to="/addtocard"
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex items-center justify-between px-4 py-3 hover:bg-green-50 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <img src={addtocartIcon} alt="Cart" className="w-6 h-6" />
                      <span className="text-sm font-medium text-gray-700">Cart</span>
                    </div>
                    {cart.length > 0 && (
                      <span className="bg-green-500 text-white text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center">
                        {cart.length}
                      </span>
                    )}
                  </Link>
                </div>

                {/* Orders & Logout */}
                <div className="border-t border-gray-200">
                  <Link
                    to="/orders"
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex items-center gap-3 px-4 py-3 hover:bg-pink-50 transition-colors text-gray-700 hover:text-pink-500"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                    </svg>
                    <span className="text-sm font-medium">My Orders</span>
                  </Link>
                  
                  <button
                    onClick={handleLogout}
                    className="w-full flex items-center gap-3 px-4 py-3 hover:bg-red-50 transition-colors text-gray-700 hover:text-red-500 border-t border-gray-200"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                    </svg>
                    <span className="text-sm font-medium">Logout</span>
                  </button>
                </div>
              </div>
            ) : (
              <div className="p-4 border-t border-gray-200 bg-white">
                <Link to="/login" onClick={() => setMobileMenuOpen(false)}>
                  <Button
                    text="Login"
                    property="w-full bg-gradient-to-r from-pink-500 to-red-500 hover:from-pink-600 hover:to-red-600 text-white px-6 py-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 font-semibold cursor-pointer text-center"
                  />
                </Link>
              </div>
            )}
          </div>
        )}
      </nav>

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
    </header>
  );
};

export default Navbar;