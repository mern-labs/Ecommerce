import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import AboutImage from "../assets/AboutUs.png";
import logo from "../assets/Logo_Fonts.png";

const About = () => {
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [visibleSections, setVisibleSections] = useState(new Set());
  const observerRef = useRef(null);

  // Intersection Observer for scroll animations
  useEffect(() => {
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisibleSections(prev => new Set([...prev, entry.target.id]));
          }
        });
      },
      { threshold: 0.1 }
    );

    const sections = document.querySelectorAll('[data-animate]');
    sections.forEach((section) => {
      if (observerRef.current) {
        observerRef.current.observe(section);
      }
    });

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, []);

  const handleSubscribe = (e) => {
    e.preventDefault();
    console.log('Subscribed with email:', email);
    setIsSubscribed(true);
    
    setTimeout(() => {
      setIsSubscribed(false);
      setEmail('');
    }, 3000);
  };

  // Navigation sections data for footer
  const navigationSections = [
    {
      title: 'Shop',
      gradient: 'from-pink-500 to-purple-500',
      links: [
        { name: 'Festive', path: '/festive' },
        { name: 'Wedding', path: '/wedding' },
        { name: 'Party', path: '/party' },
        { name: 'Video Call Shopping', path: '/video-call-shopping' }
      ]
    },
    {
      title: 'Get to Know Us',
      gradient: 'from-blue-500 to-purple-500',
      links: [
        { name: 'FAQ', path: '/faq' },
        { name: 'Blog', path: '/blog' },
        { name: 'Awards', path: '/awards' },
        { name: 'Media', path: '/media' },
        { name: 'Stores', path: '/stores' },
        { name: 'Virtual Tour', path: '/virtual-tour' }
      ]
    },
    {
      title: 'User Policy',
      gradient: 'from-purple-500 to-pink-500',
      links: [
        { name: 'Privacy Policy', path: '/privacy-policy' },
        { name: 'Terms & Conditions', path: '/terms-conditions' },
        { name: 'Disclaimer', path: '/disclaimer' },
        { name: 'Return Policy', path: '/return-policy' },
        { name: 'Shipping Policy', path: '/shipping-policy' }
      ]
    }
  ];

  // Social media links
  const socialLinks = [
    {
      name: 'Facebook',
      url: 'https://facebook.com',
      gradient: 'from-blue-600 to-blue-400',
      icon: (
        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
      )
    },
    {
      name: 'Instagram',
      url: 'https://instagram.com',
      gradient: 'from-purple-600 via-pink-600 to-orange-500',
      icon: (
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
      )
    },
    {
      name: 'YouTube',
      url: 'https://youtube.com',
      gradient: 'from-red-600 to-red-400',
      icon: (
        <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
      )
    }
  ];

  // Payment methods
  const paymentMethods = [
    {
      name: 'Visa',
      gradient: 'from-blue-500 to-purple-500',
      content: (
        <svg className="h-5 sm:h-6 md:h-7 w-auto" viewBox="0 0 48 32" fill="none">
          <rect width="48" height="32" rx="4" fill="white"/>
          <path d="M20.5 11.5L18.5 20.5H16L18 11.5H20.5Z" fill="#1A1F71"/>
          <path d="M27.5 11.7L25.2 17.8L24.9 16.2L23.8 12.2C23.7 11.8 23.3 11.5 22.9 11.5H18.7L18.6 11.7C19.5 11.9 20.3 12.2 21.1 12.6L23.6 20.5H26.2L30.1 11.5H27.5V11.7Z" fill="#1A1F71"/>
        </svg>
      )
    },
    {
      name: 'Mastercard',
      gradient: 'from-orange-500 to-red-500',
      content: (
        <svg className="h-5 sm:h-6 md:h-7 w-auto" viewBox="0 0 48 32" fill="none">
          <rect width="48" height="32" rx="4" fill="white"/>
          <circle cx="18" cy="16" r="7" fill="#EB001B"/>
          <circle cx="30" cy="16" r="7" fill="#F79E1B"/>
          <path d="M24 11C22.3 12.3 21.2 14.1 21.2 16C21.2 17.9 22.3 19.7 24 21C25.7 19.7 26.8 17.9 26.8 16C26.8 14.1 25.7 12.3 24 11Z" fill="#FF5F00"/>
        </svg>
      )
    },
    {
      name: 'UPI',
      gradient: 'from-orange-500 to-yellow-500',
      content: (
        <span className="font-black text-orange-600 text-lg sm:text-xl md:text-2xl tracking-wider">UPI</span>
      )
    }
  ];

  return (
    <>
      <div className="w-full bg-white relative overflow-hidden">
        {/* Hero Section */}
        <section
          id="hero"
          data-animate
          className={`relative py-6 sm:py-8 md:py-10 lg:py-12 overflow-hidden transition-all duration-1000 ${
            visibleSections.has('hero') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="max-w-4xl mx-auto text-center">
              <div className="inline-block mb-4 sm:mb-6 px-4 sm:px-6 py-1.5 sm:py-2 bg-linear-to-r from-purple-100 via-pink-100 to-rose-100 rounded-full border border-pink-200/50">
                <span className="text-xs sm:text-sm font-bold bg-linear-to-r from-purple-600 via-pink-600 to-rose-600 bg-clip-text text-transparent">
                  Celebrating 50+ Years of Excellence
                </span>
              </div>

              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-black mb-4 sm:mb-6 leading-tight px-2">
                <span className="inline-block bg-linear-to-r from-purple-600 via-pink-600 to-rose-600 bg-clip-text text-transparent animate-gradient-x">
                  Weaving Dreams,
                </span>
                <br />
                <span className="inline-block bg-linear-to-r from-rose-600 via-orange-600 to-amber-600 bg-clip-text text-transparent animate-gradient-x" style={{ animationDelay: '0.2s' }}>
                  Preserving Heritage
                </span>
              </h1>

              <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-gray-700 mb-6 sm:mb-8 md:mb-10 leading-relaxed max-w-3xl mx-auto px-4">
                Where every thread tells a story of tradition, craftsmanship, and the timeless elegance of authentic handwoven sarees from the heart of India.
              </p>

              {/* Trust Indicators */}
              <div className="flex flex-wrap justify-center items-center gap-4 sm:gap-6 md:gap-8 text-xs sm:text-sm text-gray-600 px-4">
                <div className="flex items-center gap-2">
                  <svg className="w-4 h-4 sm:w-5 sm:h-5 text-green-500 shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className="font-semibold whitespace-nowrap">100% Authentic</span>
                </div>
                <div className="flex items-center gap-2">
                  <svg className="w-4 h-4 sm:w-5 sm:h-5 text-blue-500 shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z" />
                  </svg>
                  <span className="font-semibold whitespace-nowrap">200+ Artisans</span>
                </div>
                <div className="flex items-center gap-2">
                  <svg className="w-4 h-4 sm:w-5 sm:h-5 text-purple-500 shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
                  </svg>
                  <span className="font-semibold whitespace-nowrap">5000+ Customers</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Story Section */}
        <section
          id="story"
          data-animate
          className={`py-12 sm:py-16 md:py-20 lg:py-32 relative transition-all duration-1000 ${
            visibleSections.has('story') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-8 sm:gap-12 md:gap-16 items-center">
              <div className="relative group order-2 lg:order-1">
                {/* Decorative elements - hidden on mobile for cleaner look */}
                <div className="hidden md:block absolute -top-8 -right-8 w-24 h-24 lg:w-32 lg:h-32 border-4 border-pink-300/30 rounded-full" />
                <div className="hidden md:block absolute -bottom-8 -left-8 w-20 h-20 lg:w-24 lg:h-24 border-4 border-purple-300/30 rounded-full" />

                <div className="relative rounded-2xl sm:rounded-3xl overflow-hidden transform group-hover:scale-[1.02] transition-all duration-700">
                  <div className="absolute inset-0 bg-linear-to-tr from-purple-500/10 to-pink-500/10 group-hover:opacity-0 transition-opacity duration-700" />
                  <img
                    src={AboutImage}
                    alt="Our Story - Traditional Saree Weaving"
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />

                  {/* Overlay badge */}
                  <div className="absolute bottom-4 left-4 sm:bottom-6 sm:left-6 bg-white/95 px-4 py-2 sm:px-6 sm:py-3 rounded-xl sm:rounded-2xl">
                    <div className="flex items-center gap-2 sm:gap-3">
                      <div className="w-10 h-10 sm:w-12 sm:h-12 bg-linear-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center shrink-0">
                        <span className="text-xl sm:text-2xl">🎨</span>
                      </div>
                      <div>
                        <p className="text-[10px] sm:text-xs text-gray-500 font-semibold">Since 1975</p>
                        <p className="text-xs sm:text-sm font-bold text-gray-800">50+ Years Legacy</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="order-1 lg:order-2">
                <div className="inline-block mb-3 sm:mb-4 px-3 sm:px-4 py-1 sm:py-1.5 bg-linear-to-r from-purple-100 to-pink-100 rounded-full">
                  <span className="text-[10px] sm:text-xs font-bold text-purple-600 uppercase tracking-wider">Our Journey</span>
                </div>

                <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black mb-4 sm:mb-6 bg-linear-to-r from-purple-600 via-pink-600 to-rose-600 bg-clip-text text-transparent leading-tight">
                  A Legacy Woven <br className="hidden sm:inline" />
                  With Love & Tradition
                </h2>

                <div className="w-16 sm:w-20 md:w-24 h-1 sm:h-1.5 bg-linear-to-r from-purple-500 via-pink-500 to-rose-500 rounded-full mb-4 sm:mb-6 md:mb-8" />

                <div className="space-y-4 sm:space-y-6 text-sm sm:text-base md:text-lg text-gray-700">
                  <p className="leading-relaxed relative pl-4 sm:pl-6 border-l-2 sm:border-l-4 border-purple-200">
                    Born from a deep love for Indian textiles and a desire to preserve the dying art of traditional weaving, our journey began in the heart of India's weaving villages.
                  </p>
                  <p className="leading-relaxed relative pl-4 sm:pl-6 border-l-2 sm:border-l-4 border-pink-200">
                    We witnessed the incredible skill of master weavers creating magic on their looms—each saree a testament to generations of knowledge passed down through families. Yet, we also saw how modernization threatened these ancient crafts.
                  </p>
                  <p className="leading-relaxed relative pl-4 sm:pl-6 border-l-2 sm:border-l-4 border-rose-200">
                    That's when we decided to build a bridge—connecting conscious customers with authentic artisans, ensuring fair wages, preserving cultural heritage, and making exquisite handcrafted sarees accessible to women who appreciate the beauty of slow fashion.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Mission & Vision Section */}
        <section
          id="mission-vision"
          data-animate
          className={`py-12 sm:py-16 md:py-20 lg:py-32 relative transition-all duration-1000 ${
            visibleSections.has('mission-vision') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="max-w-6xl mx-auto">
              <div className="grid md:grid-cols-2 gap-6 sm:gap-8 md:gap-10">
                {/* Mission */}
                <div className="group relative">
                  <div className="relative bg-white rounded-2xl sm:rounded-3xl p-6 sm:p-8 md:p-10 lg:p-12 border-t-4 sm:border-t-8 border-cyan-600 transition-all duration-500 transform hover:-translate-y-2 shadow-lg">
                    <div className="text-5xl sm:text-6xl md:text-7xl mb-4 sm:mb-6 transform group-hover:scale-110 group-hover:rotate-12 transition-all duration-500" role="img" aria-label="Mission">🎯</div>
                    <h3 className="text-2xl sm:text-3xl lg:text-4xl font-black mb-4 sm:mb-6 bg-linear-to-r from-cyan-600 to-blue-600 bg-clip-text text-transparent">
                      Our Mission
                    </h3>
                    <p className="text-sm sm:text-base md:text-lg text-gray-700 leading-relaxed">
                      To preserve and celebrate India's rich textile heritage by empowering artisan communities, promoting sustainable fashion, and connecting conscious customers with authentic handcrafted sarees that carry centuries of tradition and artistry.
                    </p>
                  </div>
                </div>

                {/* Vision */}
                <div className="group relative">
                  <div className="relative bg-white rounded-2xl sm:rounded-3xl p-6 sm:p-8 md:p-10 lg:p-12 border-t-4 sm:border-t-8 border-pink-500 transition-all duration-500 transform hover:-translate-y-2 shadow-lg">
                    <div className="text-5xl sm:text-6xl md:text-7xl mb-4 sm:mb-6 transform group-hover:scale-110 group-hover:rotate-12 transition-all duration-500" role="img" aria-label="Vision">👁️</div>
                    <h3 className="text-2xl sm:text-3xl lg:text-4xl font-black mb-4 sm:mb-6 bg-linear-to-r from-pink-600 to-rose-600 bg-clip-text text-transparent">
                      Our Vision
                    </h3>
                    <p className="text-sm sm:text-base md:text-lg text-gray-700 leading-relaxed">
                      To become the most trusted platform for authentic handloom sarees, where every purchase supports artisan livelihoods, keeps traditional crafts alive for future generations, and brings the timeless beauty of Indian textiles to women worldwide.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Values Section */}
        <section
          id="values"
          data-animate
          className={`py-12 sm:py-16 md:py-20 lg:py-32 bg-gray-50 relative transition-all duration-1000 ${
            visibleSections.has('values') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-10 sm:mb-12 md:mb-16">
                <div className="inline-block mb-3 sm:mb-4 px-3 sm:px-4 py-1 sm:py-1.5 bg-white rounded-full">
                  <span className="text-[10px] sm:text-xs font-bold bg-linear-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent uppercase tracking-wider">
                    What Drives Us
                  </span>
                </div>

                <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black mb-4 sm:mb-6 text-gray-900 px-4">
                  Our Core Values
                </h2>

                <div className="w-20 sm:w-24 md:w-32 h-1 sm:h-1.5 bg-linear-to-r from-purple-500 via-pink-500 to-rose-500 rounded-full mx-auto" />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 md:gap-8">
                {[
                  {
                    emoji: "✨",
                    title: "Authenticity",
                    description: "Every saree is carefully curated to preserve rich heritage and craftsmanship",
                    label: "Authenticity",
                    gradient: "from-purple-500 to-pink-500",
                    color: "purple"
                  },
                  {
                    emoji: "🎨",
                    title: "Artistry",
                    description: "Celebrating artisans whose skilled hands keep ancient techniques alive",
                    label: "Artistry",
                    gradient: "from-pink-500 to-rose-500",
                    color: "pink"
                  },
                  {
                    emoji: "💝",
                    title: "Quality",
                    description: "Finest silks and intricate embroidery meeting highest standards",
                    label: "Quality",
                    gradient: "from-rose-500 to-red-500",
                    color: "rose"
                  },
                  {
                    emoji: "🌟",
                    title: "Heritage",
                    description: "Connecting generations through timeless elegance and tradition",
                    label: "Heritage",
                    gradient: "from-orange-500 to-amber-500",
                    color: "orange"
                  }
                ].map((value, index) => (
                  <div
                    key={index}
                    className="group relative"
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <div className="relative bg-white p-5 sm:p-6 md:p-8 rounded-2xl sm:rounded-3xl transition-all duration-500 transform hover:-translate-y-3 text-center h-full shadow-md">
                      <div className="text-5xl sm:text-6xl md:text-7xl mb-4 sm:mb-6 transform group-hover:scale-125 group-hover:rotate-12 transition-all duration-500" role="img" aria-label={value.label}>
                        {value.emoji}
                      </div>

                      <div className={`w-12 sm:w-14 md:w-16 h-1 sm:h-1.5 bg-linear-to-r ${value.gradient} rounded-full mx-auto mb-3 sm:mb-4`} />

                      <h3 className={`text-lg sm:text-xl md:text-2xl font-black text-${value.color}-600 mb-3 sm:mb-4`}>
                        {value.title}
                      </h3>

                      <p className="text-xs sm:text-sm md:text-base text-gray-600 leading-relaxed">
                        {value.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section
          id="stats"
          data-animate
          className={`py-12 sm:py-16 md:py-20 lg:py-32 relative transition-all duration-1000 ${
            visibleSections.has('stats') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="max-w-5xl mx-auto">
              <div className="text-center mb-8 sm:mb-10 md:mb-12">
                <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black mb-4 sm:mb-6 bg-linear-to-r from-purple-600 via-pink-600 to-rose-600 bg-clip-text text-transparent px-4">
                  Our Impact in Numbers
                </h2>

                <div className="w-20 sm:w-24 md:w-32 h-1 sm:h-1.5 bg-linear-to-r from-purple-500 via-pink-500 to-rose-500 rounded-full mx-auto mb-4 sm:mb-6" />

                <p className="text-base sm:text-lg md:text-xl text-gray-700 px-4">
                  Making a difference, one saree at a time
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
                {[
                  {
                    number: "200+",
                    title: "Artisan Partners",
                    description: "Supporting families across India",
                    icon: "👨‍👩‍👧‍👦",
                    gradient: "from-purple-500 to-pink-500"
                  },
                  {
                    number: "5000+",
                    title: "Happy Customers",
                    description: "Spreading joy worldwide",
                    icon: "😊",
                    gradient: "from-pink-500 to-rose-500"
                  },
                  {
                    number: "100%",
                    title: "Authentic Handcrafted",
                    description: "Every single piece verified",
                    icon: "✓",
                    gradient: "from-rose-500 to-orange-500"
                  }
                ].map((stat, index) => (
                  <div
                    key={index}
                    className="group relative"
                    style={{ animationDelay: `${index * 150}ms` }}
                  >
                    <div className="relative bg-white p-6 sm:p-8 md:p-10 rounded-2xl sm:rounded-3xl text-center transition-all duration-500 transform hover:-translate-y-2 shadow-md">
                      <div className="text-4xl sm:text-5xl mb-3 sm:mb-4 transform group-hover:scale-110 transition-all duration-300">
                        {stat.icon}
                      </div>

                      <div className={`text-4xl sm:text-5xl md:text-6xl font-black bg-linear-to-r ${stat.gradient} bg-clip-text text-transparent mb-2 sm:mb-3`}>
                        {stat.number}
                      </div>

                      <p className="text-base sm:text-lg md:text-xl text-gray-800 font-bold mb-1 sm:mb-2">{stat.title}</p>

                      <p className="text-xs sm:text-sm text-gray-600">
                        {stat.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Why Choose Us Section */}
        <section
          id="why-choose"
          data-animate
          className={`py-12 sm:py-16 md:py-20 lg:py-32 bg-gray-50 relative transition-all duration-1000 ${
            visibleSections.has('why-choose') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-10 sm:mb-12 md:mb-16">
                <div className="inline-block mb-3 sm:mb-4 px-3 sm:px-4 py-1 sm:py-1.5 bg-white rounded-full">
                  <span className="text-[10px] sm:text-xs font-bold bg-linear-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent uppercase tracking-wider">
                    The Kalamandir Difference
                  </span>
                </div>

                <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black mb-4 sm:mb-6 text-gray-900 px-4">
                  Why Choose Us
                </h2>

                <div className="w-20 sm:w-24 md:w-32 h-1 sm:h-1.5 bg-linear-to-r from-purple-500 via-pink-500 to-rose-500 rounded-full mx-auto" />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 md:gap-8">
                {[
                  {
                    emoji: "🏆",
                    title: "Premium Quality",
                    description: "Every saree is handpicked and quality-checked to ensure you receive only the finest pieces. We work directly with master weavers who have perfected their craft over generations.",
                    label: "Premium Quality",
                    gradient: "from-purple-500 to-pink-500"
                  },
                  {
                    emoji: "🌍",
                    title: "Ethical Sourcing",
                    description: "We work directly with artisans, ensuring fair wages and sustainable livelihoods. Your purchase directly impacts the lives of weaving families across India.",
                    label: "Ethical Sourcing",
                    gradient: "from-pink-500 to-rose-500"
                  },
                  {
                    emoji: "💎",
                    title: "Unique Designs",
                    description: "Exclusive collections you won't find anywhere else. Each piece tells its own story, crafted with traditional techniques passed down through generations.",
                    label: "Unique Designs",
                    gradient: "from-rose-500 to-red-500"
                  },
                  {
                    emoji: "🚚",
                    title: "Fast Delivery",
                    description: "Secure packaging and prompt delivery to bring these beautiful sarees to your doorstep. We ensure every piece reaches you in perfect condition.",
                    label: "Fast Delivery",
                    gradient: "from-orange-500 to-amber-500"
                  }
                ].map((feature, index) => (
                  <div
                    key={index}
                    className="group relative"
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <div className="relative bg-white p-5 sm:p-6 md:p-8 rounded-2xl sm:rounded-3xl transition-all duration-500 transform hover:-translate-y-2 shadow-md">
                      <div className="flex flex-col sm:flex-row items-start gap-4 sm:gap-6">
                        <div className="shrink-0">
                          <div className={`w-16 h-16 sm:w-18 sm:h-18 md:w-20 md:h-20 bg-linear-to-br ${feature.gradient} rounded-xl sm:rounded-2xl flex items-center justify-center transform group-hover:scale-110 group-hover:rotate-6 transition-all duration-500`}>
                            <span className="text-3xl sm:text-4xl" role="img" aria-label={feature.label}>{feature.emoji}</span>
                          </div>
                        </div>

                        <div className="flex-1">
                          <h3 className="text-xl sm:text-2xl font-black text-gray-800 mb-2 sm:mb-3">
                            {feature.title}
                          </h3>

                          <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                            {feature.description}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Sustainability Section */}
        <section
          id="sustainability"
          data-animate
          className={`py-12 sm:py-16 md:py-20 lg:py-32 relative transition-all duration-1000 ${
            visibleSections.has('sustainability') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-10 sm:mb-12 md:mb-16">
                <div className="inline-block mb-3 sm:mb-4 px-3 sm:px-4 py-1 sm:py-1.5 bg-linear-to-r from-green-100 to-emerald-100 rounded-full">
                  <span className="text-[10px] sm:text-xs font-bold text-green-600 uppercase tracking-wider">
                    🌱 Sustainable Fashion
                  </span>
                </div>

                <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black mb-4 sm:mb-6 bg-linear-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent px-4">
                  Our Commitment to <br className="hidden sm:inline" />
                  Mother Earth
                </h2>

                <div className="w-20 sm:w-24 md:w-32 h-1 sm:h-1.5 bg-linear-to-r from-green-500 to-emerald-500 rounded-full mx-auto mb-4 sm:mb-6" />

                <p className="text-base sm:text-lg md:text-xl text-gray-700 max-w-3xl mx-auto px-4">
                  We believe in creating beauty without harming our planet. Every step of our process is designed with sustainability in mind.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
                {[
                  {
                    icon: "🌿",
                    title: "Natural Dyes",
                    description: "We use plant-based and eco-friendly dyes that are safe for artisans and the environment.",
                    stats: "90% Natural"
                  },
                  {
                    icon: "♻️",
                    title: "Zero Waste",
                    description: "Every scrap of fabric is repurposed. Nothing goes to waste in our production process.",
                    stats: "100% Utilized"
                  },
                  {
                    icon: "🌍",
                    title: "Carbon Neutral",
                    description: "We offset our carbon footprint through tree planting initiatives across India.",
                    stats: "5000+ Trees"
                  }
                ].map((item, index) => (
                  <div
                    key={index}
                    className="group bg-white rounded-2xl sm:rounded-3xl transition-all duration-500 overflow-hidden transform hover:-translate-y-2 shadow-md"
                  >
                    <div className="h-1.5 sm:h-2 bg-linear-to-r from-green-500 to-emerald-500" />

                    <div className="p-5 sm:p-6 md:p-8 text-center">
                      <div className="text-5xl sm:text-6xl mb-4 sm:mb-6 transform group-hover:scale-110 transition-all duration-300">
                        {item.icon}
                      </div>

                      <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-3 sm:mb-4">
                        {item.title}
                      </h3>

                      <p className="text-sm sm:text-base text-gray-600 mb-4 sm:mb-6">
                        {item.description}
                      </p>

                      <div className="inline-block px-4 sm:px-6 py-1.5 sm:py-2 bg-linear-to-r from-green-500 to-emerald-500 rounded-full">
                        <span className="text-xs sm:text-sm font-bold text-white">{item.stats}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Commitment Section */}
        <section
          id="commitment"
          data-animate
          className={`py-12 sm:py-16 md:py-20 lg:py-32 bg-gray-50 relative transition-all duration-1000 ${
            visibleSections.has('commitment') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black mb-6 sm:mb-8 bg-linear-to-r from-purple-600 via-pink-600 to-rose-600 bg-clip-text text-transparent px-4">
                Our Promise to You
              </h2>

              <div className="w-20 sm:w-24 md:w-32 h-1 sm:h-1.5 bg-linear-to-r from-purple-500 via-pink-500 to-rose-500 rounded-full mx-auto mb-6 sm:mb-8 md:mb-10" />

              <p className="text-base sm:text-lg md:text-xl text-gray-700 leading-relaxed mb-6 sm:mb-8 md:mb-10 px-4">
                We promise to bring you authentic, handcrafted sarees that honor tradition while embracing contemporary sensibilities. Every purchase supports artisan families, preserves cultural heritage, and promotes sustainable fashion practices.
              </p>

              <div className="relative group">
                <div className="relative bg-white rounded-2xl sm:rounded-3xl p-6 sm:p-8 md:p-10 lg:p-12 shadow-lg">
                  <div className="text-4xl sm:text-5xl mb-4 sm:mb-6">💝</div>
                  <p className="text-base sm:text-lg md:text-xl text-gray-700 leading-relaxed italic">
                    "Each thread woven into our sarees carries the dreams, skills, and heritage of master artisans. When you choose our sarees, you're not just buying fabric—you're preserving a living tradition and empowering communities."
                  </p>

                  <div className="mt-6 sm:mt-8 flex items-center justify-center gap-3 sm:gap-4 flex-wrap">
                    <div className="w-12 sm:w-16 h-0.5 sm:h-1 bg-linear-to-r from-purple-500 to-pink-500 rounded-full" />
                    <div className="text-gray-400 font-semibold text-xs sm:text-sm whitespace-nowrap">~ Team Kalamandir</div>
                    <div className="w-12 sm:w-16 h-0.5 sm:h-1 bg-linear-to-r from-pink-500 to-rose-500 rounded-full" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Animations CSS */}
        <style>{`
          @keyframes gradient-x {
            0%, 100% {
              background-position: 0% 50%;
            }
            50% {
              background-position: 100% 50%;
            }
          }

          .animate-gradient-x {
            background-size: 200% 200%;
            animation: gradient-x 3s ease infinite;
          }
        `}</style>
      </div>
    </>
  );
};

export default About;