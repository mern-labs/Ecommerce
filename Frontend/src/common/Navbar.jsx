import React, { useEffect, useState } from 'react'
import logo from "../assets/saree logo.jpg"
import Button from './Button'
import { Link } from 'react-router-dom'

const Navbar = () => {
  const [offset, setOffset] = useState(0)
  const [direction, setDirection] = useState(1) // logo movement
  const [mounted, setMounted] = useState(false) // for entrance animation

  useEffect(() => {
    setMounted(true) // trigger fade-in on mount
  }, [])

  useEffect(() => {
    const interval = setInterval(() => {
      setOffset(prev => {
        if (prev >= 10) setDirection(-1)
        if (prev <= -10) setDirection(1)
        return prev + direction
      })
    }, 50)

    return () => clearInterval(interval)
  }, [direction])

  return (
    <header className="w-full sticky top-0 z-50 bg-white shadow-md">
      <nav className="max-w-7xl mx-auto px-6 py-4">

        {/* Logo */}
        <div className="flex justify-center mb-4 perspective-1000">
          <img
            src={logo}
            alt="Logo"
            className="h-12 sm:h-14 md:h-20 object-contain transition-transform duration-500 ease-in-out"
            style={{
              transform: `translateX(${offset}px)`,
            }}
          />
        </div>

        {/* Menu + Actions */}
        <div
          className={`flex flex-col sm:flex-row items-center justify-between gap-4 sm:gap-6
            transition-all duration-1000 ease-out
            ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'}
          `}
        >
          {/* Menu */}
          <ul className="flex flex-wrap justify-center gap-6 sm:gap-8 text-gray-800 font-semibold uppercase tracking-wide">
            {['Home', 'Shop', 'Categories', 'About', 'Contact'].map((item, i) => (
              <li
                key={i}
                className="cursor-pointer hover:text-red-500 transition-all duration-300 transform hover:-translate-y-1 hover:scale-105"
              >
                {item}
              </li>
            ))}
          </ul>

          {/* Login Button */}
          <Link to={"/login"} className='cursor-pointer'>          <Button
            text="Login"
            property="bg-red-500 hover:bg-red-600 text-white px-6 py-2 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 cursor-pointer" btn={"cursor-pointer"}
          /></Link>
        </div>

      </nav>
    </header>
  )
}

export default Navbar
