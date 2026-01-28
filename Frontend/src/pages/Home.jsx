import React, { useEffect, useState } from 'react'
import Navbar from '../common/Navbar'
import apiInstance, { getBanner } from '../interceptor/interceptor'

const Home = () => {

  const [banner, setBanner] = useState([])

  const baseUrl = apiInstance.defaults.baseURL

  useEffect(() => {

    const getBanners = async () => {
      try {
        const res = await getBanner()
        setBanner(res.data.banners)
        console.log(res.data.banners);

      } catch (error) {
        console.log(error.message);
      }
    }

    getBanners()
  }, [])

  console.log("Banner", banner);

  return (
    <div className=''>
      <h1>Hello</h1>

      {banner.map((items) => {
        return <div key={items._id}>
          <img src={`${baseUrl}/uploads/banner/${items.image}`} alt="banner" />
        </div>
      })}
    </div>
  )
}

export default Home