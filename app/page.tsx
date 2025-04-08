'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import Swiper from 'swiper';
import 'swiper/css';

export default function Home() {
  // Initialize Swiper on component mount
  useEffect(() => {
    const swiper = new Swiper('.swiper', {
      slidesPerView: 1,
      spaceBetween: 0,
      loop: true,
      autoplay: {
        delay: 5000,
      },
    });
  }, []);

  return (
    <div className="flex flex-col">
      {/* Hero section with autoplaying video */}
      <div className="relative h-screen w-full overflow-hidden">
        <video 
          autoPlay 
          muted 
          loop 
          playsInline
          className="absolute h-full w-full object-cover"
        >
          <source src="/hero-video.mp4" type="video/mp4" />
          {/* Fallback image if video can't play */}
          <Image 
            src="/hero-image.jpg" 
            alt="Resort Collection" 
            fill
            className="object-cover"
          />
        </video>
        
        <div className="absolute inset-0 flex flex-col items-center justify-center text-white text-center z-10">
          <p className="text-sm uppercase tracking-widest mb-2">Overture</p>
          <h1 className="text-3xl md:text-4xl lg:text-5xl uppercase tracking-widest font-light mb-6">Resort — Spring 25</h1>
          <Link href="/collections/spring" className="uppercase text-xs tracking-widest border-b border-white pb-1 hover:opacity-80">
            Shop Now
          </Link>
        </div>
      </div>

      {/* Shop Categories */}
      <div className="py-8 text-center">
        <p className="uppercase tracking-wider text-sm mb-4">Shop / <span className="text-gray-400">Spring</span></p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 px-4 md:px-8 lg:px-16 max-w-7xl mx-auto">
          {/* Product 1 */}
          <div className="group">
            <div className="relative aspect-[3/4] bg-gray-100 mb-3 overflow-hidden">
              <Image 
                src="/product1.jpg" 
                alt="Linen Oversized Jacket" 
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-500"
              />
            </div>
            <h3 className="uppercase text-xs tracking-wider">Linen Oversized Jacket</h3>
          </div>
          
          {/* Product 2 */}
          <div className="group">
            <div className="relative aspect-[3/4] bg-gray-100 mb-3 overflow-hidden">
              <Image 
                src="/product2.jpg" 
                alt="Lavallière Jacket" 
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-500"
              />
            </div>
            <h3 className="uppercase text-xs tracking-wider">Lavallière Jacket</h3>
          </div>
          
          {/* Product 3 */}
          <div className="group">
            <div className="relative aspect-[3/4] bg-gray-100 mb-3 overflow-hidden">
              <Image 
                src="/product3.jpg" 
                alt="Silk Waistcoat" 
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-500"
              />
            </div>
            <h3 className="uppercase text-xs tracking-wider">Silk Waistcoat</h3>
          </div>
        </div>

        {/* See All Products Button */}
        <div className="mt-12 text-center">
          <Link 
            href="/products" 
            className="inline-block px-8 py-4 bg-black text-white uppercase text-sm tracking-[0.2em] 
            transform hover:scale-105 transition-all duration-300 ease-in-out 
            shadow-lg hover:shadow-xl relative 
            before:absolute before:inset-0 before:bg-white before:opacity-0 
            hover:before:opacity-10 before:transition-opacity before:duration-300"
          >
            <span className="relative z-10">See All Products</span>
          </Link>
        </div>
      </div>

      {/* Statement Piece Banner */}
      <div className="relative h-96 w-full bg-gray-200 mb-16">
        <Image 
          src="/statement.jpg" 
          alt="Statement Wardrobe" 
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center text-white">
            <h2 className="uppercase tracking-widest text-sm mb-2">Statement Wardrobe</h2>
            <div className="w-8 h-px bg-white mx-auto mb-2"></div>
          </div>
        </div>
      </div>

      {/* Brand Statement */}
      <div className="text-center max-w-2xl mx-auto mb-20 px-4">
        <p className="uppercase tracking-[0.25em] text-sm leading-relaxed">
          Exudes bold contemporary style, blending sharp tailoring with avant-garde elegance.
        </p>
        <div className="w-8 h-px bg-black mx-auto mt-6"></div>
      </div>
    </div>
  );
};