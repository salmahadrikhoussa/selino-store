'use client';

import Image from 'next/image';
import { useLanguage } from '@/app/context/LanguageContext';

export default function AboutPage() {
  const { t } = useLanguage();

  return (
    <div className="bg-white text-black">
      <div className="container mx-auto px-4 py-16 max-w-6xl">
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-light tracking-wider uppercase mb-4 text-black">
            About Selino
          </h1>
          <p className="text-gray-800 max-w-2xl mx-auto">
            A contemporary fashion brand dedicated to crafting timeless, sophisticated clothing that transcends seasonal trends.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
          <div>
            <h2 className="text-xl uppercase tracking-wider mb-4 text-black">Our Vision</h2>
            <p className="text-gray-800 leading-relaxed">
              Selino was founded with a singular mission: to redefine modern fashion through meticulous craftsmanship, innovative design, and a commitment to sustainability. We believe in creating clothing that empowers individuals, tells a story, and stands the test of time.
            </p>
          </div>
          <div className="relative aspect-[3/4] overflow-hidden">
            <Image 
              src="/About-us.jpg" 
              alt="Selino Vision" 
              fill
              className="object-cover hover:scale-105 transition-transform duration-500"
            />
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-16">
          <div className="text-center">
            <div className="w-16 h-16 bg-black text-white flex items-center justify-center mx-auto mb-4 rounded-full">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
              </svg>
            </div>
            <h3 className="uppercase tracking-wider mb-2 text-black">Quality</h3>
            <p className="text-gray-800 text-sm">
              Uncompromising commitment to superior materials and precision tailoring.
            </p>
          </div>

          <div className="text-center">
            <div className="w-16 h-16 bg-black text-white flex items-center justify-center mx-auto mb-4 rounded-full">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 18.657A8 8 0 016.343 7.343S7 9 9 10c0-2 .5-5 2.986-7C14 5 16.09 5.777 17.656 7.343A7.975 7.975 0 0120 13a7.975 7.975 0 01-2.343 5.657z" />
              </svg>
            </div>
            <h3 className="uppercase tracking-wider mb-2 text-black">Sustainability</h3>
            <p className="text-gray-800 text-sm">
              Environmentally conscious practices embedded in our design philosophy.
            </p>
          </div>

          <div className="text-center">
            <div className="w-16 h-16 bg-black text-white flex items-center justify-center mx-auto mb-4 rounded-full">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="uppercase tracking-wider mb-2 text-black">Timelessness</h3>
            <p className="text-gray-800 text-sm">
              Designing beyond trends, creating pieces that endure through seasons.
            </p>
          </div>
        </div>

        <div className="text-center">
          <h2 className="text-xl uppercase tracking-wider mb-6 text-black">Our Commitment</h2>
          <p className="text-gray-800 max-w-3xl mx-auto leading-relaxed">
            At Selino, we are more than a fashion brand. We are storytellers, crafting garments that reflect individuality, sophistication, and a deep respect for both design and the environment. Every piece is a testament to our dedication to excellence.
          </p>
        </div>
      </div>
    </div>
  );
}