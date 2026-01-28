import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import logo from "../assets/saree logo.jpg"
import Button from './Button'
import { login } from '../interceptor/interceptor'

const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [mounted, setMounted] = useState(false)

  const [errors, setErrors] = useState({
    email: "",
    password: "",
    api: ""
  })

  const navigate = useNavigate()

  // ✅ REGEX
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

  useEffect(() => {
    setMounted(true)
  }, [])

  const handleLogin = async (e) => {
    e.preventDefault()

    let newErrors = {
      email: "",
      password: "",
      api: ""
    }

    // ✅ Email validation
    if (!email) {
      newErrors.email = "Email is required"
    } else if (!emailRegex.test(email)) {
      newErrors.email = "Enter a valid email address"
    }

    // ✅ Password validation
    if (!password) {
      newErrors.password = "Password is required"
    }

    // ❌ Stop API call if errors
    if (newErrors.email || newErrors.password) {
      setErrors(newErrors)
      return
    }

    // Clear errors
    setErrors({
      email: "",
      password: "",
      api: ""
    })

    try {
      const res = await login({ email, password })
      console.log("Login successful", res.data)
      navigate("/home")
    } catch (error) {
      setErrors({
        ...newErrors,
        api: error.response?.data?.message || "Invalid email or password"
      })
    }
  }

  return (
    <div className="min-h-screen bg-linear-to-r from-pink-50 via-yellow-50 to-red-50 flex items-center justify-center px-4">
      <div
        className={`bg-white shadow-2xl rounded-3xl w-full max-w-md p-8 transition-all duration-1000 ease-out ${
          mounted ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'
        }`}
      >

        {/* Logo */}
        <div className="flex justify-center mb-6">
          <img src={logo} alt="Saree Logo" className="h-20" />
        </div>

        <h2 className="text-3xl font-bold text-center mb-6">
          Welcome Back
        </h2>

        <form className="flex flex-col gap-4" onSubmit={handleLogin}>

          {/* Email */}
          <input
            type="text"
            placeholder="Email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            className={`px-4 py-3 border rounded-xl ${
              errors.email ? "border-red-500" : "border-gray-300"
            }`}
          />
          {errors.email && (
            <p className="text-red-500 text-sm">{errors.email}</p>
          )}

          {/* Password */}
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            className={`px-4 py-3 border rounded-xl ${
              errors.password ? "border-red-500" : "border-gray-300"
            }`}
          />
          {errors.password && (
            <p className="text-red-500 text-sm">{errors.password}</p>
          )}

          <Button
            text="Login"
            type="submit"
            property="bg-pink-500 hover:bg-pink-600 text-white py-3 rounded-xl font-semibold shadow-lg text-center"
          />

          {errors.api && (
            <p className="text-red-600 text-sm text-center">{errors.api}</p>
          )}
        </form>

        <div className="mt-4 flex justify-between text-sm text-gray-500">
          <Link to="/forgot-password">Forgot password?</Link>
          <Link to="/register">Sign up</Link>
        </div>

      </div>
    </div>
  )
}

export default Login
