import React, { useEffect, useState } from 'react'
import Navbar from '../common/Navbar'
import apiInstance, { getBanner } from '../interceptor/interceptor'

const Banner = () => {
  const [banner, setBanner] = useState([])
  const [currenIndex, setCurrenIndex] = useState(0)

  const baseURL = apiInstance.defaults.baseURL

  useEffect(() => {
    const getBanners = async () => {
      try {
        const res = await getBanner()
        setBanner(res.data.banners)
      } catch (error) {
        console.log(error.message)
      }
    }
    getBanners()
  }, [])

  useEffect(() => {
    if (banner.length === 0) return

    const interval = setInterval(() => {
      setCurrenIndex((prev) =>
        prev === banner.length - 1 ? 0 : prev + 1
      )
    }, 5000)

    return () => clearInterval(interval)
  }, [banner])

  return (
    <div className="w-full overflow-hidden 
  h-[200px] 
  sm:h-[260px] 
  md:h-[380px] 
  lg:h-[590px]">

      {banner.length > 0 && (
        <img
          key={currenIndex}
          src={`${baseURL}/uploads/banner/${banner[currenIndex].image}`}
          className="w-full h-full object-cover object-center transition-opacity duration-700"
          alt="banner"
        />
      )}
    </div>

  )
}

export default Banner
