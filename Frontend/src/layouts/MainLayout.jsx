import Navbar from "../common/Navbar"
import { Outlet } from "react-router-dom"

const MainLayout = () => {
  return (
    <>
      <Navbar />
      <Outlet />
    </>
  )
}

export default MainLayout
