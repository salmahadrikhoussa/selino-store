'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Thumbs, FreeMode } from 'swiper/modules';
import { useLanguage } from '@/app/context/LanguageContext';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/thumbs';
import 'swiper/css/free-mode';

export default function ProductDetail() {
  const { t, dir } = useLanguage();
  const isRTL = dir === 'rtl';
  const params = useParams();
  const productId = params.id;
  
  // State for quantity and selected options
  const [quantity, setQuantity] = useState(1);
  const [selectedColor, setSelectedColor] = useState('black');
  const [selectedSize, setSelectedSize] = useState('m');
  const [thumbsSwiper, setThumbsSwiper] = useState(null);
  
  // Mock product data (in a real app, fetch this from an API based on productId)
  const product = {
    id: productId,
    name: 'Oversized Linen Blazer',
    price: 1250,
    description: 'A sophisticated oversized linen blazer with a modern silhouette. Features notched lapels, front button fastening, and a relaxed fit. Perfect for both formal and casual occasions.',
    colors: [
      { id: 'black', name: 'Black', hex: '#000000' },
      { id: 'navy', name: 'Navy', hex: '#0a1845' },
      { id: 'beige', name: 'Beige', hex: '#e8dac5' }
    ],
    sizes: ['xs', 's', 'm', 'l', 'xl'],
    images: [
      '/product1.jpg',
      '/product2.jpg',
      '/product3.jpg',
      '/product1.jpg' // Duplicated for demo purposes
    ]
  };
  
  // Mock recommended products
  const recommendedProducts = [
    { id: 2, name: 'Structured Cotton Shirt', price: 750, imageUrl: '/product2.jpg' },
    { id: 3, name: 'Draped Silk Skirt', price: 950, imageUrl: '/product3.jpg' },
    { id: 4, name: 'Evening Column Dress', price: 1950, imageUrl: '/dress1.jpg' },
  ];
  
  // Handle quantity changes
  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };
  
  const increaseQuantity = () => {
    setQuantity(quantity + 1);
  };
  
  // Add to cart function
  const addToCart = () => {
    alert(`Added to cart: ${quantity} ${product.name}, Size: ${selectedSize.toUpperCase()}, Color: ${selectedColor}`);
    // In a real app, you would integrate with a cart system
  };

  return (
    <div className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 pt-24 ${isRTL ? 'text-right' : ''}`}>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
        {/* Left side - Product gallery */}
        <div className="product-gallery">
          <Swiper
            spaceBetween={10}
            navigation={true}
            thumbs={{ swiper: thumbsSwiper }}
            modules={[Navigation, Thumbs]}
            className="product-main-slider mb-4"
          >
            {product.images.map((image, index) => (
              <SwiperSlide key={index}>
                <div className="relative aspect-[3/4] bg-gray-100">
                  <Image 
                    src={image} 
                    alt={`${product.name} - Image ${index + 1}`} 
                    fill
                    className="object-cover"
                  />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
          
          <Swiper
            onSwiper={setThumbsSwiper}
            spaceBetween={10}
            slidesPerView={4}
            freeMode={true}
            watchSlidesProgress={true}
            modules={[FreeMode, Navigation, Thumbs]}
            className="product-thumb-slider"
          >
            {product.images.map((image, index) => (
              <SwiperSlide key={index}>
                <div className="relative aspect-square bg-gray-100 cursor-pointer">
                  <Image 
                    src={image} 
                    alt={`Thumbnail ${index + 1}`} 
                    fill
                    className="object-cover"
                  />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
        
        {/* Right side - Product details and options */}
        <div className="product-details">
          <h1 className="text-2xl font-light mb-2">{product.name}</h1>
          <p className="text-xl mb-6">${product.price.toLocaleString()}</p>
          
          <div className="mb-8">
            <p className="text-gray-700">{product.description}</p>
          </div>
          
          {/* Color selection */}
          <div className="mb-6">
            <h3 className="text-sm uppercase mb-2">Color</h3>
            <div className="flex space-x-2">
              {product.colors.map(color => (
                <button
                  key={color.id}
                  onClick={() => setSelectedColor(color.id)}
                  className={`w-8 h-8 rounded-full border-2 ${selectedColor === color.id ? 'border-black' : 'border-transparent'}`}
                  style={{ backgroundColor: color.hex }}
                  aria-label={color.name}
                  title={color.name}
                />
              ))}
            </div>
          </div>
          
          {/* Size selection */}
          <div className="mb-6">
            <h3 className="text-sm uppercase mb-2">Size</h3>
            <div className="flex space-x-2">
              {product.sizes.map(size => (
                <button
                  key={size}
                  onClick={() => setSelectedSize(size)}
                  className={`w-10 h-10 border ${selectedSize === size 
                    ? 'border-black bg-black text-white' 
                    : 'border-gray-300 hover:border-gray-400'}`}
                >
                  {size.toUpperCase()}
                </button>
              ))}
            </div>
          </div>
          
          {/* Quantity selection */}
          <div className="mb-8">
            <h3 className="text-sm uppercase mb-2">Quantity</h3>
            <div className="flex border border-gray-300 w-32">
              <button 
                onClick={decreaseQuantity} 
                className="px-3 py-2 border-r border-gray-300"
              >
                -
              </button>
              <div className="flex-1 text-center py-2">{quantity}</div>
              <button 
                onClick={increaseQuantity} 
                className="px-3 py-2 border-l border-gray-300"
              >
                +
              </button>
            </div>
          </div>
          
          {/* Add to cart button */}
          <button 
            onClick={addToCart}
            className="w-full bg-black text-white py-4 uppercase text-sm tracking-wider hover:bg-gray-900 transition-colors mb-4"
          >
            Add to Cart
          </button>
          
          {/* Checkout button */}
          <button 
            className="w-full border border-black py-4 uppercase text-sm tracking-wider hover:bg-gray-100 transition-colors"
          >
            Buy Now
          </button>
        </div>
      </div>
      
      {/* Product recommendations */}
      <div className="recommended-products">
        <h2 className="text-xl font-light mb-8 text-center uppercase tracking-wider">You may also like</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {recommendedProducts.map(product => (
            <div key={product.id} className="group">
              <Link href={`/product/${product.id}`}>
                <div className="relative aspect-[3/4] bg-gray-100 mb-3 overflow-hidden">
                  <Image 
                    src={product.imageUrl} 
                    alt={product.name} 
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <h3 className="uppercase text-xs tracking-wider">{product.name}</h3>
                <p className="text-sm mt-1">${product.price.toLocaleString()}</p>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};