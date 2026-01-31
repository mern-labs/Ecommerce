import React from "react";
import { Link } from "react-router-dom";
import About from "../assets/AboutUs.png";

const AboutSection = () => {
  return (
    <section className="py-16 lg:py-24 bg-gradient-to-br from-purple-50 via-pink-50 to-fuchsia-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <h2
              className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 text-gray-900"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              About Us
            </h2>
            <div className="w-32 h-1 bg-gradient-to-r from-pink-500 to-rose-500 rounded-full mx-auto"></div>
          </div>

          {/* Content Grid - Image Left, Content Right */}
          <div className="grid lg:grid-cols-2 gap-10 items-center mb-10">
            
            {/* Left: Image */}
            <div className="relative">
              <div className="rounded-2xl overflow-hidden shadow-2xl transform hover:scale-105 transition-transform duration-500">
                <img 
                  src={About} 
                  alt="About Us - Traditional Saree Weaving" 
                  className="w-full h-full object-cover"
                />
              </div>
              {/* Optional decorative elements */}
              <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-gradient-to-br from-cyan-400 to-teal-400 rounded-full opacity-20 blur-2xl -z-10"></div>
              <div className="absolute -top-4 -left-4 w-24 h-24 bg-gradient-to-br from-pink-400 to-rose-400 rounded-full opacity-20 blur-2xl -z-10"></div>
            </div>

            {/* Right: Text Content */}
            <div>
              <h3
                className="text-2xl sm:text-3xl font-bold text-gray-800 mb-4"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                Weaving Dreams, Creating Memories
              </h3>
              <p
                className="text-lg text-gray-700 leading-relaxed mb-4"
                style={{ fontFamily: "'Crimson Text', serif" }}
              >
                Born from a deep love for Indian textiles, we preserve the art
                of traditional weaving by connecting conscious customers with
                authentic artisans.
              </p>
              <p
                className="text-lg text-gray-700 leading-relaxed mb-6"
                style={{ fontFamily: "'Crimson Text', serif" }}
              >
                Every saree tells a story of heritage, craftsmanship, and the
                skilled hands that transform threads into masterpieces. We
                ensure fair wages and sustainable practices while bringing you
                exquisite handcrafted sarees.
              </p>

              {/* Stats Section */}
              <div className="grid grid-cols-3 gap-4 py-6 border-t border-gray-300">
                <div className="text-center">
                  <div
                    className="text-3xl font-bold text-cyan-600 mb-1"
                    style={{ fontFamily: "'Playfair Display', serif" }}
                  >
                    200+
                  </div>
                  <p className="text-xs text-gray-600 font-semibold">
                    Artisans
                  </p>
                </div>
                <div className="text-center">
                  <div
                    className="text-3xl font-bold text-cyan-600 mb-1"
                    style={{ fontFamily: "'Playfair Display', serif" }}
                  >
                    5000+
                  </div>
                  <p className="text-xs text-gray-600 font-semibold">
                    Customers
                  </p>
                </div>
                <div className="text-center">
                  <div
                    className="text-3xl font-bold text-cyan-600 mb-1"
                    style={{ fontFamily: "'Playfair Display', serif" }}
                  >
                    100%
                  </div>
                  <p className="text-xs text-gray-600 font-semibold">
                    Authentic
                  </p>
                </div>
              </div>
            </div>

          </div>

          {/* See More Button */}
          <div className="text-center">
            <Link
              to="/about"
              className="inline-flex items-center gap-2 px-8 py-4 bg-cyan-600 hover:bg-cyan-700 text-white font-semibold rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
            >
              <span>See More</span>
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 8l4 4m0 0l-4 4m4-4H3"
                />
              </svg>
            </Link>
          </div>
        </div>
      </div>

      {/* Google Fonts Import */}
      <style jsx>{`
        @import url("https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700;900&family=Crimson+Text:wght@400;600&display=swap");
      `}</style>
    </section>
  );
};

export default AboutSection;