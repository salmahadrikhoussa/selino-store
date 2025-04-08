'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

// All translations for the entire website
const translations = {
  en: {
    // Header
    collection: "Collection",
    summer: "Summer",
    spring: "Spring",
    autumn: "Autumn",
    winter: "Winter",
    dresses: "DRESSES",
    shirts: "SHIRTS",
    couture: "Couture",
    laMaison: "La Maison",
    menu: "Menu",
    close: "Close",
    language: "Language",
    
    // Home page
    welcomeToSelino: "Welcome to Selino",
    exploreCollection: "Explore our collection of meticulously crafted fashion, blending modern silhouettes with timeless elegance.",
    shopNow: "Shop Now",
    eveningLooks: "Evening Looks",
    iconicPrints: "Iconic Prints",
    statementWardrobe: "Statement Wardrobe",
    brandStatement: "Exudes bold contemporary style, blending sharp tailoring with avant-garde elegance.",
    
    // Product listing
    exploreOurDresses: "Explore our collection of meticulously crafted dresses, blending modern silhouettes with timeless elegance.",
    exploreOurShirts: "Discover our collection of premium shirts and blouses, crafted with exceptional materials and thoughtful details.",
    
    // Footer
    information: "Information",
    about: "About Selino",
    stores: "Stores",
    sustainability: "Sustainability",
    careers: "Careers",
    clientServices: "Client Services",
    contact: "Contact Us",
    faq: "FAQ",
    shipping: "Shipping & Returns",
    productCare: "Product Care",
    legal: "Legal",
    terms: "Terms & Conditions",
    privacy: "Privacy Policy",
    cookies: "Cookie Policy",
    accessibility: "Accessibility",
    followUs: "Follow Us",
    newsletter: "Newsletter",
    subscribeText: "Subscribe to receive updates, access to exclusive deals, and more.",
    subscribe: "Subscribe",
    yourEmail: "Your email",
    allRightsReserved: "ALL RIGHTS RESERVED"
  },
  fr: {
    // Header
    collection: "Collection",
    summer: "Été",
    spring: "Printemps",
    autumn: "Automne",
    winter: "Hiver",
    dresses: "ROBES",
    shirts: "CHEMISES",
    couture: "Couture",
    laMaison: "La Maison",
    menu: "Menu",
    close: "Fermer",
    language: "Langue",
    
    // Home page
    welcomeToSelino: "Bienvenue chez Selino",
    exploreCollection: "Explorez notre collection de mode méticuleusement confectionnée, alliant silhouettes modernes et élégance intemporelle.",
    shopNow: "Acheter",
    eveningLooks: "Tenues de Soirée",
    iconicPrints: "Imprimés Iconiques",
    statementWardrobe: "Garde-robe Signature",
    brandStatement: "Exprime un style contemporain audacieux, mêlant une coupe précise à une élégance avant-gardiste.",
    
    // Product listing
    exploreOurDresses: "Explorez notre collection de robes méticuleusement confectionnées, alliant silhouettes modernes et élégance intemporelle.",
    exploreOurShirts: "Découvrez notre collection de chemises et blouses haut de gamme, fabriquées avec des matériaux exceptionnels et des détails soignés.",
    
    // Footer
    information: "Informations",
    about: "À propos de Selino",
    stores: "Boutiques",
    sustainability: "Durabilité",
    careers: "Carrières",
    clientServices: "Services Clients",
    contact: "Contactez-nous",
    faq: "FAQ",
    shipping: "Livraison & Retours",
    productCare: "Entretien des Produits",
    legal: "Mentions Légales",
    terms: "Conditions Générales",
    privacy: "Politique de Confidentialité",
    cookies: "Politique des Cookies",
    accessibility: "Accessibilité",
    followUs: "Suivez-nous",
    newsletter: "Newsletter",
    subscribeText: "Abonnez-vous pour recevoir nos actualités, accéder à des offres exclusives et plus encore.",
    subscribe: "S'abonner",
    yourEmail: "Votre email",
    allRightsReserved: "TOUS DROITS RÉSERVÉS"
  },
  ar: {
    // Header
    collection: "المجموعة",
    summer: "الصيف",
    spring: "الربيع",
    autumn: "الخريف",
    winter: "الشتاء",
    dresses: "الفساتين",
    shirts: "القمصان",
    couture: "كوتور",
    laMaison: "لا ميزون",
    menu: "القائمة",
    close: "إغلاق",
    language: "اللغة",
    
    // Home page
    welcomeToSelino: "مرحبًا بكم في سيلينو",
    exploreCollection: "استكشف مجموعتنا من الأزياء المصنوعة بدقة، التي تمزج بين الأشكال العصرية والأناقة الخالدة.",
    shopNow: "تسوق الآن",
    eveningLooks: "إطلالات المساء",
    iconicPrints: "نقوش مميزة",
    statementWardrobe: "خزانة ملابس مميزة",
    brandStatement: "تتميز بأسلوب معاصر جريء، يمزج بين القص الدقيق والأناقة المتطورة.",
    
    // Product listing
    exploreOurDresses: "استكشف مجموعتنا من الفساتين المصنوعة بدقة، التي تمزج بين الأشكال العصرية والأناقة الخالدة.",
    exploreOurShirts: "اكتشف مجموعتنا من القمصان والبلوزات الفاخرة، المصنوعة من مواد استثنائية وتفاصيل مدروسة.",
    
    // Footer
    information: "معلومات",
    about: "عن سيلينو",
    stores: "المتاجر",
    sustainability: "الاستدامة",
    careers: "وظائف",
    clientServices: "خدمات العملاء",
    contact: "اتصل بنا",
    faq: "الأسئلة الشائعة",
    shipping: "الشحن والإرجاع",
    productCare: "العناية بالمنتج",
    legal: "قانوني",
    terms: "الشروط والأحكام",
    privacy: "سياسة الخصوصية",
    cookies: "سياسة ملفات الكوكيز",
    accessibility: "إمكانية الوصول",
    followUs: "تابعنا",
    newsletter: "النشرة الإخبارية",
    subscribeText: "اشترك للحصول على التحديثات والوصول إلى العروض الحصرية والمزيد.",
    subscribe: "اشتراك",
    yourEmail: "بريدك الإلكتروني",
    allRightsReserved: "جميع الحقوق محفوظة"
  }
};

// Type for supported languages
type LanguageCode = 'en' | 'fr' | 'ar';

// Type for the context
type LanguageContextType = {
  language: LanguageCode;
  setLanguage: (lang: LanguageCode) => void;
  t: (key: keyof typeof translations.en) => string;
  dir: 'ltr' | 'rtl';
};

// Create the context with a default value
const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

// Provider component
export function LanguageProvider({ children }: { children: ReactNode }) {
  // Default to English
  const [language, setLanguageState] = useState<LanguageCode>('en');
  
  // Set the language and update the document
  const setLanguage = (lang: LanguageCode) => {
    localStorage.setItem('selectedLanguage', lang);
    setLanguageState(lang);
    
    // Set document direction
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = lang;
  };
  
  // Translation function
  const t = (key: keyof typeof translations.en): string => {
    return translations[language][key] || translations.en[key] || key;
  };
  
  // Get current direction
  const dir: 'ltr' | 'rtl' = language === 'ar' ? 'rtl' : 'ltr';
  
 // Load saved language on initial render
useEffect(() => {
    const savedLanguage = localStorage.getItem('selectedLanguage') as LanguageCode;
    if (savedLanguage && ['en', 'fr', 'ar'].includes(savedLanguage)) {
      setLanguage(savedLanguage);
    } else {
      // Default to English if no valid saved language
      setLanguage('en');
    }
  }, []);
  
  return (
    <LanguageContext.Provider value={{ language, setLanguage, t, dir }}>
      {children}
    </LanguageContext.Provider>
  );
}

// Custom hook to use the language context
export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}