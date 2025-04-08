'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useLanguage } from '@/app/context/LanguageContext';

export default function ShirtsPage() {
  const { t, dir } = useLanguage();
  const isRTL = dir === 'rtl';
  
  // Sample shirts data (would be fetched from API in a real app)
  const shirts = [
    { id: 7, name: 'Oversized Linen Shirt', price: 850, imageUrl: '/shirt1.jpg' },
    { id: 8, name: 'Silk Button-Down Shirt', price: 950, imageUrl: '/shirt2.jpg' },
    { id: 9, name: 'Structured Cotton Shirt', price: 750, imageUrl: '/shirt3.jpg' },
    { id: 10, name: 'Printed Resort Shirt', price: 890, imageUrl: '/shirt4.jpg' },
    { id: 11, name: 'Evening Sheer Blouse', price: 1100, imageUrl: '/shirt5.jpg' },
    { id: 12, name: 'Classic White Shirt', price: 780, imageUrl: '/shirt6.jpg' },
  ];
  
  return (
    <div className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 pt-24 ${isRTL ? 'text-right' : ''}`}>
      <div className="text-center mb-12">
        <h1 className="text-3xl uppercase tracking-widest font-light mb-4">{t('shirts')}</h1>
        <p className="max-w-2xl mx-auto text-sm text-gray-600">
          {t('exploreOurShirts')}
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {shirts.map((shirt) => (
          <div key={shirt.id} className="group">
            <Link href={`/product/${shirt.id}`}>
              <div className="relative aspect-[3/4] bg-gray-100 mb-3 overflow-hidden">
                <Image 
                  src={shirt.imageUrl} 
                  alt={shirt.name} 
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <h3 className="uppercase text-xs tracking-wider">{shirt.name}</h3>
              <p className="text-sm mt-1">${shirt.price.toLocaleString()}</p>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}