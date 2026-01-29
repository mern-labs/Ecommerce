import React, { createContext, useContext, useEffect, useState } from "react"
import { getProducts } from "../interceptor/interceptor"

const DataContext = createContext(null)

export function ProviderContext({ children }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const [products, setProducts] = useState([])

  // 🔁 Restore user instantly
  useEffect(() => {
    const storedUser = localStorage.getItem("user")
    if (storedUser) {
      setUser(JSON.parse(storedUser))
    }
    setLoading(false)
  }, [])

  // 📦 Fetch products
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await getProducts()
        setProducts(res.data.data)
        console.log("Products", res.data.data);
      } catch (err) {
        console.log(err.message)
      }
    }
    fetchProducts()
  }, [])

  // ✅ Login
  const login = (data) => {
    localStorage.setItem("user", JSON.stringify(data))
    setUser(data)
  }

  // 🚪 Logout
  const logout = () => {
    localStorage.removeItem("user")
    localStorage.removeItem("token")
    setUser(null)
  }


  const addToCart = (product, quantity = 1) => {
    setCart((prev) => {
      const exist = prev.find((item) => item._id === product._id)
      if (exist) {
        return prev.map((item) =>
          item._id === product._id
            ? { ...item, quantity }
            : item
        )
      }
      return [...prev, { ...product, quantity }]
    })
  }

  // ✅ Wishlist
  const addToWishlist = (product) => {
    setWishlist((prev) => {
      if (prev.find((item) => item._id === product._id)) return prev
      return [...prev, product]
    })
  }

  return (
    <DataContext.Provider
      value={{
        user,
        loading,
        products,
        login,
        logout,
        addToCart,
        addToWishlist
      }}
    >
      {children}
    </DataContext.Provider>
  )
}

export function useData() {
  return useContext(DataContext)
}
