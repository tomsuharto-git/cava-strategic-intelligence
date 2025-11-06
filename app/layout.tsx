import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import CNavigation from '@/components/CNavigation';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'CAVA USA Strategic Intelligence | Flavor Seekers Strategy',
  description: 'Comprehensive strategic analysis of CAVA Group\'s position in the US fast-casual Mediterranean market, targeting Flavor Seekers.',
  keywords: 'CAVA, Mediterranean fast-casual, strategic analysis, Flavor Seekers, restaurant strategy',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <CNavigation />
        <main className="min-h-screen">
          {children}
        </main>
        <footer className="bg-cava-olive-900 text-white py-8 mt-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <p className="text-cava-olive-200">
                CAVA USA Strategic Intelligence • November 2025
              </p>
              <p className="text-cava-olive-400 text-sm mt-2">
                Strategic analysis focused on Flavor Seekers segment
              </p>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
