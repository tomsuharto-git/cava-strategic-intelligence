'use client';

import { Home, Building2, Package, Swords, Users, Globe, Megaphone } from 'lucide-react';

export function Header() {
  const navItems = [
    { href: '/', label: 'Overview', icon: Home },
    { href: '/company', label: 'Company', icon: Building2 },
    { href: '/category', label: 'Category', icon: Package },
    { href: '/competition', label: 'Competition', icon: Swords },
    { href: '/consumer', label: 'Consumer', icon: Users },
    { href: '/culture', label: 'Culture', icon: Globe },
    { href: '/communications', label: 'Communications', icon: Megaphone },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 bg-white/95 backdrop-blur-sm border-b border-gray-200 z-50">
      <div className="section-container">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-3">
            <h1 className="text-xl font-bold" style={{color: '#f9d000'}}>CAVA USA Get Smart</h1>
            <span className="text-xs px-2 py-1 rounded font-medium" style={{backgroundColor: '#f9d000', color: '#00020d'}}>6Cs Framework</span>
          </div>
          <nav className="hidden md:flex items-center gap-6">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <a
                  key={item.href}
                  href={item.href}
                  className="flex items-center gap-2 text-sm font-medium text-gray-700 hover:text-[#f9d000] transition-colors"
                >
                  <Icon className="w-4 h-4" />
                  <span>{item.label}</span>
                </a>
              );
            })}
          </nav>
        </div>
      </div>
    </header>
  );
}
