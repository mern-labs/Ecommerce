import React from 'react'
import Banner from '../common/Banner'
import Navbar from '../common/Navbar'
import Products from './Products'
import Category from '../layouts/Category'
import Footer from './Footer'
import AboutSection from './AboutSection'

const Home = () => {
  return (
    <div>
      <Banner/>
      <Category/>
      <Products/>
      <AboutSection/>
      <Footer/> 
    </div>
  )
}
export default Home