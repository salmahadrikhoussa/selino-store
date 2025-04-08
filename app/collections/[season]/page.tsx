'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { useLanguage } from '@/app/context/LanguageContext';

export default function CollectionPage() {
  const params = useParams();
  const season = params.season;
  const { t, dir } = useLanguage();
  const isRTL = dir === 'rtl';
  
  // Capitalize first letter for display
  const displayName = season ? season.toString().charAt(0).toUpperCase() + season.toString().slice(1) : '';
  
  // Sample collection products (would come from API in real app)
  const products = [
    { id: 13, name: 'Pleated Maxi Dress', type: 'dress', price: 1850, imageUrl: '/dress1.jpg' },
    { id: 14, name: 'Oversized Linen Shirt', type: 'shirt', price: 850, imageUrl: '/shirt1.jpg' },
    { id: 15, name: 'Structured Blazer', type: 'jacket', price: 2200, imageUrl: '/product2.jpg' },
    { id: 16, name: 'Silk Evening Gown', type: 'dress', price: 2950, imageUrl: '/dress2.jpg' },
    { id: 17, name: 'Cotton Button-Down', type: 'shirt', price: 750, imageUrl: '/shirt2.jpg' },
    { id: 18, name: 'Tailored Trousers', type: 'pants', price: 1250, imageUrl: '/product1.jpg' },
  ];
  
  return (
    <div className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 pt-24 ${isRTL ? 'text-right' : ''}`}>
      <div className="text-center mb-12">
        <h1 className="text-3xl uppercase tracking-widest font-light mb-4">{displayName} Collection</h1>
        <p className="max-w-2xl mx-auto text-sm text-gray-600">
          Discover our {displayName.toLowerCase()} collection, featuring elegant pieces designed for the season.
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {products.map((product) => (
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
              <p className="text-xs text-gray-500 uppercase">{product.type}</p>
              <p className="text-sm mt-1">${product.price.toLocaleString()}</p>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}