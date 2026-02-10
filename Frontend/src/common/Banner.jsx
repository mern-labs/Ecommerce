import React, { useEffect, useState, useMemo } from "react";
import { useData } from "../context/Usecontext";
import apiInstance from "../interceptor/interceptor";

const Banner = () => {
  const { banner } = useData();
  const [currenIndex, setCurrenIndex] = useState(0);

  // Auto slide
  useEffect(() => {
    if (!banner?.length) return;

    const interval = setInterval(() => {
      setCurrenIndex((prev) =>
        prev === banner.length - 1 ? 0 : prev + 1
      );
    }, 5000);

    return () => clearInterval(interval);
  }, [banner]);

  // Preload images
  useEffect(() => {
    if (!banner?.length) return;

    banner.forEach((b) => {
      const img = new Image();
      img.src = `${b.image}`;
    });
  }, [banner]);

  const currentBannerImage = useMemo(() => {
    if (!banner.length) return null;
    return `${banner[currenIndex].image}`;
  }, [banner, currenIndex]);

  return (
    <>
      {/* Banner */}
      <div className="w-full md:px-5 mt-2">
        <div className="w-full overflow-hidden md:rounded-xl bg-gray-100 h-50 sm:h-65 md:h-95 lg:h-147.5 mt-2">
          {currentBannerImage && (
            <img
              key={currenIndex}
              src={currentBannerImage}
              alt="banner"
              className="w-full h-full object-cover transition-all duration-700"
            />
          )}
        </div>
      </div>

      {/* Marquee */}
      <div className="md:px-5">
        <div className="w-full bg-linear-to-r from-pink-500 to-red-500 py-2 overflow-hidden mt-3 md:rounded-lg">
          <marquee
            behavior="scroll"
            direction="left"
            scrollamount="6"
            className="text-white font-semibold text-sm sm:text-base"
          >
            🎉 Festive Sale Live! | 🚚 Free Shipping Above ₹999 | 💖 New Saree Collection | 🔒 Secure Payments
          </marquee>
        </div>
      </div>
    </>
  );
};

export default Banner;