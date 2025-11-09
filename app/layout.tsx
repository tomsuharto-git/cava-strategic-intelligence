import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { Header } from '@/components/Header';

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
        <Header />
        <main className="pt-16">
          {children}
        </main>
      </body>
    </html>
  );
}
