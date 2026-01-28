import React, { useEffect, useState } from 'react'
import Navbar from '../common/Navbar'
import apiInstance, { getBanner } from '../interceptor/interceptor'

const Banner = () => {

  const [banner, setBanner] = useState([])

  const baseURL = apiInstance.defaults.baseURL

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
  return (
    <div className='w-full'>
      {banner?.length > 0 &&
        banner.map((items) => (
          <div key={items._id}>
            <img
              src={`${baseURL}/uploads/banner/${items.image}` } className='w-full'
              alt="banner"
            />
          </div>
        ))}

    </div>
  )
}

export default Banner