'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useLanguage } from '@/app/context/LanguageContext';

export default function DressesPage() {
  const { t, dir } = useLanguage();
  const isRTL = dir === 'rtl';
  
  // Sample dresses data (would be fetched from API in a real app)
  const dresses = [
    { id: 1, name: 'Asymmetric Evening Dress', price: 1950, imageUrl: '/dress1.jpg' },
    { id: 2, name: 'Structured Column Dress', price: 2400, imageUrl: '/dress2.jpg' },
    { id: 3, name: 'Draped Silk Dress', price: 1750, imageUrl: '/dress3.jpg' },
    { id: 4, name: 'Plunge Halterneck Dress', price: 1850, imageUrl: '/dress4.jpg' },
    { id: 5, name: 'Metallic Mini Dress', price: 2100, imageUrl: '/dress5.jpg' },
    { id: 6, name: 'Backless Evening Gown', price: 2950, imageUrl: '/dress6.jpg' },
  ];
  
  return (
    <div className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 pt-24 ${isRTL ? 'text-right' : ''}`}>
      <div className="text-center mb-12">
        <h1 className="text-3xl uppercase tracking-widest font-light mb-4">{t('dresses')}</h1>
        <p className="max-w-2xl mx-auto text-sm text-gray-600">
          {t('exploreOurDresses')}
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {dresses.map((dress) => (
          <div key={dress.id} className="group">
            <Link href={`/product/${dress.id}`}>
              <div className="relative aspect-[3/4] bg-gray-100 mb-3 overflow-hidden">
                <Image 
                  src={dress.imageUrl} 
                  alt={dress.name} 
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <h3 className="uppercase text-xs tracking-wider">{dress.name}</h3>
              <p className="text-sm mt-1">${dress.price.toLocaleString()}</p>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};