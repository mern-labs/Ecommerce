import React from 'react'
import Banner from '../common/Banner'
import Navbar from '../common/Navbar'
import Products from './Products'
import Category from '../layouts/Category'
import Footer from './Footer'
<<<<<<< HEAD
import AboutSection from './AboutSection'
=======
import Checkout from './Checkout'
>>>>>>> 9384b0bbe7ba30868f09db9702b67c6ab06fe129

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