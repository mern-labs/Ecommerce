import React, { useEffect, useState } from 'react'
import logo from "../assets/saree logo.jpg"
import Button from './Button'
import { Link, useNavigate } from 'react-router-dom'
import { useData } from '../context/Usecontext'
import addtocart from "../assets/addtocart.png"
import wishlist from "../assets/wishlist.png"

const Navbar = () => {
  const [mounted, setMounted] = useState(false)
  const [activeMenu, setActiveMenu] = useState('Home')
  const [flip, setFlip] = useState(false)

  const { user, logout } = useData()
  const navigate = useNavigate()

  useEffect(() => {
    setMounted(true)
  }, [])

  // Logo flip animation
  useEffect(() => {
    const interval = setInterval(() => {
      setFlip(prev => !prev)
    }, 2000) // Flips every 2 seconds
    return () => clearInterval(interval)
  }, [])

  const handleLogout = () => {
    logout()
    navigate("/home")
  }

  const menuItems = [
    { name: 'Home', path: '/home' },
    { name: 'Shop', path: '/shop' },
    { name: 'Categories', path: '/categories' },
    { name: 'About', path: '/about' },
    { name: 'Contact', path: '/contact' }
  ]

  return (
    <header className="w-full sticky top-0 z-50 bg-white shadow-md border-b border-gray-100">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
        
        {/* Logo with Flip */}
        <div className={`flex justify-center mb-4 transition-all duration-700 ${mounted ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}>
          <Link to="/home">
            <img
              src={logo}
              alt="Saree Logo"
              className="h-16 sm:h-18 md:h-20 object-contain cursor-pointer"
              style={{ 
                transform: flip ? 'rotateY(180deg)' : 'rotateY(0deg)',
                transition: 'transform 0.6s ease-in-out'
              }}
            />
          </Link>
        </div>

        {/* Menu + Actions */}
        <div className={`flex flex-col lg:flex-row items-center justify-between gap-4 sm:gap-6 transition-all duration-700 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'}`}>
          
          {/* Menu */}
          <ul className="flex flex-wrap justify-center gap-4 sm:gap-6 lg:gap-8">
            {menuItems.map((item, i) => (
              <li key={i}>
                <Link
                  to={item.path}
                  onClick={() => setActiveMenu(item.name)}
                  className={`relative font-semibold uppercase tracking-wide text-sm transition-all duration-300 hover:text-pink-500 group ${
                    activeMenu === item.name ? 'text-pink-500' : 'text-gray-700'
                  }`}
                >
                  {item.name}
                  <span className={`absolute -bottom-1 left-0 h-0.5 bg-gradient-to-r from-pink-500 to-red-500 transition-all duration-300 ${
                    activeMenu === item.name ? 'w-full' : 'w-0 group-hover:w-full'
                  }`}></span>
                </Link>
              </li>
            ))}
          </ul>

          {/* Actions */}
          <div className="flex gap-3 sm:gap-4 items-center">
            {!user ? (
              // Login Button
              <Link to="/login">
                <Button
                  text="Login"
                  property="bg-gradient-to-r from-pink-500 to-red-500 hover:from-pink-600 hover:to-red-600 text-white px-6 py-2.5 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 font-semibold cursor-pointer"
                />
              </Link>
            ) : (
              // Logged-in State
              <>
                <div className="flex gap-3 sm:gap-4 items-center">
                  {/* Wishlist Icon */}
                  <Link to="/wishlist" className="relative group">
                    <div className="p-2 rounded-full hover:bg-pink-50 transition-all duration-300">
                      <img
                        src={wishlist}
                        alt="Wishlist"
                        className="w-7 h-7 object-contain cursor-pointer transform transition-transform duration-300 group-hover:scale-110"
                      />
                      <span className="absolute -top-1 -right-1 bg-pink-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center shadow-md">
                        3
                      </span>
                    </div>
                  </Link>

                  {/* Add to Cart Icon */}
                  <Link to="/addtocard" className="relative group">
                    <div className="p-2 rounded-full hover:bg-green-50 transition-all duration-300">
                      <img
                        src={addtocart}
                        alt="Cart"
                        className="w-7 h-7 object-contain cursor-pointer transform transition-transform duration-300 group-hover:scale-110"
                      />
                      <span className="absolute -top-1 -right-1 bg-green-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center shadow-md">
                        2
                      </span>
                    </div>
                  </Link>
                </div>

                {/* Profile Dropdown */}
                <div className="relative group">
                  <div className="flex items-center gap-2 cursor-pointer px-4 py-2 rounded-full hover:bg-gray-50 transition-all duration-300">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-r from-pink-500 to-red-500 flex items-center justify-center text-white font-semibold shadow-md">
                      {user.name?.charAt(0).toUpperCase()}
                    </div>
                    <span className="hidden sm:block font-semibold text-gray-700 max-w-[100px] truncate">
                      {user.name}
                    </span>
                    <svg 
                      xmlns="http://www.w3.org/2000/svg" 
                      fill="none" 
                      viewBox="0 0 24 24" 
                      strokeWidth={2} 
                      stroke="currentColor" 
                      className="w-4 h-4 text-gray-500 transition-transform duration-300 group-hover:rotate-180"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                    </svg>
                  </div>

                  {/* Dropdown Menu */}
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-xl border border-gray-100 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform origin-top scale-95 group-hover:scale-100 overflow-hidden">
                    <div className="p-3 border-b border-gray-100">
                      <p className="text-sm font-semibold text-gray-700">{user.name}</p>
                      <p className="text-xs text-gray-500 truncate">{user.email}</p>
                    </div>
                    <Link 
                      to="/orders" 
                      className="flex items-center gap-3 px-4 py-2.5 hover:bg-pink-50 transition-colors duration-200 text-gray-700 hover:text-pink-500"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
                      </svg>
                      <span className="text-sm font-medium">My Orders</span>
                    </Link>
                    <button 
                      onClick={handleLogout}
                      className="w-full flex items-center gap-3 px-4 py-2.5 hover:bg-red-50 transition-colors duration-200 text-gray-700 hover:text-red-500 border-t border-gray-100"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75" />
                      </svg>
                      <span className="text-sm font-medium">Logout</span>
                    </button>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </nav>
    </header>
  )
}

export default Navbar