import { useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Footer from './Footer';
import { createMessage } from '../interceptor/interceptor';
import ContactBanner from '../assets/ContactBanner.jpg';

const Contact = () => {
  // Form state management
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });

  // UI state management
  const [uiState, setUiState] = useState({
    focusedField: null,
    isSubmitting: false
  });

  const [errors, setErrors] = useState({});

  // Validation patterns
  const VALIDATION_PATTERNS = {
    name: /^[a-zA-Z\s]{2,50}$/,
    email: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
    phone: /^[\d\s\-\+\()]{10,15}$/,
    message: /^.{10,500}$/
  };

  // Field validation messages
  const VALIDATION_MESSAGES = {
    name: {
      required: 'Name is required',
      invalid: 'Name should contain only letters and spaces (2-50 characters)'
    },
    email: {
      required: 'Email is required',
      invalid: 'Please enter a valid email address'
    },
    phone: {
      invalid: 'Please enter a valid phone number (10-15 digits)'
    },
    message: {
      required: 'Message is required',
      invalid: 'Message should be between 10 and 500 characters'
    }
  };

  /**
   * Handle input change
   */
  const handleChange = (e) => {
    const { name, value } = e.target;
    
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    // Clear error for this field if exists
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  /**
   * Validate individual field
   */
  const validateField = (name, value) => {
    const messages = VALIDATION_MESSAGES[name];
    const pattern = VALIDATION_PATTERNS[name];

    // Check if required field is empty
    if (name !== 'phone' && !value.trim()) {
      return messages.required;
    }

    // Check pattern validation
    if (value && !pattern.test(value)) {
      return messages.invalid;
    }

    return '';
  };

  /**
   * Validate entire form
   */
  const validateForm = () => {
    const newErrors = {};
    
    Object.keys(formData).forEach((key) => {
      // Skip phone if empty (optional field)
      if (key === 'phone' && !formData[key]) {
        return;
      }
      
      const error = validateField(key, formData[key]);
      if (error) {
        newErrors[key] = error;
      }
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  /**
   * Handle field blur (validation on blur)
   */
  const handleBlur = (e) => {
    const { name, value } = e.target;
    
    setUiState(prev => ({ ...prev, focusedField: null }));
    
    const error = validateField(name, value);
    if (error) {
      setErrors(prev => ({
        ...prev,
        [name]: error
      }));
    }
  };

  /**
   * Handle field focus
   */
  const handleFocus = (fieldName) => {
    setUiState(prev => ({ ...prev, focusedField: fieldName }));
  };

  /**
   * Handle form submission
   */
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validate form
    if (!validateForm()) {
      scrollToFirstError();
      return;
    }

    // Set submitting state
    setUiState(prev => ({ ...prev, isSubmitting: true }));

    try {
      await createMessage(formData);
      
      // Show success toast using react-toastify
      toast.success('Message sent successfully! We\'ll get back to you within 24 hours.', {
        position: "top-right",
        autoClose: 6000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "light",
      });
      
      // Reset form after brief delay
      setTimeout(() => {
        resetForm();
      }, 300);
      
    } catch (error) {
      console.error('Error sending message:', error);
      
    
      
      // Show error toast using react-toastify
      toast.error("After Login Contact With Us", {
        position: "top-right",
        autoClose: 7000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "light",
      });
      
    } finally {
      setUiState(prev => ({ ...prev, isSubmitting: false }));
    }
  };

  /**
   * Scroll to first error field
   */
  const scrollToFirstError = () => {
    const firstErrorField = Object.keys(errors)[0];
    if (firstErrorField) {
      document.getElementById(firstErrorField)?.scrollIntoView({ 
        behavior: 'smooth', 
        block: 'center' 
      });
    }
  };

  /**
   * Reset form to initial state
   */
  const resetForm = () => {
    setFormData({
      name: '',
      email: '',
      phone: '',
      message: ''
    });
    setErrors({});
    setUiState({
      focusedField: null,
      isSubmitting: false
    });
  };

  /**
   * Calculate form completion percentage
   */
  const getFormCompletionPercentage = () => {
    const requiredFields = ['name', 'email', 'message'];
    const filledFields = requiredFields.filter(field => 
      formData[field].trim() !== ''
    );
    return Math.round((filledFields.length / requiredFields.length) * 100);
  };

  /**
   * Get input field classes based on state
   */
  const getInputClasses = (fieldName) => {
    const baseClasses = `w-full px-4 py-3.5 bg-slate-50 border-2 rounded-xl text-slate-900 
                        placeholder-slate-400 font-medium focus:outline-none focus:bg-white 
                        transition-all duration-200`;
    
    if (errors[fieldName]) {
      return `${baseClasses} border-red-300 focus:border-red-500 focus:ring-4 focus:ring-red-100`;
    }
    
    if (uiState.focusedField === fieldName) {
      return `${baseClasses} border-pink-500 ring-4 ring-pink-100`;
    }
    
    return `${baseClasses} border-slate-200 hover:border-slate-300`;
  };

  /**
   * Check if field is valid and filled
   */
  const isFieldValid = (fieldName) => {
    return formData[fieldName] && 
           !errors[fieldName] && 
           uiState.focusedField !== fieldName;
  };

  const completionPercentage = getFormCompletionPercentage();

  return (
    <div className="min-h-screen bg-gray-50">
      
      {/* React Toastify Container */}
      <ToastContainer />

      {/* Banner Section with Image */}
      <div className="relative h-80 md:h-96 overflow-hidden">
        {/* Banner Image */}
        <img 
          src={ContactBanner} 
          alt="Contact Us" 
          className="w-full h-full object-cover"
        />
        
        {/* Overlay */}
        <div className="absolute inset-0 bg-linear-to-br from-slate-900/70 via-indigo-900/60 to-purple-900/50"></div>
        
        {/* Decorative Saree Icons */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {/* Top Left - Paisley Pattern */}
          <div className="absolute top-8 left-8 opacity-20">
            <svg width="60" height="60" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M50 10C30 10 20 25 20 40C20 55 30 65 40 70C35 75 30 85 35 95C55 95 70 80 70 60C70 40 60 25 50 10Z" fill="white" opacity="0.6"/>
              <circle cx="45" cy="50" r="8" fill="white" opacity="0.8"/>
              <circle cx="38" cy="42" r="4" fill="white" opacity="0.6"/>
              <circle cx="52" cy="45" r="3" fill="white" opacity="0.5"/>
            </svg>
          </div>
          
          {/* Top Right - Floral Motif */}
          <div className="absolute top-12 right-12 opacity-20">
            <svg width="50" height="50" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M50 20L60 40L80 50L60 60L50 80L40 60L20 50L40 40L50 20Z" fill="white" opacity="0.7"/>
              <circle cx="50" cy="50" r="12" fill="white" opacity="0.5"/>
              <circle cx="50" cy="30" r="6" fill="white" opacity="0.4"/>
              <circle cx="70" cy="50" r="6" fill="white" opacity="0.4"/>
              <circle cx="50" cy="70" r="6" fill="white" opacity="0.4"/>
              <circle cx="30" cy="50" r="6" fill="white" opacity="0.4"/>
            </svg>
          </div>
          
          {/* Bottom Left - Traditional Border Pattern */}
          <div className="absolute bottom-8 left-12 opacity-15">
            <svg width="70" height="40" viewBox="0 0 140 80" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect x="0" y="35" width="20" height="10" fill="white" opacity="0.6"/>
              <rect x="25" y="30" width="15" height="20" fill="white" opacity="0.7"/>
              <rect x="45" y="25" width="20" height="30" fill="white" opacity="0.8"/>
              <rect x="70" y="30" width="15" height="20" fill="white" opacity="0.7"/>
              <rect x="90" y="35" width="20" height="10" fill="white" opacity="0.6"/>
              <rect x="115" y="35" width="20" height="10" fill="white" opacity="0.5"/>
            </svg>
          </div>
          
          {/* Bottom Right - Peacock Feather Inspired */}
          <div className="absolute bottom-12 right-8 opacity-20">
            <svg width="55" height="55" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
              <ellipse cx="50" cy="30" rx="25" ry="20" fill="white" opacity="0.6"/>
              <ellipse cx="50" cy="30" rx="15" ry="12" fill="white" opacity="0.5"/>
              <circle cx="50" cy="30" r="6" fill="white" opacity="0.7"/>
              <rect x="48" y="45" width="4" height="45" rx="2" fill="white" opacity="0.6"/>
              <path d="M30 55L50 50L70 55" stroke="white" strokeWidth="2" opacity="0.5"/>
              <path d="M25 65L50 58L75 65" stroke="white" strokeWidth="2" opacity="0.4"/>
            </svg>
          </div>
          
          {/* Center Left - Mandala Pattern */}
          <div className="absolute top-1/2 left-4 -translate-y-1/2 opacity-10 hidden md:block">
            <svg width="45" height="45" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="50" cy="50" r="40" stroke="white" strokeWidth="2" opacity="0.6"/>
              <circle cx="50" cy="50" r="30" stroke="white" strokeWidth="2" opacity="0.5"/>
              <circle cx="50" cy="50" r="20" stroke="white" strokeWidth="2" opacity="0.7"/>
              <circle cx="50" cy="50" r="10" fill="white" opacity="0.6"/>
              <line x1="50" y1="10" x2="50" y2="90" stroke="white" strokeWidth="1" opacity="0.4"/>
              <line x1="10" y1="50" x2="90" y2="50" stroke="white" strokeWidth="1" opacity="0.4"/>
            </svg>
          </div>
          
          {/* Center Right - Lotus Pattern */}
          <div className="absolute top-1/2 right-4 -translate-y-1/2 opacity-15 hidden md:block">
            <svg width="50" height="50" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
              <ellipse cx="50" cy="70" rx="8" ry="15" fill="white" opacity="0.6"/>
              <ellipse cx="35" cy="65" rx="8" ry="18" transform="rotate(-20 35 65)" fill="white" opacity="0.5"/>
              <ellipse cx="65" cy="65" rx="8" ry="18" transform="rotate(20 65 65)" fill="white" opacity="0.5"/>
              <ellipse cx="25" cy="55" rx="7" ry="16" transform="rotate(-35 25 55)" fill="white" opacity="0.4"/>
              <ellipse cx="75" cy="55" rx="7" ry="16" transform="rotate(35 75 55)" fill="white" opacity="0.4"/>
              <circle cx="50" cy="75" r="5" fill="white" opacity="0.7"/>
            </svg>
          </div>
        </div>
        
        {/* Banner Content */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="max-w-7xl mx-auto px-4 text-center">
            {/* Decorative top accent */}
            <div className="flex items-center justify-center gap-3 mb-6">
              <div className="h-px w-12 bg-white/40"></div>
              <svg width="30" height="30" viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M30 10L35 25L50 30L35 35L30 50L25 35L10 30L25 25L30 10Z" fill="white" opacity="0.8"/>
                <circle cx="30" cy="30" r="6" fill="white" opacity="0.9"/>
              </svg>
              <div className="h-px w-12 bg-white/40"></div>
            </div>
            
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Contact Us
            </h1>
            <p className="text-lg text-white/90 max-w-2xl mx-auto">
              Have a question or want to work together? We'd love to hear from you.
            </p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="grid lg:grid-cols-12 gap-8">
          
          {/* Left Sidebar - Contact Info */}
          <div className="lg:col-span-4 space-y-6">
            
            {/* Contact Information Card */}
            <div className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden">
              <div className="bg-linear-to-br from-pink-600 to-rose-600 px-6 py-6">
                <h2 className="text-xl font-bold text-white mb-1">Get in Touch</h2>
                <p className="text-pink-100 text-sm">We're here to help</p>
              </div>
              
              <div className="p-6 space-y-4">
                {/* Email */}
                <a 
                  href="mailto:hello@company.com"
                  className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <div className="w-10 h-10 bg-pink-100 rounded-lg flex items-center justify-center shrink-0">
                    <svg className="w-5 h-5 text-pink-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div className="flex-1">
                    <p className="text-xs font-semibold text-gray-500 uppercase">Email</p>
                    <p className="text-gray-900 font-semibold text-sm">hello@company.com</p>
                  </div>
                </a>

                {/* Phone */}
                <a 
                  href="tel:+15551234567"
                  className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <div className="w-10 h-10 bg-rose-100 rounded-lg flex items-center justify-center shrink-0">
                    <svg className="w-5 h-5 text-rose-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                  </div>
                  <div className="flex-1">
                    <p className="text-xs font-semibold text-gray-500 uppercase">Phone</p>
                    <p className="text-gray-900 font-semibold text-sm">+1 (555) 123-4567</p>
                  </div>
                </a>

                {/* Office Hours */}
                <div className="flex items-center gap-3 p-3 rounded-lg bg-gray-50">
                  <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center shrink-0 shadow-sm">
                    <svg className="w-5 h-5 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div className="flex-1">
                    <p className="text-xs font-semibold text-gray-500 uppercase">Office Hours</p>
                    <p className="text-gray-900 font-semibold text-sm">Mon-Fri, 9AM-6PM EST</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Social Media Card */}
            <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Connect With Us</h3>
              <div className="grid grid-cols-4 gap-3">
                <a 
                  href="#" 
                  aria-label="Facebook"
                  className="aspect-square bg-blue-50 rounded-lg flex items-center justify-center hover:bg-blue-100 transition-colors"
                >
                  <svg className="w-5 h-5 text-blue-600" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                  </svg>
                </a>
                <a 
                  href="#" 
                  aria-label="Twitter"
                  className="aspect-square bg-sky-50 rounded-lg flex items-center justify-center hover:bg-sky-100 transition-colors"
                >
                  <svg className="w-5 h-5 text-sky-600" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                  </svg>
                </a>
                <a 
                  href="#" 
                  aria-label="Instagram"
                  className="aspect-square bg-pink-50 rounded-lg flex items-center justify-center hover:bg-pink-100 transition-colors"
                >
                  <svg className="w-5 h-5 text-pink-600" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                  </svg>
                </a>
                <a 
                  href="#" 
                  aria-label="LinkedIn"
                  className="aspect-square bg-pink-50 rounded-lg flex items-center justify-center hover:bg-pink-100 transition-colors"
                >
                  <svg className="w-5 h-5 text-pink-600" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                  </svg>
                </a>
              </div>
            </div>

            {/* Form Progress Card */}
            {completionPercentage > 0 && (
              <div className="bg-linear-to-br from-pink-600 to-rose-600 rounded-2xl shadow-lg p-6 text-white">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <h3 className="text-sm font-bold">Form Progress</h3>
                  </div>
                  <span className="text-2xl font-bold">{completionPercentage}%</span>
                </div>
                <div className="w-full bg-white/20 rounded-full h-3 overflow-hidden">
                  <div 
                    className="bg-white h-3 rounded-full transition-all duration-500"
                    style={{ width: `${completionPercentage}%` }}
                  ></div>
                </div>
                <p className="text-xs text-white/80 mt-2">
                  {completionPercentage === 100 ? "You're all set! Ready to submit." : "Keep going, you're doing great!"}
                </p>
              </div>
            )}
          </div>

          {/* Right Side - Contact Form */}
          <div className="lg:col-span-8">
            <div className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden">

              {/* Form Header */}
              <div className="px-8 py-6 border-b border-gray-200">
                <h2 className="text-2xl font-bold text-gray-900 mb-2">Send Us a Message</h2>
                <p className="text-gray-600">Fill out the form below and we'll respond as soon as possible.</p>
              </div>

              {/* Form Body */}
              <form onSubmit={handleSubmit} className="px-8 py-8 space-y-6">
                
                {/* Name & Email Grid */}
                <div className="grid md:grid-cols-2 gap-6">
                  
                  {/* Name Field */}
                  <div className="space-y-2">
                    <label htmlFor="name" className="block text-sm font-bold text-gray-700">
                      Full Name <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        onFocus={() => handleFocus('name')}
                        onBlur={handleBlur}
                        placeholder="Name"
                        className={getInputClasses('name')}
                      />
                      {isFieldValid('name') && (
                        <div className="absolute right-4 top-1/2 -translate-y-1/2">
                          <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                          </svg>
                        </div>
                      )}
                    </div>
                    {errors.name && (
                      <p className="flex items-center gap-1.5 text-sm text-red-600">
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                        </svg>
                        {errors.name}
                      </p>
                    )}
                  </div>

                  {/* Email Field */}
                  <div className="space-y-2">
                    <label htmlFor="email" className="block text-sm font-bold text-gray-700">
                      Email Address <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        onFocus={() => handleFocus('email')}
                        onBlur={handleBlur}
                        placeholder="Enter your email"
                        className={getInputClasses('email')}
                      />
                      {isFieldValid('email') && (
                        <div className="absolute right-4 top-1/2 -translate-y-1/2">
                          <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                          </svg>
                        </div>
                      )}
                    </div>
                    {errors.email && (
                      <p className="flex items-center gap-1.5 text-sm text-red-600">
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                        </svg>
                        {errors.email}
                      </p>
                    )}
                  </div>
                </div>

                {/* Phone Field */}
                <div className="space-y-2">
                  <label htmlFor="phone" className="block text-sm font-bold text-gray-700">
                    Phone Number <span className="text-gray-400 text-xs font-normal">(Optional)</span>
                  </label>
                  <div className="relative">
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      onFocus={() => handleFocus('phone')}
                      onBlur={handleBlur}
                      placeholder="+91"
                      className={getInputClasses('phone')}
                    />
                    {isFieldValid('phone') && (
                      <div className="absolute right-4 top-1/2 -translate-y-1/2">
                        <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                      </div>
                    )}
                  </div>
                  {errors.phone && (
                    <p className="flex items-center gap-1.5 text-sm text-red-600">
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                      </svg>
                      {errors.phone}
                    </p>
                  )}
                </div>

                {/* Message Field */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <label htmlFor="message" className="block text-sm font-bold text-gray-700">
                      Your Message <span className="text-red-500">*</span>
                    </label>
                    <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${
                      formData.message.length > 500 
                        ? 'bg-red-100 text-red-700' 
                        : formData.message.length > 400 
                        ? 'bg-amber-100 text-amber-700' 
                        : 'bg-gray-100 text-gray-600'
                    }`}>
                      {formData.message.length}/500
                    </span>
                  </div>
                  <div className="relative">
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      onFocus={() => handleFocus('message')}
                      onBlur={handleBlur}
                      rows="6"
                      placeholder="Tell us about your project, ideas, or questions..."
                      className={`${getInputClasses('message')} resize-none`}
                    />
                    {isFieldValid('message') && (
                      <div className="absolute right-4 top-4">
                        <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                      </div>
                    )}
                  </div>
                  {errors.message && (
                    <p className="flex items-center gap-1.5 text-sm text-red-600">
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                      </svg>
                      {errors.message}
                    </p>
                  )}
                </div>

                {/* Form Actions */}
                <div className="flex flex-col sm:flex-row gap-4 pt-4">
                  <button
                    type="button"
                    onClick={resetForm}
                    disabled={uiState.isSubmitting}
                    className="flex-1 sm:flex-none px-8 py-3.5 bg-white border-2 border-gray-200 text-gray-700 font-semibold rounded-xl 
                             hover:bg-gray-50 hover:border-gray-300 transition-colors
                             disabled:opacity-50 disabled:cursor-not-allowed
                             focus:outline-none focus:ring-4 focus:ring-gray-100"
                  >
                    Clear Form
                  </button>
                  <button
                    type="submit"
                    disabled={uiState.isSubmitting}
                    className="flex-1 px-8 py-3.5 bg-linear-to-r from-pink-600 to-rose-600 text-white font-semibold rounded-xl 
                             hover:from-pink-700 hover:to-rose-700 shadow-lg hover:shadow-xl
                             transition-all disabled:opacity-50 disabled:cursor-not-allowed
                             focus:outline-none focus:ring-4 focus:ring-pink-200
                             flex items-center justify-center gap-2"
                  >
                    {uiState.isSubmitting ? (
                      <>
                        <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        <span>Sending...</span>
                      </>
                    ) : (
                      <>
                        <span>Send Message</span>
                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                        </svg>
                      </>
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;