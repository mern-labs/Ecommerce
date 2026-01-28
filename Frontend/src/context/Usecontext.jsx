import React, { createContext, useContext, useEffect, useState } from "react"
import { getProducts } from "../interceptor/interceptor"

const DataContext = createContext(null)

export function ProviderContext({ children }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const [product, setProduct] = useState([])

  // Load user from localStorage
  const fetchData = async () => {
    try {
      const storeData = localStorage.getItem('item')
      setUser(storeData ? JSON.parse(storeData) : null)
    } catch (error) {
      console.log(error.message)
    } finally {
      setLoading(false)
    }
  }

  // Fetch products
  useEffect(() => {
    const products = async () => {
      try {
        const res = await getProducts()
        setProduct(res.data.data)
      } catch (error) {
        console.log(error.message)
      }
    }
    products()
  }, [])

  useEffect(() => {
    const timer = setTimeout(() => {
      fetchData()
    }, 400)
    return () => clearTimeout(timer)
  }, [])

  const login = (data) => {
    localStorage.setItem("item", JSON.stringify(data))
    setUser(data)
    setLoading(false)
  }

  const logout = () => {
    setLoading(true)
    localStorage.removeItem("item")
    setTimeout(() => {
      setUser(null)
      setLoading(false)
    }, 400)
  }

  return (
    <DataContext.Provider value={{ login, logout, user, loading, setLoading, product }}>
      {children}
    </DataContext.Provider>
  )
}

export function useData() {
  return useContext(DataContext)
}
