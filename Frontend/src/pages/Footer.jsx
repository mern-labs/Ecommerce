import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import logo from "../assets/saree logo.jpg"

const Footer = () => {
  const [email, setEmail] = useState('')

  const handleSubscribe = (e) => {
    e.preventDefault()
    // Add your subscription logic here
    console.log('Subscribed with email:', email)
    setEmail('')
  }

  return (
    <footer className="bg-gray-50 pt-12 pb-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          
          {/* Logo and Contact Section */}
          <div className="space-y-6">
            <Link to="/home">
              <img
                src={logo}
                alt="Kalamandir Logo"
                className="h-20 object-contain"
              />
            </Link>
            
            {/* Phone */}
            <div className="flex items-start gap-3">
              <div className="w-12 h-12 rounded-full border-2 border-red-500 flex items-center justify-center flex-shrink-0">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6 text-red-500">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
                </svg>
              </div>
              <div>
                <p className="font-bold text-gray-800 text-lg">9852 9852 99</p>
              </div>
            </div>

            {/* Email */}
            <div className="space-y-2">
              <a href="mailto:hello@kalamandir.com" className="text-gray-600 hover:text-red-500 transition-colors block">
                hello@kalamandir.com
              </a>
              <Link to="/track-order" className="text-gray-600 hover:text-red-500 transition-colors block">
                Track Your Order
              </Link>
              <Link to="/stores" className="text-gray-600 hover:text-red-500 transition-colors block">
                Stores
              </Link>
            </div>

            {/* Social Icons */}
            <div className="flex gap-4">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="w-10 h-10 flex items-center justify-center text-gray-600 hover:text-red-500 transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24" className="w-6 h-6">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="w-10 h-10 flex items-center justify-center text-gray-600 hover:text-red-500 transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24" className="w-6 h-6">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              </a>
              <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="w-10 h-10 flex items-center justify-center text-gray-600 hover:text-red-500 transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24" className="w-6 h-6">
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Shop Section */}
          <div>
            <h3 className="font-bold text-gray-800 text-lg mb-4 relative inline-block">
              Shop
              <span className="absolute bottom-0 left-0 w-12 h-0.5 bg-red-500"></span>
            </h3>
            <ul className="space-y-3">
              <li>
                <Link to="/festive" className="text-gray-600 hover:text-red-500 transition-colors">
                  Festive
                </Link>
              </li>
              <li>
                <Link to="/wedding" className="text-gray-600 hover:text-red-500 transition-colors">
                  Wedding
                </Link>
              </li>
              <li>
                <Link to="/party" className="text-gray-600 hover:text-red-500 transition-colors">
                  Party
                </Link>
              </li>
              <li>
                <Link to="/video-call-shopping" className="text-gray-600 hover:text-red-500 transition-colors">
                  Video Call Shopping
                </Link>
              </li>
            </ul>
          </div>

          {/* Get to Know Us Section */}
          <div>
            <h3 className="font-bold text-gray-800 text-lg mb-4 relative inline-block">
              GET TO KNOW US
              <span className="absolute bottom-0 left-0 w-12 h-0.5 bg-red-500"></span>
            </h3>
            <ul className="space-y-3">
              <li>
                <Link to="/faq" className="text-gray-600 hover:text-red-500 transition-colors">
                  FAQ
                </Link>
              </li>
              <li>
                <Link to="/blog" className="text-gray-600 hover:text-red-500 transition-colors">
                  Blog
                </Link>
              </li>
              <li>
                <Link to="/awards" className="text-gray-600 hover:text-red-500 transition-colors">
                  Awards
                </Link>
              </li>
              <li>
                <Link to="/media" className="text-gray-600 hover:text-red-500 transition-colors">
                  Media
                </Link>
              </li>
              <li>
                <Link to="/stores" className="text-gray-600 hover:text-red-500 transition-colors">
                  Stores
                </Link>
              </li>
              <li>
                <Link to="/virtual-tour" className="text-gray-600 hover:text-red-500 transition-colors">
                  Virtual Tour
                </Link>
              </li>
            </ul>
          </div>

          {/* User Policy & Newsletter Section */}
          <div className="space-y-6">
            <div>
              <h3 className="font-bold text-gray-800 text-lg mb-4 relative inline-block">
                USER POLICY
                <span className="absolute bottom-0 left-0 w-12 h-0.5 bg-red-500"></span>
              </h3>
              <ul className="space-y-3">
                <li>
                  <Link to="/privacy-policy" className="text-gray-600 hover:text-red-500 transition-colors">
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link to="/terms-conditions" className="text-gray-600 hover:text-red-500 transition-colors">
                    Terms & Conditions
                  </Link>
                </li>
                <li>
                  <Link to="/disclaimer" className="text-gray-600 hover:text-red-500 transition-colors">
                    Disclaimer
                  </Link>
                </li>
                <li>
                  <Link to="/return-policy" className="text-gray-600 hover:text-red-500 transition-colors">
                    Return Policy
                  </Link>
                </li>
                <li>
                  <Link to="/shipping-policy" className="text-gray-600 hover:text-red-500 transition-colors">
                    Shipping Policy
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Newsletter Section - Full Width */}
        <div className="border-t border-gray-200 pt-8 mb-8">
          <div className="max-w-xl">
            <h3 className="font-bold text-gray-800 text-lg mb-2 relative inline-block">
              Join Our Newsletter
              <span className="absolute bottom-0 left-0 w-12 h-0.5 bg-red-500"></span>
            </h3>
            <p className="text-gray-600 mb-4">Sign up for our e-mail to get latest news.</p>
            <form onSubmit={handleSubscribe} className="flex gap-2">
              <input
                type="email"
                placeholder="Your email letter"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="flex-1 px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                required
              />
              <button
                type="submit"
                className="px-8 py-3 bg-gray-800 text-white rounded-md hover:bg-gray-900 transition-colors font-semibold"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>

        {/* Stay Connected Section */}
        <div className="mb-8">
          <h3 className="font-bold text-gray-800 text-lg mb-2 relative inline-block">
            Stay Connected With Kalamandir
            <span className="absolute bottom-0 left-0 w-12 h-0.5 bg-red-500"></span>
          </h3>
          <p className="text-gray-600">Get Latest Updates From Us</p>
        </div>

        {/* Payment Methods */}
        <div className="mb-8">
          <h3 className="font-bold text-gray-800 text-lg mb-4 relative inline-block">
            We Accept
            <span className="absolute bottom-0 left-0 w-12 h-0.5 bg-red-500"></span>
          </h3>
          <div className="flex gap-4 items-center">
            {/* Visa */}
            <div className="bg-white px-4 py-2 rounded shadow-sm border border-gray-200">
              <svg className="h-8" viewBox="0 0 48 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect width="48" height="32" rx="4" fill="white"/>
                <path d="M20.5 11.5L18.5 20.5H16L18 11.5H20.5Z" fill="#1A1F71"/>
                <path d="M27.5 11.7L25.2 17.8L24.9 16.2L23.8 12.2C23.7 11.8 23.3 11.5 22.9 11.5H18.7L18.6 11.7C19.5 11.9 20.3 12.2 21.1 12.6L23.6 20.5H26.2L30.1 11.5H27.5V11.7Z" fill="#1A1F71"/>
                <path d="M32.8 11.5C32.4 11.5 32.1 11.7 31.9 12L28.5 20.5H31.1L31.6 19H34.7L35 20.5H37.3L35.3 11.5H32.8ZM32.3 17L33.4 13.8L34 17H32.3Z" fill="#1A1F71"/>
                <path d="M15.5 11.5L13 18.2L12.7 16.7L11.8 12.3C11.7 11.8 11.3 11.5 10.8 11.5H7L6.9 11.8C8.4 12.2 9.8 12.8 11 13.6L13.9 20.5H16.5L20.5 11.5H15.5Z" fill="#1A1F71"/>
              </svg>
            </div>
            
            {/* Mastercard */}
            <div className="bg-white px-4 py-2 rounded shadow-sm border border-gray-200">
              <svg className="h-8" viewBox="0 0 48 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect width="48" height="32" rx="4" fill="white"/>
                <circle cx="18" cy="16" r="7" fill="#EB001B"/>
                <circle cx="30" cy="16" r="7" fill="#F79E1B"/>
                <path d="M24 11C22.3 12.3 21.2 14.1 21.2 16C21.2 17.9 22.3 19.7 24 21C25.7 19.7 26.8 17.9 26.8 16C26.8 14.1 25.7 12.3 24 11Z" fill="#FF5F00"/>
              </svg>
            </div>
            
            {/* UPI */}
            <div className="bg-white px-4 py-2 rounded shadow-sm border border-gray-200">
              <span className="font-bold text-orange-600 text-xl">UPI</span>
            </div>
          </div>
        </div>

        {/* Bottom Bar - Copyright and SSKL */}
        <div className="border-t border-gray-200 pt-6 flex flex-col sm:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-orange-500 rounded-sm flex items-center justify-center">
              <span className="text-white font-bold text-xs">SSL</span>
            </div>
            <span className="font-bold text-gray-800">SSKL</span>
          </div>
          <p className="text-gray-600 text-sm">
            © Copyright 2026 Kalamandir. All Rights Reserved
          </p>
          {/* Scroll to Top Button */}
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="w-10 h-10 rounded-full border-2 border-gray-300 flex items-center justify-center hover:border-red-500 hover:text-red-500 transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 15.75l7.5-7.5 7.5 7.5" />
            </svg>
          </button>
        </div>
      </div>
    </footer>
  )
}

export default Footer;