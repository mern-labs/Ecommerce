import React, { useEffect, useState } from 'react'
import Navbar from '../common/Navbar'
import { getBanner } from '../interceptor/interceptor'

const Home = () => {

  const [banner, setBanner] = useState([])

  useEffect(()=>{

    const getBanners=async()=>{
      try {
        const res=await getBanner()
        setBanner(res.data.banner)
      } catch (error) {
        console.log(error.message); 
      }
    }
    getBanners()
  },[])
  return (
    <div className=''>
      <h1>Hello</h1>

      {banner.map((image,index)=>{
        return <div key={index}>
          <img src={image} alt="" />
        </div>
      })}
    </div>
  )
}

export default Home