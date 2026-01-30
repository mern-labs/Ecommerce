import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import logo from "../assets/saree logo.jpg"

const Footer = () => {
  const [email, setEmail] = useState('')
  const [isSubscribed, setIsSubscribed] = useState(false)

  const handleSubscribe = (e) => {
    e.preventDefault()
    // Add your subscription logic here
    console.log('Subscribed with email:', email)
    setIsSubscribed(true)
    setTimeout(() => {
      setIsSubscribed(false)
      setEmail('')
    }, 3000)
  }

  return (
    <footer className="relative bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 pt-20 pb-10 overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-pink-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl animate-pulse delay-500"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Main Grid - 4 Columns on Desktop */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-12 mb-16">
          
          {/* Column 1: Logo and Contact Section */}
          <div className="space-y-6 transform hover:scale-105 transition-transform duration-300">
            <Link to="/home" className="inline-block group">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-pink-500 to-purple-500 rounded-lg blur opacity-50 group-hover:opacity-100 transition-opacity"></div>
                <img
                  src={logo}
                  alt="Kalamandir Logo"
                  className="relative h-20 object-contain bg-white p-2 rounded-lg shadow-2xl transform group-hover:rotate-3 transition-all duration-300"
                />
              </div>
            </Link>
            
            {/* Phone - Animated */}
            <div className="flex items-center gap-4 group cursor-pointer">
              <div className="relative">
                <div className="absolute inset-0 bg-pink-500 rounded-full blur-md group-hover:blur-lg transition-all animate-pulse"></div>
                <div className="relative w-14 h-14 rounded-full bg-gradient-to-br from-pink-500 to-red-500 flex items-center justify-center transform group-hover:scale-110 group-hover:rotate-12 transition-all duration-300 shadow-lg">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-7 h-7 text-white animate-bounce">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
                  </svg>
                </div>
              </div>
              <div>
                <p className="font-bold text-white text-xl bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-transparent">
                  9852 9852 99
                </p>
                <p className="text-xs text-gray-400">Call us anytime!</p>
              </div>
            </div>

            {/* Email and Links - Animated */}
            <div className="space-y-3 text-base">
              <a 
                href="mailto:hello@kalamandir.com" 
                className="flex items-center gap-2 text-gray-300 hover:text-pink-400 transition-all duration-300 group"
              >
                <span className="w-2 h-2 bg-pink-500 rounded-full group-hover:scale-150 transition-transform"></span>
                <span className="group-hover:translate-x-2 transition-transform">hello@kalamandir.com</span>
              </a>
              <Link 
                to="/track-order" 
                className="flex items-center gap-2 text-gray-300 hover:text-purple-400 transition-all duration-300 group"
              >
                <span className="w-2 h-2 bg-purple-500 rounded-full group-hover:scale-150 transition-transform"></span>
                <span className="group-hover:translate-x-2 transition-transform">Track Your Order</span>
              </Link>
              <Link 
                to="/stores" 
                className="flex items-center gap-2 text-gray-300 hover:text-blue-400 transition-all duration-300 group"
              >
                <span className="w-2 h-2 bg-blue-500 rounded-full group-hover:scale-150 transition-transform"></span>
                <span className="group-hover:translate-x-2 transition-transform">Stores</span>
              </Link>
            </div>

            {/* Social Icons - Floating Animation */}
            <div className="flex gap-4 pt-4">
              <a 
                href="https://facebook.com" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="relative group"
              >
                <div className="absolute inset-0 bg-blue-500 rounded-full blur group-hover:blur-lg transition-all opacity-0 group-hover:opacity-50"></div>
                <div className="relative w-12 h-12 flex items-center justify-center rounded-full bg-gradient-to-br from-blue-600 to-blue-400 text-white hover:scale-125 transition-all duration-300 shadow-lg hover:shadow-blue-500/50 animate-float">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24" className="w-6 h-6">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                  </svg>
                </div>
              </a>
              <a 
                href="https://instagram.com" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="relative group"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full blur group-hover:blur-lg transition-all opacity-0 group-hover:opacity-50"></div>
                <div className="relative w-12 h-12 flex items-center justify-center rounded-full bg-gradient-to-br from-purple-600 via-pink-600 to-orange-500 text-white hover:scale-125 transition-all duration-300 shadow-lg hover:shadow-pink-500/50 animate-float animation-delay-200">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24" className="w-6 h-6">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                  </svg>
                </div>
              </a>
              <a 
                href="https://youtube.com" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="relative group"
              >
                <div className="absolute inset-0 bg-red-500 rounded-full blur group-hover:blur-lg transition-all opacity-0 group-hover:opacity-50"></div>
                <div className="relative w-12 h-12 flex items-center justify-center rounded-full bg-gradient-to-br from-red-600 to-red-400 text-white hover:scale-125 transition-all duration-300 shadow-lg hover:shadow-red-500/50 animate-float animation-delay-400">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24" className="w-6 h-6">
                    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                  </svg>
                </div>
              </a>
            </div>
          </div>

          {/* Column 2: Shop Section */}
          <div className="transform hover:translate-y-[-8px] transition-all duration-300">
            <h3 className="font-bold text-white text-xl mb-6 relative inline-block group">
              <span className="relative z-10">Shop</span>
              <span className="absolute -bottom-2 left-0 w-16 h-1.5 bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 rounded-full group-hover:w-full transition-all duration-500"></span>
              <span className="absolute -bottom-2 left-0 w-16 h-1.5 bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 rounded-full blur-sm group-hover:w-full transition-all duration-500"></span>
            </h3>
            <ul className="space-y-4">
              {['Festive', 'Wedding', 'Party', 'Video Call Shopping'].map((item, index) => (
                <li key={index} className="group">
                  <Link 
                    to={`/${item.toLowerCase().replace(' ', '-')}`} 
                    className="flex items-center gap-3 text-gray-300 hover:text-white transition-all duration-300"
                  >
                    <span className="w-0 h-0.5 bg-gradient-to-r from-pink-500 to-purple-500 group-hover:w-8 transition-all duration-300 rounded-full"></span>
                    <span className="group-hover:translate-x-2 transition-transform duration-300 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-pink-400 group-hover:to-purple-400 group-hover:bg-clip-text">
                      {item}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Get to Know Us Section */}
          <div className="transform hover:translate-y-[-8px] transition-all duration-300">
            <h3 className="font-bold text-white text-xl mb-6 relative inline-block group">
              <span className="relative z-10">Get to Know Us</span>
              <span className="absolute -bottom-2 left-0 w-16 h-1.5 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-full group-hover:w-full transition-all duration-500"></span>
              <span className="absolute -bottom-2 left-0 w-16 h-1.5 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-full blur-sm group-hover:w-full transition-all duration-500"></span>
            </h3>
            <ul className="space-y-4">
              {['FAQ', 'Blog', 'Awards', 'Media', 'Stores', 'Virtual Tour'].map((item, index) => (
                <li key={index} className="group">
                  <Link 
                    to={`/${item.toLowerCase().replace(' ', '-')}`} 
                    className="flex items-center gap-3 text-gray-300 hover:text-white transition-all duration-300"
                  >
                    <span className="w-0 h-0.5 bg-gradient-to-r from-blue-500 to-purple-500 group-hover:w-8 transition-all duration-300 rounded-full"></span>
                    <span className="group-hover:translate-x-2 transition-transform duration-300 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-blue-400 group-hover:to-purple-400 group-hover:bg-clip-text">
                      {item}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: User Policy Section */}
          <div className="transform hover:translate-y-[-8px] transition-all duration-300">
            <h3 className="font-bold text-white text-xl mb-6 relative inline-block group">
              <span className="relative z-10">User Policy</span>
              <span className="absolute -bottom-2 left-0 w-16 h-1.5 bg-gradient-to-r from-purple-500 via-pink-500 to-orange-500 rounded-full group-hover:w-full transition-all duration-500"></span>
              <span className="absolute -bottom-2 left-0 w-16 h-1.5 bg-gradient-to-r from-purple-500 via-pink-500 to-orange-500 rounded-full blur-sm group-hover:w-full transition-all duration-500"></span>
            </h3>
            <ul className="space-y-4">
              {['Privacy Policy', 'Terms & Conditions', 'Disclaimer', 'Return Policy', 'Shipping Policy'].map((item, index) => (
                <li key={index} className="group">
                  <Link 
                    to={`/${item.toLowerCase().replace(/ & | /g, '-')}`} 
                    className="flex items-center gap-3 text-gray-300 hover:text-white transition-all duration-300"
                  >
                    <span className="w-0 h-0.5 bg-gradient-to-r from-purple-500 to-pink-500 group-hover:w-8 transition-all duration-300 rounded-full"></span>
                    <span className="group-hover:translate-x-2 transition-transform duration-300 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-purple-400 group-hover:to-pink-400 group-hover:bg-clip-text">
                      {item}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Newsletter & Payment Section - Side by Side with Amazing Effects */}
        <div className="border-t border-purple-500/30 pt-16 pb-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            
            {/* Newsletter Section - Left Side with Glow Effect */}
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-r from-pink-500/20 to-purple-500/20 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="relative bg-gradient-to-br from-slate-800/50 to-purple-900/50 backdrop-blur-sm rounded-2xl p-8 border border-purple-500/20 hover:border-pink-500/50 transition-all duration-500">
                <h3 className="font-bold text-white text-2xl mb-2 relative inline-block">
                  <span className="relative z-10 bg-gradient-to-r from-pink-400 via-purple-400 to-blue-400 bg-clip-text text-transparent">
                    Join Our Newsletter
                  </span>
                  <span className="absolute -bottom-1 left-0 w-20 h-1.5 bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 rounded-full animate-pulse"></span>
                </h3>
                <p className="text-gray-300 mb-6 mt-4">
                  ✨ Sign up for our e-mail to get latest news and exclusive offers.
                </p>
                <form onSubmit={handleSubscribe} className="flex gap-3">
                  <div className="flex-1 relative group/input">
                    <div className="absolute inset-0 bg-gradient-to-r from-pink-500 to-purple-500 rounded-lg blur opacity-0 group-hover/input:opacity-30 transition-opacity"></div>
                    <input
                      type="email"
                      placeholder="Enter your email address"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="relative w-full px-5 py-4 bg-slate-800/80 border-2 border-purple-500/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent text-white placeholder-gray-400 transition-all duration-300 focus:scale-105"
                      required
                    />
                  </div>
                  <button
                    type="submit"
                    className="relative px-10 py-4 bg-gradient-to-r from-pink-500 via-purple-500 to-pink-500 bg-size-200 bg-pos-0 hover:bg-pos-100 text-white rounded-lg transition-all duration-500 font-bold whitespace-nowrap shadow-2xl hover:shadow-pink-500/50 hover:scale-110 transform overflow-hidden group/btn"
                  >
                    <span className="relative z-10 flex items-center gap-2">
                      {isSubscribed ? (
                        <>
                          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                          </svg>
                          Subscribed!
                        </>
                      ) : (
                        'Subscribe'
                      )}
                    </span>
                    <span className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300"></span>
                  </button>
                </form>
              </div>
            </div>

            {/* Payment Methods Section - Right Side with 3D Effect */}
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="relative bg-gradient-to-br from-slate-800/50 to-purple-900/50 backdrop-blur-sm rounded-2xl p-8 border border-purple-500/20 hover:border-blue-500/50 transition-all duration-500">
                <h3 className="font-bold text-white text-2xl mb-2 relative inline-block">
                  <span className="relative z-10 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                    We Accept
                  </span>
                  <span className="absolute -bottom-1 left-0 w-20 h-1.5 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-full animate-pulse"></span>
                </h3>
                <div className="flex gap-5 items-center mt-8">
                  {/* Visa - 3D Flip Effect */}
                  <div className="group/card perspective-1000 cursor-pointer">
                    <div className="relative preserve-3d group-hover/card:rotate-y-12 transition-all duration-500">
                      <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl blur-lg opacity-0 group-hover/card:opacity-60 transition-opacity"></div>
                      <div className="relative bg-white px-7 py-5 rounded-xl shadow-2xl hover:shadow-blue-500/50 transition-all duration-300 transform group-hover/card:scale-110">
                        <svg className="h-10 w-auto" viewBox="0 0 48 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <rect width="48" height="32" rx="4" fill="white"/>
                          <path d="M20.5 11.5L18.5 20.5H16L18 11.5H20.5Z" fill="#1A1F71"/>
                          <path d="M27.5 11.7L25.2 17.8L24.9 16.2L23.8 12.2C23.7 11.8 23.3 11.5 22.9 11.5H18.7L18.6 11.7C19.5 11.9 20.3 12.2 21.1 12.6L23.6 20.5H26.2L30.1 11.5H27.5V11.7Z" fill="#1A1F71"/>
                          <path d="M32.8 11.5C32.4 11.5 32.1 11.7 31.9 12L28.5 20.5H31.1L31.6 19H34.7L35 20.5H37.3L35.3 11.5H32.8ZM32.3 17L33.4 13.8L34 17H32.3Z" fill="#1A1F71"/>
                          <path d="M15.5 11.5L13 18.2L12.7 16.7L11.8 12.3C11.7 11.8 11.3 11.5 10.8 11.5H7L6.9 11.8C8.4 12.2 9.8 12.8 11 13.6L13.9 20.5H16.5L20.5 11.5H15.5Z" fill="#1A1F71"/>
                        </svg>
                      </div>
                    </div>
                  </div>
                  
                  {/* Mastercard - 3D Flip Effect */}
                  <div className="group/card perspective-1000 cursor-pointer">
                    <div className="relative preserve-3d group-hover/card:rotate-y-12 transition-all duration-500">
                      <div className="absolute inset-0 bg-gradient-to-r from-orange-500 to-red-500 rounded-xl blur-lg opacity-0 group-hover/card:opacity-60 transition-opacity"></div>
                      <div className="relative bg-white px-7 py-5 rounded-xl shadow-2xl hover:shadow-orange-500/50 transition-all duration-300 transform group-hover/card:scale-110">
                        <svg className="h-10 w-auto" viewBox="0 0 48 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <rect width="48" height="32" rx="4" fill="white"/>
                          <circle cx="18" cy="16" r="7" fill="#EB001B"/>
                          <circle cx="30" cy="16" r="7" fill="#F79E1B"/>
                          <path d="M24 11C22.3 12.3 21.2 14.1 21.2 16C21.2 17.9 22.3 19.7 24 21C25.7 19.7 26.8 17.9 26.8 16C26.8 14.1 25.7 12.3 24 11Z" fill="#FF5F00"/>
                        </svg>
                      </div>
                    </div>
                  </div>
                  
                  {/* UPI - 3D Flip Effect */}
                  <div className="group/card perspective-1000 cursor-pointer">
                    <div className="relative preserve-3d group-hover/card:rotate-y-12 transition-all duration-500">
                      <div className="absolute inset-0 bg-gradient-to-r from-orange-500 to-yellow-500 rounded-xl blur-lg opacity-0 group-hover/card:opacity-60 transition-opacity"></div>
                      <div className="relative bg-white px-7 py-5 rounded-xl shadow-2xl hover:shadow-orange-500/50 transition-all duration-300 transform group-hover/card:scale-110">
                        <span className="font-black text-orange-600 text-3xl tracking-wider">UPI</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar - Futuristic Design */}
        <div className="border-t border-purple-500/30 pt-10">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-6">
            {/* SSL Badge - Animated */}
            <div className="flex items-center gap-3 order-2 sm:order-1 group cursor-pointer">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-orange-500 to-red-500 rounded-lg blur-md group-hover:blur-lg transition-all animate-pulse"></div>
                <div className="relative w-11 h-11 bg-gradient-to-br from-orange-500 to-red-600 rounded-lg flex items-center justify-center shadow-lg transform group-hover:scale-110 group-hover:rotate-12 transition-all duration-300">
                  <span className="text-white font-black text-xs">SSL</span>
                </div>
              </div>
              <span className="font-bold text-white text-lg bg-gradient-to-r from-orange-400 to-red-400 bg-clip-text text-transparent">
                SSKL
              </span>
            </div>
            
            {/* Copyright - Glowing Text */}
            <p className="text-gray-400 text-sm text-center order-1 sm:order-2 hover:text-transparent hover:bg-gradient-to-r hover:from-pink-400 hover:to-purple-400 hover:bg-clip-text transition-all duration-300">
              © Copyright 2026 Kalamandir. All Rights Reserved
            </p>
            
            {/* Scroll to Top Button - Magnetic Effect */}
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="relative w-12 h-12 rounded-full border-2 border-purple-500 flex items-center justify-center text-purple-400 transition-all duration-300 order-3 group/scroll overflow-hidden hover:scale-125"
              aria-label="Scroll to top"
            >
              <span className="absolute inset-0 bg-gradient-to-r from-pink-500 to-purple-500 opacity-0 group-hover/scroll:opacity-100 transition-opacity rounded-full"></span>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={3} stroke="currentColor" className="relative z-10 w-6 h-6 group-hover/scroll:text-white transform group-hover/scroll:-translate-y-1 transition-all animate-bounce">
                <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 15.75l7.5-7.5 7.5 7.5" />
              </svg>
              <span className="absolute inset-0 bg-gradient-to-r from-pink-500 to-purple-500 rounded-full blur-lg opacity-0 group-hover/scroll:opacity-50 transition-opacity"></span>
            </button>
          </div>
        </div>
      </div>

      {/* Custom CSS for animations */}
      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
        .animation-delay-200 {
          animation-delay: 0.2s;
        }
        .animation-delay-400 {
          animation-delay: 0.4s;
        }
        .bg-size-200 {
          background-size: 200%;
        }
        .bg-pos-0 {
          background-position: 0%;
        }
        .bg-pos-100 {
          background-position: 100%;
        }
        .perspective-1000 {
          perspective: 1000px;
        }
        .preserve-3d {
          transform-style: preserve-3d;
        }
        .rotate-y-12 {
          transform: rotateY(12deg);
        }
      `}</style>
    </footer>
  )
}

export default Footer;
