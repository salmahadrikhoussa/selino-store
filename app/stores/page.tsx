'use client';

import { useLanguage } from '@/app/context/LanguageContext';
import Link from 'next/link';

export default function OnlineStorePage() {
  const { t, dir } = useLanguage();
  const isRTL = dir === 'rtl';

  return (
    <main className={`pt-28 pb-20 bg-white ${isRTL ? 'text-right' : ''}`}>
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Elegant Header */}
        <div className="mb-16 text-center">
          <div className="w-12 h-0.5 bg-black mx-auto my-6"></div>
        </div>

        {/* Intro Section */}
        <div className="mb-24 max-w-2xl mx-auto">
          <p className="text-gray-800 text-center leading-relaxed">
            Selino is a digital-first fashion brand delivering high-quality designs directly to you.
          </p>
        </div>

        {/* Vertical Line Separator */}
        <div className="w-px h-16 bg-gray-200 mx-auto mb-16"></div>

        {/* Core Information - Elegant Layout */}
        <div className="mb-24 max-w-2xl mx-auto">
          <p className="text-gray-800 text-center leading-relaxed mb-12">
            At Selino, we've created an online shopping experience with elegance and simplicity at its core. Browse our curated collections and enjoy complimentary shipping on orders over $150.
          </p>
          
          <div className="flex justify-center mt-12">
            <Link 
              href="/collections/summer"
              className="inline-block bg-white border border-black text-black px-8 py-3 text-xs uppercase tracking-widest transition-all hover:bg-black hover:text-white"
            >
              {t('shopNow')}
            </Link>
          </div>
        </div>
        
        {/* Footer Links - Enhanced Buttons */}
        <div className="pt-12 border-t border-gray-100 text-center">
          <div className="flex flex-col md:flex-row justify-center items-center space-y-4 md:space-y-0 md:space-x-6">
            <Link 
              href="/faq" 
              className="px-8 py-3 border-b border-black text-xs uppercase tracking-widest text-black hover:border-gray-400 transition-all duration-300"
            >
              {t('faq')}
            </Link>
            <Link 
              href="/contact" 
              className="px-8 py-3 border-b border-black text-xs uppercase tracking-widest text-black hover:border-gray-400 transition-all duration-300"
            >
              {t('contact')}
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}