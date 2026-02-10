import React from "react";
import { Link } from "react-router-dom";
import About from "../assets/AboutUs.png";

const AboutSection = () => {
  return (
    <section className="relative py-20 lg:py-32 overflow-hidden">


      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16 lg:mb-20">
            <div className="inline-block mb-4">
              <span className="text-sm font-semibold tracking-[0.3em] text-cyan-600 uppercase opacity-80">
                Our Story
              </span>
            </div>
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 text-gray-900 leading-tight">
              About Us
            </h2>
            <div className="flex items-center justify-center gap-2 mb-4">
              <div className="w-16 h-0.5 bg-linear-to-r from-transparent to-pink-400 rounded-full"></div>
              <div className="w-3 h-3 rotate-45 bg-linear-to-br from-pink-500 to-rose-500"></div>
              <div className="w-40 h-1 bg-linear-to-r from-pink-500 via-rose-500 to-fuchsia-500 rounded-full"></div>
              <div className="w-3 h-3 rotate-45 bg-linear-to-br from-pink-500 to-rose-500"></div>
              <div className="w-16 h-0.5 bg-linear-to-l from-transparent to-pink-400 rounded-full"></div>
            </div>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto leading-relaxed">
              Celebrating heritage, empowering artisans, and crafting timeless elegance
            </p>
          </div>

          {/* Content Grid - Image Left, Content Right */}
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center mb-16">
            
            {/* Left: Image */}
            <div className="relative group">
              
              <div className="relative rounded-3xl overflow-hidden shadow-2xl transform group-hover:scale-[1.02] transition-all duration-700">
                {/* Image overlay gradient */}
                <div className="absolute inset-0 bg-linear-to-t from-gray-900/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10"></div>
                
                <img 
                  src={About} 
                  alt="About Us - Traditional Saree Weaving" 
                  className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-1000"
                />
                
                {/* Corner accent */}
                <div className="absolute top-0 right-0 w-24 h-24 bg-linear-to-br from-white/40 to-transparent opacity-60"></div>
              </div>

            </div>

            {/* Right: Text Content */}
            <div className="space-y-6">
              <h3 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-6 leading-tight">
                Weaving Dreams,{" "}
                <span className="bg-linear-to-r from-cyan-600 to-teal-600 bg-clip-text text-transparent">
                  Creating Memories
                </span>
              </h3>
              
              <p className="text-lg sm:text-xl text-gray-700 leading-relaxed">
                Born from a deep love for Indian textiles, we preserve the art
                of traditional weaving by connecting conscious customers with
                authentic artisans.
              </p>
              
              <p className="text-lg sm:text-xl text-gray-700 leading-relaxed">
                Every saree tells a story of heritage, craftsmanship, and the
                skilled hands that transform threads into masterpieces. We
                ensure fair wages and sustainable practices while bringing you
                exquisite handcrafted sarees.
              </p>

              {/* Values badges */}
              <div className="flex flex-wrap gap-3 pt-4">
                <span className="px-4 py-2 bg-white/80 backdrop-blur-sm border border-cyan-200 rounded-full text-sm font-medium text-cyan-700 shadow-sm hover:shadow-md transition-shadow">
                  🌿 Sustainable
                </span>
                <span className="px-4 py-2 bg-white/80 backdrop-blur-sm border border-pink-200 rounded-full text-sm font-medium text-pink-700 shadow-sm hover:shadow-md transition-shadow">
                  ✨ Handcrafted
                </span>
                <span className="px-4 py-2 bg-white/80 backdrop-blur-sm border border-purple-200 rounded-full text-sm font-medium text-purple-700 shadow-sm hover:shadow-md transition-shadow">
                  ❤️ Fair Trade
                </span>
              </div>

              {/* Stats Section */}
              <div className="grid grid-cols-3 gap-6 pt-8 mt-8 border-t-2 border-gray-200/50">
                <div className="text-center group cursor-default">
                  <div className="text-4xl lg:text-5xl font-bold bg-linear-to-br from-cyan-600 to-teal-600 bg-clip-text text-transparent mb-2 group-hover:scale-110 transition-transform duration-300">
                    200+
                  </div>
                  <p className="text-sm text-gray-600 font-semibold tracking-wide">
                    Artisans
                  </p>
                  <div className="w-12 h-0.5 bg-linear-to-r from-transparent via-cyan-400 to-transparent mx-auto mt-2 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                </div>
                <div className="text-center group cursor-default">
                  <div className="text-4xl lg:text-5xl font-bold bg-linear-to-br from-pink-600 to-rose-600 bg-clip-text text-transparent mb-2 group-hover:scale-110 transition-transform duration-300">
                    5000+
                  </div>
                  <p className="text-sm text-gray-600 font-semibold tracking-wide">
                    Customers
                  </p>
                  <div className="w-12 h-0.5 bg-linear-to-r from-transparent via-pink-400 to-transparent mx-auto mt-2 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                </div>
                <div className="text-center group cursor-default">
                  <div className="text-4xl lg:text-5xl font-bold bg-linear-to-br from-purple-600 to-fuchsia-600 bg-clip-text text-transparent mb-2 group-hover:scale-110 transition-transform duration-300">
                    100%
                  </div>
                  <p className="text-sm text-gray-600 font-semibold tracking-wide">
                    Authentic
                  </p>
                  <div className="w-12 h-0.5 bg-linear-to-r from-transparent via-purple-400 to-transparent mx-auto mt-2 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                </div>
              </div>
            </div>

          </div>

          {/* See More Button */}
          <div className="text-center">
            <Link
              to="/about"
              className="group inline-flex items-center gap-3 px-10 py-5 bg-linear-to-r from-cyan-600 to-teal-600 hover:from-cyan-700 hover:to-teal-700 text-white font-semibold rounded-full shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:scale-105 hover:-translate-y-1"
            >
              <span className="text-lg">Discover Our Journey</span>
              <svg
                className="w-5 h-5 transform group-hover:translate-x-2 transition-transform duration-300"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2.5}
                  d="M17 8l4 4m0 0l-4 4m4-4H3"
                />
              </svg>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;