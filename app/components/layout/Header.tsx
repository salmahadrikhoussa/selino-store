'use client';

import Link from 'next/link';
import { useState, useRef, useEffect } from 'react';
import { useLanguage } from '@/app/context/LanguageContext';

export default function Header() {
  const { t, dir } = useLanguage();
  const isRTL = dir === 'rtl';
  
  const [isOpen, setIsOpen] = useState(false);
  const [showCollectionMenu, setShowCollectionMenu] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  
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
      <header className={`bg-white bg-opacity-95 backdrop-blur-sm py-4 fixed w-full z-50 ${isRTL ? 'text-right' : ''}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
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
            </div>
            
            {/* Center logo */}
            <Link href="/" className="absolute left-1/2 transform -translate-x-1/2">
              <span className="text-xl tracking-widest font-light uppercase text-black">Selino</span>
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
          {/* Option 1: Using backdrop-blur and backdrop-brightness */}
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