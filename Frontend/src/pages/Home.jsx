import React from 'react'
import Banner from '../common/Banner'
import Navbar from '../common/Navbar'
import Products from './Products'
import Category from '../layouts/Category'
import Footer from './Footer'
import AboutSection from './AboutSection'
import Contact from './Contact'

const Home = () => {
  return (
    <div>
      <Banner />
      <Category />
      <Products />
      <AboutSection />
      <Contact />
    </div>
  )
}

export default Home
