import React from 'react'
import logo from "../assets/saree logo.jpg"
import Button from './Button'

const Navbar = () => {
  return (
    <div className='p-2'>
      <nav className='flex-col '>

        <div className='flex justify-center'>
          <img src={logo} className='w-30' alt="" />
        </div>

        <div className='flex justify-between px-2'>
          <div className='flex gap-10 list-none'>
            <li>Home</li>
            <li>Home</li>
            <li>Home</li>
            <li>Home</li>
            <li>Home</li>
          </div>

          <div>
            <Button text={"Login"} property={"bg-red-500 p-2 text-white rounded px-4 cursor-pointer"}/>
          </div>
        </div>

      </nav>
    </div>
  )
}

export default Navbar