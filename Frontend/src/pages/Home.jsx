import React from 'react'
import Banner from '../common/Banner'
import Navbar from '../common/Navbar'
import Products from './Products'
import Category from '../layouts/Category'
import Footer from './Footer'

const Home = () => {
  return (
    <div>
      <Banner/>
      <Category/>
      <Products/>
      <Footer/> 
    </div>
  )
}

export default Home