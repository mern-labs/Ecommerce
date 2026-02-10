import Navbar from "../common/Navbar"
import { Outlet } from "react-router-dom"
import Footer from "../pages/Footer"

const MainLayout = () => {
  return (
    <>
      <Navbar />
      <Outlet />
    </>
  )
}

export default MainLayout
