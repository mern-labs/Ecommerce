import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { ProviderContext } from './context/Usecontext'
import Navbar from './common/Navbar'
import Home from './pages/Home'
import Login from './common/Login'
import Register from './common/Register'


const App = () => {
  return (
    <ProviderContext>
      <BrowserRouter>
        {/* <Navbar />  */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          {/* <Route path="/addtocard" element={<AddToCart />} />
          <Route path="/wishlist" element={<Wishlist />} /> */}
        </Routes>
      </BrowserRouter>
    </ProviderContext>
  )
}

export default App
