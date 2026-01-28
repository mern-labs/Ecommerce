import React, { useState, useEffect } from "react"
import { Link, useNavigate } from "react-router-dom"
import logo from "../assets/saree logo.jpg"
import { register } from "../interceptor/interceptor"

const Register = () => {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [mounted, setMounted] = useState(false)

  const [errors, setErrors] = useState({
    name: "",
    email: "",
    password: "",
    api: ""
  })

  const navigate = useNavigate()

  // ✅ REGEX
  const nameRegex = /^[A-Za-z ]{3,}$/
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  const passwordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/

  useEffect(() => {
    setMounted(true)
  }, [])

  const handleRegister = async (e) => {
    e.preventDefault()

    let newErrors = {
      name: "",
      email: "",
      password: "",
      api: ""
    }

    // ✅ Name validation
    if (!name.trim()) {
      newErrors.name = "Name is required"
    } else if (!nameRegex.test(name)) {
      newErrors.name = "Name must be at least 3 letters"
    }

    // ✅ Email validation
    if (!email.trim()) {
      newErrors.email = "Email is required"
    } else if (!emailRegex.test(email)) {
      newErrors.email = "Enter a valid email address"
    }

    // ✅ Password validation
    if (!password) {
      newErrors.password = "Password is required"
    } else if (!passwordRegex.test(password)) {
      newErrors.password =
        "Password must be 8+ chars, uppercase, lowercase, number & special character"
    }

    // ❌ Stop if validation fails
    if (newErrors.name || newErrors.email || newErrors.password) {
      setErrors(newErrors)
      return
    }

    // ✅ Clear errors before API
    setErrors({
      name: "",
      email: "",
      password: "",
      api: ""
    })

    try {
      const res = await register({ name, email, password })
      console.log("Registered successfully", res.data)
      navigate("/login")
    } catch (error) {
      setErrors({
        ...newErrors,
        api: error.response?.data?.message || "Something went wrong"
      })
    }
  }

  return (
    <div className="min-h-screen bg-linear-to-r from-pink-50 via-yellow-50 to-red-50 flex items-center justify-center px-4">
      <div
        className={`bg-white shadow-2xl rounded-3xl w-full max-w-md p-8 transition-all duration-1000 ${
          mounted ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-4"
        }`}
      >
        {/* Logo */}
        <div className="flex justify-center mb-6">
          <img src={logo} alt="Saree Logo" className="h-20" />
        </div>

        <h2 className="text-3xl font-bold text-center mb-6">
          Create Account
        </h2>

        <form className="flex flex-col gap-4" onSubmit={handleRegister}>
          {/* Name */}
          <input
            type="text"
            placeholder="Full Name"
            value={name}
            onChange={(e) => {
              setName(e.target.value)
              setErrors((prev) => ({ ...prev, name: "" }))
            }}
            className={`px-4 py-3 border rounded-xl ${
              errors.name ? "border-red-500" : "border-gray-300"
            }`}
          />
          {errors.name && (
            <p className="text-red-500 text-sm">{errors.name}</p>
          )}

          {/* Email */}
          <input
            type="text"
            placeholder="Email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value)
              setErrors((prev) => ({ ...prev, email: "" }))
            }}
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
            onChange={(e) => {
              setPassword(e.target.value)
              setErrors((prev) => ({ ...prev, password: "" }))
            }}
            className={`px-4 py-3 border rounded-xl ${
              errors.password ? "border-red-500" : "border-gray-300"
            }`}
          />
          {errors.password && (
            <p className="text-red-500 text-sm">{errors.password}</p>
          )}

          {/* Submit */}
          <button
            type="submit"
            className="bg-pink-500 hover:bg-pink-600 text-white py-3 rounded-xl font-semibold shadow-lg cursor-pointer"
          >
            Register
          </button>

          {/* API Error */}
          {errors.api && (
            <p className="text-red-600 text-sm text-center">
              {errors.api}
            </p>
          )}
        </form>

        <div className="mt-4 flex justify-between text-sm text-gray-500">
          <Link to="/login">Already have an account?</Link>
          <Link to="/help">Help</Link>
        </div>
      </div>
    </div>
  )
}

export default Register
