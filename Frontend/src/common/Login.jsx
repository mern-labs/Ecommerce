import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import logo from "../assets/saree logo.jpg"
import Button from './Button'

const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true) // trigger fade-in animation
  }, [])

  const handleLogin = (e) => {
    e.preventDefault()
    // Handle login logic (API call)
    console.log({ email, password })
  }

  return (
    <div className="min-h-screen bg-gradient-to-r from-pink-50 via-yellow-50 to-red-50 flex items-center justify-center px-4">
      <div className={`bg-white shadow-2xl rounded-3xl w-full max-w-md p-8 transition-all duration-1000 ease-out ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'}`}>

        {/* Logo */}
        <div className="flex justify-center mb-6">
          <img 
            src={logo} 
            alt="Saree Logo" 
            className="h-20 w-auto object-contain animate-bounce-slow" 
          />
        </div>

        {/* Welcome Text */}
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 text-center mb-6 animate-slide-up">
          Welcome Back
        </h2>

        {/* Login Form */}
        <form className="flex flex-col gap-5" onSubmit={handleLogin}>
          
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            className="px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-pink-300 focus:outline-none transition-all duration-300 placeholder-gray-400"
            required
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            className="px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-pink-300 focus:outline-none transition-all duration-300 placeholder-gray-400"
            required
          />

          <Button 
            text="Login" 
            property="bg-pink-500 hover:bg-pink-600 text-white py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 text-center"
          />
        </form>

        {/* Optional Links */}
        <div className="mt-4 flex justify-between text-sm text-gray-500">
          <Link to="/forgot-password" className="hover:text-pink-500 transition-colors">
            Forgot password?
          </Link>
          <Link to="/register" className="hover:text-pink-500 transition-colors">
            Sign up
          </Link>
        </div>

      </div>
    </div>
  )
}

export default Login
