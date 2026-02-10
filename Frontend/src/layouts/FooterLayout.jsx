import Navbar from "../common/Navbar"
import { Outlet } from "react-router-dom"
import Footer from "../pages/Footer"

const FooterLayout = () => {
  return (
    <>
      <Outlet />
      <Footer />
    </>
  )
}

export default FooterLayout
