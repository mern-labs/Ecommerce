import React, { useEffect, useState } from "react";
import apiInstance, { getBanner } from "../interceptor/interceptor";

const Banner = () => {
  const [banner, setBanner] = useState([]);
  const [currenIndex, setCurrenIndex] = useState(0);

  const baseURL = apiInstance.defaults.baseURL;

  useEffect(() => {
    const getBanners = async () => {
      try {
        const res = await getBanner();
        setBanner(res.data.banners);
      } catch (error) {
        console.log(error.message);
      }
    };
    getBanners();
  }, []);

  useEffect(() => {
    if (banner.length === 0) return;

    const interval = setInterval(() => {
      setCurrenIndex((prev) => (prev === banner.length - 1 ? 0 : prev + 1));
    }, 5000);

    return () => clearInterval(interval);
  }, [banner]);

  return (
    <>
      {/* Banner Section */}
      <div
        className="w-full overflow-hidden 
        h-50 
        sm:h-65 
        md:h-95 
        lg:h-147.5 
        mt-2 px-5"
      >
        {banner.length > 0 && (
          <img
            key={currenIndex}
            src={`${baseURL}/uploads/banner/${banner[currenIndex].image}`}
            className="w-full h-full object-cover object-center transition-opacity duration-700"
            alt="banner"
          />
        )}
      </div>

      {/* Marquee Section (Banner Downside) */}
      <div className="px-5 p-2">
        <div className="w-full bg-linear-to-r from-pink-500 to-red-500 py-2 overflow-hidden mt-3">
          <marquee
            behavior="scroll"
            direction="left"
            scrollamount="6"
            loop="infinite"
            className="text-white font-semibold text-sm sm:text-base tracking-wide"
          >
            🎉 Festive Sale Live! &nbsp; | &nbsp; 🚚 Free Shipping on Orders
            Above ₹999 &nbsp; | &nbsp; 💖 New Saree Collections Available Now
            &nbsp; | &nbsp; 🔒 Secure Payments & Easy Returns
          </marquee>
        </div>
      </div>
    </>
  );
};

export default Banner;
