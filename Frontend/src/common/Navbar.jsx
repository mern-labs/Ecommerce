import React, { useEffect, useState } from 'react'
import logo from "../assets/saree logo.jpg"
import Button from './Button'
import { Link, useNavigate } from 'react-router-dom'
import { useData } from '../context/Usecontext'

const Navbar = () => {
  const [offset, setOffset] = useState(0)
  const [direction, setDirection] = useState(1)
  const [mounted, setMounted] = useState(false)

  const { user, logout } = useData()
  const navigate = useNavigate()

  // Logo animation
  useEffect(() => {
    setMounted(true)
    const interval = setInterval(() => {
      setOffset(prev => {
        if (prev >= 10) setDirection(-1)
        if (prev <= -10) setDirection(1)
        return prev + direction
      })
    }, 50)
    return () => clearInterval(interval)
  }, [direction])

  // Logout
  const handleLogout = () => {
    logout() // clear user from context and localStorage
    navigate("/home")
  }

  return (
    <header className="w-full sticky top-0 z-50 bg-white shadow-md">
      <nav className="max-w-7xl mx-auto px-6 py-4">

        {/* Logo */}
        <div className="flex justify-center mb-4 perspective-1000">
          <img
            src={logo}
            alt="Logo"
            className="h-12 sm:h-14 md:h-20 object-contain transition-transform duration-500 ease-in-out"
            style={{ transform: `translateX(${offset}px)` }}
          />
        </div>

        {/* Menu + Actions */}
        <div className={`flex flex-col sm:flex-row items-center justify-between gap-4 sm:gap-6
          transition-all duration-1000 ease-out
          ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'}
        `}>
          {/* Menu */}
          <ul className="flex flex-wrap justify-center gap-6 sm:gap-8 text-gray-800 font-semibold uppercase tracking-wide">
            {['Home', 'Shop', 'Categories', 'About', 'Contact'].map((item, i) => (
              <li key={i} className="cursor-pointer hover:text-red-500 transition-all duration-300 transform hover:-translate-y-1 hover:scale-105">
                {item}
              </li>
            ))}
          </ul>

          {/* Actions */}
          <div className="flex gap-4 items-center">
            {!user ? (
              // ✅ Only Login button before login
              <Link to="/login">
                <Button
                  text="Login"
                  property="bg-red-500 hover:bg-red-600 text-white px-6 py-2 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 cursor-pointer"
                />
              </Link>
            ) : (
              // ✅ Add to Cart, Wishlist, and Profile + Logout after login
              <>
                <Link to="/addtocard">
                  <Button
                    text="Add to Cart"
                    property="bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 cursor-pointer"
                  />
                </Link>
                <Link to="/wishlist">
                  <Button
                    text="Wishlist"
                    property="bg-yellow-500 hover:bg-yellow-600 text-white px-6 py-2 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 cursor-pointer"
                  />
                </Link>
                <div className="relative group">
                  <span className="cursor-pointer font-semibold">{user.name}</span>
                  <div className="absolute right-0 mt-2 w-24 bg-white text-black p-2 rounded shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10">
                    <button onClick={handleLogout} className="w-full text-left">Logout</button>
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
