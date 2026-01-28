// import React from 'react'
// import { useState } from 'react'
// import axios from "axios"
// import { useEffect } from 'react'

// const Banner = () => {
//   const [banner, setBanner] = useState([])

//   useEffect(() => {
//     const getBanner = async () => {
//       try {
//         const res = await axios.get("http://localhost:3000/api/banners")
//         setBanner(res.data.banner)
//       } catch (error) {
//         console.log(error.message);
//       }
//     }

//     getBanner()
//   }, [])
//   return (
//     <div>
//       {banner.map((items,index)=>{
//         return <div key={index}>
//           <img src={items} alt="" />
//         </div>
//       })}
//     </div>
//   )
// }

// export default Banner