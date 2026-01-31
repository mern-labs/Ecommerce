import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import logo from "../assets/saree logo.jpg"

const Footer = () => {
  const [email, setEmail] = useState('')
  const [isSubscribed, setIsSubscribed] = useState(false)

  const handleSubscribe = (e) => {
    e.preventDefault()
    console.log('Subscribed with email:', email)
    setIsSubscribed(true)
    setTimeout(() => {
      setIsSubscribed(false)
      setEmail('')
    }, 3000)
  }

  return (
    <footer className="relative bg-linear-to-br from-slate-950 via-purple-950 to-slate-950 overflow-hidden">
      {/* Animated Background Orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-pink-500/10 rounded-full blur-3xl animate-float"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-float-delayed"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl animate-pulse"></div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-20 lg:py-24">
        
        {/* Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-12 mb-12 lg:mb-16">
          
          {/* Brand Column - Takes 3 columns on large screens */}
          <div className="lg:col-span-3 space-y-6">
            {/* Logo */}
            <Link to="/home" className="inline-block group">
              <div className="relative w-fit">
                <div className="absolute inset-0 bg-linear-to-r from-pink-500 to-purple-600 rounded-xl blur-lg opacity-50 group-hover:opacity-100 transition-all duration-300"></div>
                <img
                  src={logo}
                  alt="Kalamandir Logo"
                  className="relative h-20 lg:h-24 object-contain bg-white/95 p-3 rounded-xl shadow-2xl backdrop-blur-sm transform group-hover:scale-105 group-hover:rotate-2 transition-all duration-300"
                />
              </div>
            </Link>
            
            {/* Phone */}
            <div className="flex items-start gap-4 group">
              <div className="relative shrink-0">
                <div className="absolute inset-0 bg-linear-to-br from-pink-500 to-rose-600 rounded-2xl blur-md group-hover:blur-lg transition-all animate-pulse"></div>
                <div className="relative w-14 h-14 rounded-2xl bg-linear-to-br from-pink-500 to-rose-600 flex items-center justify-center transform group-hover:scale-110 group-hover:rotate-6 transition-all duration-300 shadow-xl">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-7 h-7 text-white">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
                  </svg>
                </div>
              </div>
              <div className="min-w-0 pt-1">
                <p className="font-bold text-white text-xl lg:text-2xl tracking-tight mb-0.5">
                  9852 9852 99
                </p>
                <p className="text-sm text-gray-400">Available 24/7</p>
              </div>
            </div>

            {/* Contact Links */}
            <div className="space-y-3">
              <a 
                href="mailto:hello@kalamandir.com" 
                className="flex items-center gap-3 text-gray-300 hover:text-pink-400 transition-all duration-300 group/link"
              >
                <div className="w-1.5 h-1.5 rounded-full bg-pink-500 group-hover/link:scale-150 transition-transform"></div>
                <span className="text-sm lg:text-base group-hover/link:translate-x-1 transition-transform">hello@kalamandir.com</span>
              </a>
              <Link 
                to="/track-order" 
                className="flex items-center gap-3 text-gray-300 hover:text-purple-400 transition-all duration-300 group/link"
              >
                <div className="w-1.5 h-1.5 rounded-full bg-purple-500 group-hover/link:scale-150 transition-transform"></div>
                <span className="text-sm lg:text-base group-hover/link:translate-x-1 transition-transform">Track Your Order</span>
              </Link>
              <Link 
                to="/stores" 
                className="flex items-center gap-3 text-gray-300 hover:text-blue-400 transition-all duration-300 group/link"
              >
                <div className="w-1.5 h-1.5 rounded-full bg-blue-500 group-hover/link:scale-150 transition-transform"></div>
                <span className="text-sm lg:text-base group-hover/link:translate-x-1 transition-transform">Find Our Stores</span>
              </Link>
            </div>

            {/* Social Icons */}
            <div className="flex gap-3 pt-2">
              {[
                { name: 'Facebook', url: 'https://facebook.com', gradient: 'from-blue-600 to-blue-400', icon: (
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                )},
                { name: 'Instagram', url: 'https://instagram.com', gradient: 'from-purple-600 via-pink-600 to-orange-500', icon: (
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                )},
                { name: 'YouTube', url: 'https://youtube.com', gradient: 'from-red-600 to-red-400', icon: (
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                )}
              ].map((social, index) => (
                <a 
                  key={index}
                  href={social.url} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="relative group/social"
                  aria-label={social.name}
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className={`absolute inset-0 bg-linear-to-br ${social.gradient} rounded-2xl blur opacity-0 group-hover/social:opacity-75 transition-all duration-300`}></div>
                  <div className={`relative w-12 h-12 flex items-center justify-center rounded-2xl bg-linear-to-br ${social.gradient} text-white hover:scale-110 transition-all duration-300 shadow-xl animate-float`}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24" className="w-6 h-6">
                      {social.icon}
                    </svg>
                  </div>
                </a>
              ))}
            </div>
          </div>

          {/* Navigation Columns - Each takes 2 columns */}
          {[
            {
              title: 'Shop',
              gradient: 'from-pink-500 to-purple-500',
              links: ['Festive', 'Wedding', 'Party', 'Video Call Shopping']
            },
            {
              title: 'Get to Know Us',
              gradient: 'from-blue-500 to-purple-500',
              links: ['FAQ', 'Blog', 'Awards', 'Media', 'Stores', 'Virtual Tour']
            },
            {
              title: 'User Policy',
              gradient: 'from-purple-500 to-pink-500',
              links: ['Privacy Policy', 'Terms & Conditions', 'Disclaimer', 'Return Policy', 'Shipping Policy']
            }
          ].map((section, sectionIndex) => (
            <div key={sectionIndex} className="lg:col-span-2" style={{ animationDelay: `${sectionIndex * 100}ms` }}>
              <h3 className="relative inline-block font-bold text-white text-lg lg:text-xl mb-6 group">
                <span className="relative z-10">{section.title}</span>
                <div className={`absolute -bottom-2 left-0 h-1 w-12 bg-linear-to-r ${section.gradient} rounded-full group-hover:w-full transition-all duration-500`}></div>
                <div className={`absolute -bottom-2 left-0 h-1 w-12 bg-linear-to-r ${section.gradient} rounded-full blur-sm group-hover:w-full transition-all duration-500`}></div>
              </h3>
              <ul className="space-y-3.5">
                {section.links.map((item, index) => (
                  <li key={index} className="group/item">
                    <Link 
                      to={`/${item.toLowerCase().replace(/ & | /g, '-')}`} 
                      className="flex items-center gap-2.5 text-gray-300 hover:text-white transition-all duration-300"
                    >
                      <div className={`w-0 h-0.5 bg-linear-to-r ${section.gradient} rounded-full group-hover/item:w-6 transition-all duration-300`}></div>
                      <span className="text-sm lg:text-base group-hover/item:translate-x-1.5 transition-transform duration-300">
                        {item}
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Newsletter Column - Takes 3 columns */}
          <div className="lg:col-span-3 md:col-span-2">
            <div className="relative group/newsletter">
              <div className="absolute inset-0 bg-linear-to-br from-pink-500/10 to-purple-500/10 rounded-3xl blur-2xl opacity-0 group-hover/newsletter:opacity-100 transition-opacity duration-500"></div>
              
              <div className="relative">
                <h3 className="font-bold text-transparent bg-linear-to-r from-pink-400 via-purple-400 to-blue-400 bg-clip-text text-xl lg:text-2xl mb-2">
                  Join Our Newsletter
                </h3>
                <p className="text-gray-400 text-sm lg:text-base mb-6">
                  Sign up for exclusive updates and offers.
                </p>

                <form onSubmit={handleSubscribe} className="space-y-3">
                  <div className="relative group/input">
                    <div className="absolute inset-0 bg-linear-to-r from-pink-500/30 to-purple-500/30 rounded-xl blur opacity-0 group-hover/input:opacity-100 transition-opacity duration-300"></div>
                    <input
                      type="email"
                      placeholder="Enter your email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="relative w-full px-5 py-3.5 bg-slate-900/80 border-2 border-purple-500/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-500/50 focus:border-pink-500/50 text-white text-sm lg:text-base placeholder-gray-500 transition-all duration-300 backdrop-blur-sm"
                      required
                    />
                  </div>
                  <button
                    type="submit"
                    className="relative w-full px-6 py-3.5 bg-linear-to-r from-pink-500 via-purple-500 to-pink-500 text-white rounded-xl font-bold shadow-2xl hover:shadow-pink-500/50 hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 overflow-hidden group/btn bg-size-200"
                  >
                    <span className="relative z-10 flex items-center justify-center gap-2 text-sm lg:text-base">
                      {isSubscribed ? (
                        <>
                          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                          </svg>
                          Subscribed!
                        </>
                      ) : (
                        'Subscribe Now'
                      )}
                    </span>
                    <div className="absolute inset-0 bg-linear-to-r from-purple-600 to-pink-600 opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300"></div>
                  </button>
                </form>

                {/* Stay Connected */}
                <div className="mt-8">
                  <h4 className="font-bold text-white text-base lg:text-lg mb-3">
                    Stay Connected
                  </h4>
                  <p className="text-gray-400 text-xs lg:text-sm mb-5">
                    Get the latest updates from Kalamandir
                  </p>

                  {/* Payment Methods */}
                  <div>
                    <h5 className="font-semibold text-white text-sm lg:text-base mb-4 relative inline-block">
                      <span className="relative z-10">We Accept</span>
                      <div className="absolute -bottom-1 left-0 w-full h-0.5 bg-linear-to-r from-pink-500 to-purple-500 rounded-full"></div>
                    </h5>
                    <div className="flex flex-wrap gap-3">
                      {/* Visa */}
                      <div className="group/card cursor-pointer transform hover:scale-110 transition-all duration-300">
                        <div className="relative">
                          <div className="absolute inset-0 bg-linear-to-r from-blue-500 to-purple-500 rounded-lg blur-md opacity-0 group-hover/card:opacity-60 transition-opacity"></div>
                          <div className="relative bg-white px-4 py-2.5 rounded-lg shadow-xl">
                            <svg className="h-7 w-auto" viewBox="0 0 48 32" fill="none">
                              <rect width="48" height="32" rx="4" fill="white"/>
                              <path d="M20.5 11.5L18.5 20.5H16L18 11.5H20.5Z" fill="#1A1F71"/>
                              <path d="M27.5 11.7L25.2 17.8L24.9 16.2L23.8 12.2C23.7 11.8 23.3 11.5 22.9 11.5H18.7L18.6 11.7C19.5 11.9 20.3 12.2 21.1 12.6L23.6 20.5H26.2L30.1 11.5H27.5V11.7Z" fill="#1A1F71"/>
                            </svg>
                          </div>
                        </div>
                      </div>
                      {/* Mastercard */}
                      <div className="group/card cursor-pointer transform hover:scale-110 transition-all duration-300">
                        <div className="relative">
                          <div className="absolute inset-0 bg-linear-to-r from-orange-500 to-red-500 rounded-lg blur-md opacity-0 group-hover/card:opacity-60 transition-opacity"></div>
                          <div className="relative bg-white px-4 py-2.5 rounded-lg shadow-xl">
                            <svg className="h-7 w-auto" viewBox="0 0 48 32" fill="none">
                              <rect width="48" height="32" rx="4" fill="white"/>
                              <circle cx="18" cy="16" r="7" fill="#EB001B"/>
                              <circle cx="30" cy="16" r="7" fill="#F79E1B"/>
                              <path d="M24 11C22.3 12.3 21.2 14.1 21.2 16C21.2 17.9 22.3 19.7 24 21C25.7 19.7 26.8 17.9 26.8 16C26.8 14.1 25.7 12.3 24 11Z" fill="#FF5F00"/>
                            </svg>
                          </div>
                        </div>
                      </div>
                      {/* UPI */}
                      <div className="group/card cursor-pointer transform hover:scale-110 transition-all duration-300">
                        <div className="relative">
                          <div className="absolute inset-0 bg-linear-to-r from-orange-500 to-yellow-500 rounded-lg blur-md opacity-0 group-hover/card:opacity-60 transition-opacity"></div>
                          <div className="relative bg-white px-4 py-2.5 rounded-lg shadow-xl">
                            <span className="font-black text-orange-600 text-2xl tracking-wider">UPI</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-purple-500/20 pt-8">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-6">
            {/* SSL Badge */}
            <div className="flex items-center gap-3 group/ssl cursor-pointer order-2 sm:order-1">
              <div className="relative">
                <div className="absolute inset-0 bg-linear-to-br from-orange-500 to-red-600 rounded-xl blur-md group-hover/ssl:blur-lg transition-all animate-pulse"></div>
                <div className="relative w-11 h-11 bg-linear-to-br from-orange-500 to-red-600 rounded-xl flex items-center justify-center shadow-xl transform group-hover/ssl:scale-110 group-hover/ssl:rotate-6 transition-all duration-300">
                  <span className="text-white font-black text-xs">SSL</span>
                </div>
              </div>
              <span className="font-bold text-white text-base lg:text-lg">
                Secure Checkout
              </span>
            </div>
            
            {/* Copyright */}
            <p className="text-gray-400 text-xs lg:text-sm text-center order-1 sm:order-2 hover:text-transparent hover:bg-linear-to-r hover:from-pink-400 hover:to-purple-400 hover:bg-clip-text transition-all duration-300 cursor-default">
              © 2026 Kalamandir. All Rights Reserved
            </p>
            
            {/* Scroll to Top */}
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="relative w-11 h-11 rounded-xl border-2 border-purple-500/40 flex items-center justify-center text-purple-400 transition-all duration-300 order-3 group/scroll overflow-hidden hover:scale-110 hover:border-purple-400"
              aria-label="Scroll to top"
            >
              <div className="absolute inset-0 bg-linear-to-br from-pink-500 to-purple-600 opacity-0 group-hover/scroll:opacity-100 transition-opacity rounded-xl"></div>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="relative z-10 w-6 h-6 group-hover/scroll:text-white transform group-hover/scroll:-translate-y-0.5 transition-all">
                <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 15.75l7.5-7.5 7.5 7.5" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Enhanced Animations */}
      <style jsx>{`
        @keyframes float {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-12px);
          }
        }

        @keyframes float-delayed {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(12px);
          }
        }

        .animate-float {
          animation: float 4s ease-in-out infinite;
        }

        .animate-float-delayed {
          animation: float-delayed 6s ease-in-out infinite;
        }

        .bg-size-200 {
          background-size: 200%;
        }

        /* Responsive text sizing */
        @media (max-width: 640px) {
          .animate-float {
            animation: float 3s ease-in-out infinite;
          }
        }

        /* Smooth scroll behavior */
        html {
          scroll-behavior: smooth;
        }
      `}</style>
    </footer>
  )
}

export default Footer
