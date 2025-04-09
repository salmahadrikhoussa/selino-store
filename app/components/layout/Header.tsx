'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState, useRef, useEffect } from 'react';
import { useLanguage } from '@/app/context/LanguageContext';

export default function Header() {
  const { t, dir } = useLanguage();
  const isRTL = dir === 'rtl';
  
  const [isOpen, setIsOpen] = useState(false);
  const [showCollectionMenu, setShowCollectionMenu] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const [showAnnouncement, setShowAnnouncement] = useState(true);
  
  const dropdownRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  
  // Collection dropdown handlers
  const handleMouseEnter = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
    setShowCollectionMenu(true);
  };
  
  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setShowCollectionMenu(false);
    }, 2000);
  };
  
  const handleDropdownMouseEnter = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
  };
  
  const handleDropdownMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setShowCollectionMenu(false);
    }, 1000);
  };
  
  // Cart toggle handler
  const toggleCart = () => {
    setCartOpen(!cartOpen);
    // If opening cart, we should also close mobile menu if it's open
    if (!cartOpen && isOpen) {
      setIsOpen(false);
    }
  };
  
  // Cleanup timeouts on unmount
  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);
  
  // Click outside handlers
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      // For Collection dropdown
      if (
        dropdownRef.current && 
        buttonRef.current && 
        !dropdownRef.current.contains(event.target as Node) &&
        !buttonRef.current.contains(event.target as Node)
      ) {
        setShowCollectionMenu(false);
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);
  
  // Prevent scrolling when cart is open
  useEffect(() => {
    if (cartOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [cartOpen]);

  return (
    <>
      {/* Simple Scrolling Announcement Bar */}
{showAnnouncement && (
  <div className="bg-black text-white text-xs py-2 fixed w-full z-[60] top-0 overflow-hidden">
    <div className="relative w-full flex items-center">
      <div className="flex-1 overflow-hidden">
        <div className="simple-scroll">
          CHECK OUR LATEST COLLECTION -
        </div>
      </div>
      <button 
        onClick={() => setShowAnnouncement(false)}
        className="text-white focus:outline-none absolute right-4"
        aria-label="Close announcement"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
    </div>
  </div>
)}

      <header className={`bg-white bg-opacity-95 backdrop-blur-sm py-4 fixed w-full z-50 ${showAnnouncement ? 'top-8' : 'top-0'} ${isRTL ? 'text-right' : ''} transition-all duration-300`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Social media icons top bar */}
          <div className={`flex ${isRTL ? 'justify-start' : 'justify-end'} mb-2`}>
            <div className={`flex ${isRTL ? 'space-x-reverse' : ''} space-x-3 items-center`}>
              <a href="https://www.instagram.com/selino.limited/" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-black transition-colors">
                <span className="sr-only">Instagram</span>
                <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465.668.25 1.236.598 1.799 1.16.563.563.91 1.132 1.16 1.8.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.16 1.799c-.563.563-1.131.91-1.8 1.16-.636.247-1.363.416-2.427.465-1.066.048-1.405.06-4.122.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.8-1.16 4.902 4.902 0 01-1.16-1.8c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.16-1.8A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd" />
                </svg>
              </a>
              
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-black transition-colors">
                <span className="sr-only">Facebook</span>
                <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
                </svg>
              </a>
              
              
              <a href="https://tiktok.com" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-black transition-colors">
                <span className="sr-only">TikTok</span>
                <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M12.53.02C13.84 0 15.14.01 16.44 0c.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z" />
                </svg>
              </a>
            </div>
          </div>
          
          <div className="flex justify-between items-center">
            {/* Left navigation with proper alignment */}
            <div className={`flex space-x-8 text-xs uppercase items-center ${isRTL ? 'flex-row-reverse space-x-reverse' : ''}`}>
              <div className="relative">
                <div 
                  onMouseEnter={handleMouseEnter}
                  onMouseLeave={handleMouseLeave}
                  className="relative py-2"
                >
                  <button 
                    ref={buttonRef}
                    className="text-black hover:underline uppercase"
                  >
                    {t('collection')}
                  </button>
                  
                  <div 
                    ref={dropdownRef}
                    onMouseEnter={handleDropdownMouseEnter}
                    onMouseLeave={handleDropdownMouseLeave}
                    className={`absolute ${isRTL ? 'right-0' : 'left-0'} mt-2 py-2 w-48 bg-white shadow-xl z-50 transform transition-all duration-300 ease-in-out ${
                      showCollectionMenu 
                        ? 'opacity-100 translate-y-0' 
                        : 'opacity-0 -translate-y-2 pointer-events-none'
                    }`}
                  >
                    <Link href="/collections/summer" className={`block px-4 py-3 text-xs text-black hover:bg-gray-100 transition duration-200 ${isRTL ? 'text-right' : ''}`}>
                      {t('summer')}
                    </Link>
                    <Link href="/collections/spring" className={`block px-4 py-3 text-xs text-black hover:bg-gray-100 transition duration-200 ${isRTL ? 'text-right' : ''}`}>
                      {t('spring')}
                    </Link>
                    <Link href="/collections/autumn" className={`block px-4 py-3 text-xs text-black hover:bg-gray-100 transition duration-200 ${isRTL ? 'text-right' : ''}`}>
                      {t('autumn')}
                    </Link>
                    <Link href="/collections/winter" className={`block px-4 py-3 text-xs text-black hover:bg-gray-100 transition duration-200 ${isRTL ? 'text-right' : ''}`}>
                      {t('winter')}
                    </Link>
                  </div>
                </div>
              </div>
              
              <Link href="/dresses" className="py-2 text-black hover:underline uppercase">
                {t('dresses')}
              </Link>
              
              <Link href="/shirts" className="py-2 text-black hover:underline uppercase">
                {t('shirts')}
              </Link>
              
              <Link href="/about" className="py-2 text-black hover:underline uppercase">
                About Us
              </Link>
            </div>
            
            {/* Center logo */}
            <Link href="/" className="absolute left-1/2 transform -translate-x-1/2">
              <Image 
                src="/selino.svg" 
                alt="Selino Logo" 
                width={120} 
                height={40} 
                className="h-10 w-auto"
              />
            </Link>
            
            {/* Right side - search bar with cart icon */}
            <div className="flex items-center space-x-4">
              <div className="w-64">
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                  </div>
                  <input 
                    type="text" 
                    placeholder="Search anything..." 
                    className="pl-10 pr-4 py-2 w-full rounded-full bg-gray-50 border-none focus:outline-none focus:ring-1 focus:ring-gray-200 text-sm text-gray-800"
                  />
                </div>
              </div>
              
              {/* Cart icon */}
              <button 
                onClick={toggleCart} 
                aria-label="Cart" 
                className="text-black hover:text-gray-700"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                </svg>
              </button>
            </div>
          </div>
          
          {/* Mobile menu section */}
          <div className="md:hidden mt-2 flex justify-end">
            <button 
              onClick={() => setIsOpen(!isOpen)}
              className="text-black"
            >
              {isOpen ? t('close') : t('menu')}
            </button>
          </div>
          
          {/* Mobile menu */}
          {isOpen && (
            <div className="md:hidden mt-2">
              <div className={`pt-2 pb-3 space-y-1 ${isRTL ? 'text-right' : ''}`}>
                <div>
                  <button 
                    onClick={() => setShowCollectionMenu(!showCollectionMenu)}
                    className={`block py-2 text-sm text-black w-full uppercase ${isRTL ? 'text-right' : 'text-left'}`}
                  >
                    {t('collection')}
                  </button>
                  <div 
                    className={`pl-4 overflow-hidden transition-all duration-300 ease-in-out ${
                      showCollectionMenu 
                        ? 'max-h-48 opacity-100' 
                        : 'max-h-0 opacity-0'
                    }`}
                  >
                    <Link href="/collections/summer" className="block py-2 text-sm text-black">
                      {t('summer')}
                    </Link>
                    <Link href="/collections/spring" className="block py-2 text-sm text-black">
                      {t('spring')}
                    </Link>
                    <Link href="/collections/autumn" className="block py-2 text-sm text-black">
                      {t('autumn')}
                    </Link>
                    <Link href="/collections/winter" className="block py-2 text-sm text-black">
                      {t('winter')}
                    </Link>
                  </div>
                </div>
                <Link href="/dresses" className="block py-2 text-sm text-black uppercase">
                  {t('dresses')}
                </Link>
                <Link href="/shirts" className="block py-2 text-sm text-black uppercase">
                  {t('shirts')}
                </Link>
                <Link href="/about" className="block py-2 text-sm text-black uppercase">
                  About Us
                </Link>
                
                {/* Add social media to mobile menu */}
                <div className="py-4 border-t border-gray-100 mt-2">
                  <div className="flex space-x-5 py-2">
                    <a href="https://www.instagram.com/selino.limited/" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-black">
                      <span className="sr-only">Instagram</span>
                      <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                        <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465.668.25 1.236.598 1.799 1.16.563.563.91 1.132 1.16 1.8.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.16 1.799c-.563.563-1.131.91-1.8 1.16-.636.247-1.363.416-2.427.465-1.066.048-1.405.06-4.122.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.8-1.16 4.902 4.902 0 01-1.16-1.8c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.16-1.8A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd" />
                      </svg>
                    </a>
                    <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-black">
                      <span className="sr-only">Facebook</span>
                      <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                        <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
                      </svg>
                    </a>
                    <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-black">
                      <span className="sr-only">Twitter</span>
                      <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                        <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                      </svg>
                    </a>
                                         <a href="https://tiktok.com" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-black">
                      <span className="sr-only">TikTok</span>
                      <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                        <path d="M12.53.02C13.84 0 15.14.01 16.44 0c.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z" />
                      </svg>
                    </a>
                  </div>
                </div>
                
                {/* Add search and cart to mobile menu */}
                <div className="py-2">
                  <div className="relative mb-3">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                      </svg>
                    </div>
                    <input 
                      type="text" 
                      placeholder="Search anything..." 
                      className="pl-10 pr-4 py-2 w-full rounded-full bg-gray-50 border-none focus:outline-none focus:ring-1 focus:ring-gray-200 text-sm text-gray-800"
                    />
                  </div>
                  
                  <button onClick={toggleCart} className="flex items-center py-2 text-sm text-black">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                    </svg>
                    Cart
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </header>

      {/* Cart sidebar with backdrop options */}
      {cartOpen && (
        <div className="fixed inset-0 z-[100] overflow-hidden">
          {/* Using backdrop-blur and backdrop-brightness */}
          <div 
            className="fixed inset-0 bg-black/50 backdrop-blur-sm backdrop-brightness-50"
            onClick={toggleCart}
          ></div>
          
          {/* Cart sidebar */}
          <div className={`fixed inset-y-0 ${isRTL ? 'left-0' : 'right-0'} max-w-md w-full bg-white shadow-xl overflow-y-auto transform transition-transform duration-300 ease-in-out z-[101]`}>
            <div className="flex justify-between items-center px-6 py-4 border-b">
              <h2 className="text-lg font-medium">Your Cart</h2>
              <button 
                onClick={toggleCart}
                className="text-gray-400 hover:text-black transition-colors focus:outline-none"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            
            <div className="px-6 py-4">
              {/* Cart content would go here */}
              <div className="text-center py-16">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto text-gray-300 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                </svg>
                <p className="text-gray-500 mb-4">Your cart is empty</p>
                <button 
                  onClick={toggleCart}
                  className="px-4 py-2 bg-black text-white rounded-sm text-sm uppercase tracking-wider"
                >
                  Continue Shopping
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}