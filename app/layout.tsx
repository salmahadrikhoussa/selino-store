import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import RootLayout from './components/layout/RootLayout';
import { LanguageProvider } from './context/LanguageContext';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Selino - Premium Fashion Store',
  description: 'Shop the latest dresses, shirts and seasonal collections',
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <LanguageProvider>
          <RootLayout>{children}</RootLayout>
        </LanguageProvider>
      </body>
    </html>
  );
};