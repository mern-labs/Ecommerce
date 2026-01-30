import React, { useState, useEffect } from "react"
import { Link, useNavigate } from "react-router-dom"
import logo from "../assets/saree logo.jpg"
import { login as loginAPI } from "../interceptor/interceptor"
import { useData } from "../context/Usecontext"

const Login = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [mounted, setMounted] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [rememberMe, setRememberMe] = useState(false)
  const [errors, setErrors] = useState({ email: "", password: "", api: "" })

  const navigate = useNavigate()
  const { login } = useData()

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

  useEffect(() => {
    setMounted(true)
    const savedEmail = localStorage.getItem("rememberedEmail")
    if (savedEmail) {
      setEmail(savedEmail)
      setRememberMe(true)
    }
  }, [])

  const handleLogin = async (e) => {
    e.preventDefault()

    let newErrors = { email: "", password: "", api: "" }

    if (!email.trim()) newErrors.email = "Email is required"
    else if (!emailRegex.test(email)) newErrors.email = "Enter a valid email"

    if (!password) newErrors.password = "Password is required"

    if (newErrors.email || newErrors.password) {
      setErrors(newErrors)
      return
    }

    setErrors({ email: "", password: "", api: "" })
    setIsLoading(true)

    try {
      const res = await loginAPI({ email, password })
      localStorage.setItem("token", res.data.data.token)

      if (rememberMe) {
        localStorage.setItem("rememberedEmail", email)
      } else {
        localStorage.removeItem("rememberedEmail")
      }

      login({ ...res.data.data })
      navigate("/home")
    } catch (error) {
      setErrors({
        ...newErrors,
        api: error.response?.data?.message || "Invalid email or password"
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleEmailFocus = () => {
    if (errors.email) setErrors({ ...errors, email: "" })
  }

  const handlePasswordFocus = () => {
    if (errors.password) setErrors({ ...errors, password: "" })
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-yellow-50 to-red-50 flex items-center justify-center px-4 py-8">
      {/* Main Card */}
      <div
        className={`bg-white shadow-2xl rounded-3xl w-full max-w-md p-8 transition-all duration-700 ${
          mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
        }`}
      >
        {/* Logo */}
        <div className="flex justify-center mb-6">
          <img
            src={logo}
            alt="Saree Logo"
            className="h-20 w-auto object-contain"
          />
        </div>

        {/* Title */}
        <h2 className="text-3xl font-bold text-center mb-2 bg-gradient-to-r from-pink-500 via-red-500 to-pink-600 bg-clip-text text-transparent">
          Welcome Back
        </h2>
        <p className="text-center text-gray-500 text-sm mb-8">
          Sign in to continue your journey
        </p>

        <form className="space-y-5" onSubmit={handleLogin}>
          {/* Email Field */}
          <div>
            <div className="relative">
              <input
                type="text"
                placeholder="Email Address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onFocus={handleEmailFocus}
                className={`w-full px-4 py-3.5 border rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-500 transition-all placeholder:text-gray-400 ${
                  errors.email
                    ? "border-red-500 bg-red-50"
                    : "border-gray-300 bg-white hover:border-pink-300"
                }`}
                disabled={isLoading}
              />
              <div className="absolute inset-y-0 right-3 flex items-center pointer-events-none">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className={`w-5 h-5 transition-colors ${
                    email ? "text-pink-500" : "text-gray-300"
                  }`}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75"
                  />
                </svg>
              </div>
            </div>
            {errors.email && (
              <p className="text-red-500 text-xs mt-2 ml-1 flex items-center gap-1">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  className="w-4 h-4"
                >
                  <path
                    fillRule="evenodd"
                    d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-5a.75.75 0 01.75.75v4.5a.75.75 0 01-1.5 0v-4.5A.75.75 0 0110 5zm0 10a1 1 0 100-2 1 1 0 000 2z"
                    clipRule="evenodd"
                  />
                </svg>
                {errors.email}
              </p>
            )}
          </div>

          {/* Password Field */}
          <div>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onFocus={handlePasswordFocus}
                className={`w-full px-4 py-3.5 pr-12 border rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-500 transition-all placeholder:text-gray-400 ${
                  errors.password
                    ? "border-red-500 bg-red-50"
                    : "border-gray-300 bg-white hover:border-pink-300"
                }`}
                disabled={isLoading}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-pink-500 transition-colors p-1 rounded-lg hover:bg-pink-50"
                disabled={isLoading}
                tabIndex={-1}
              >
                {showPassword ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-5 h-5"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88"
                    />
                  </svg>
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-5 h-5"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                )}
              </button>
            </div>
            {errors.password && (
              <p className="text-red-500 text-xs mt-2 ml-1 flex items-center gap-1">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  className="w-4 h-4"
                >
                  <path
                    fillRule="evenodd"
                    d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-5a.75.75 0 01.75.75v4.5a.75.75 0 01-1.5 0v-4.5A.75.75 0 0110 5zm0 10a1 1 0 100-2 1 1 0 000 2z"
                    clipRule="evenodd"
                  />
                </svg>
                {errors.password}
              </p>
            )}
          </div>

          {/* Remember Me */}
          <div className="flex items-center justify-between">
            <label className="flex items-center gap-2 text-sm text-gray-600 cursor-pointer group">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="w-4 h-4 rounded border-gray-300 text-pink-500 focus:ring-pink-500 cursor-pointer"
                disabled={isLoading}
              />
              <span className="group-hover:text-pink-500 transition-colors">
                Remember me
              </span>
            </label>
            <Link
              to="/forgot-password"
              className="text-sm text-gray-600 hover:text-pink-500 transition-colors font-medium"
            >
              Forgot password?
            </Link>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-gradient-to-r from-pink-500 via-red-500 to-pink-600 hover:from-pink-600 hover:via-red-600 hover:to-pink-700 disabled:from-gray-300 disabled:to-gray-400 text-white py-3.5 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 disabled:cursor-not-allowed transform hover:scale-[1.01] active:scale-[0.99]"
          >
            {isLoading ? (
              <div className="flex items-center justify-center gap-2">
                <svg
                  className="animate-spin h-5 w-5 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                <span>Logging in...</span>
              </div>
            ) : (
              <span className="flex items-center justify-center gap-2">
                Login
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2}
                  stroke="currentColor"
                  className="w-5 h-5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
                  />
                </svg>
              </span>
            )}
          </button>

          {/* API Error */}
          {errors.api && (
            <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-xl text-sm text-center flex items-center justify-center gap-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                className="w-5 h-5"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.28 7.22a.75.75 0 00-1.06 1.06L8.94 10l-1.72 1.72a.75.75 0 101.06 1.06L10 11.06l1.72 1.72a.75.75 0 101.06-1.06L11.06 10l1.72-1.72a.75.75 0 00-1.06-1.06L10 8.94 8.28 7.22z"
                  clipRule="evenodd"
                />
              </svg>
              {errors.api}
            </div>
          )}
        </form>

        {/* Footer */}
        <div className="mt-8 pt-6 border-t border-gray-200">
          <p className="text-center text-sm text-gray-600">
            Don't have an account?{" "}
            <Link
              to="/register"
              className="text-pink-500 hover:text-pink-600 font-semibold transition-colors"
            >
              Create account
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}

export default Login