'use client';

import { useState } from 'react';
import { Home, Building2, Package, Swords, Users, Globe, Megaphone, Menu, X } from 'lucide-react';

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

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
          {/* Logo */}
          <div className="flex items-center gap-3">
            <h1 className="text-xl font-bold" style={{color: '#f9d000'}}>CAVA USA Get Smart</h1>
            <span className="hidden sm:inline-block text-xs px-2 py-1 rounded font-medium" style={{backgroundColor: '#f9d000', color: '#00020d'}}>6Cs Framework</span>
          </div>

          {/* Desktop Navigation */}
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

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? (
              <X className="w-6 h-6 text-gray-700" />
            ) : (
              <Menu className="w-6 h-6 text-gray-700" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-200">
          <nav className="section-container py-4">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center gap-3 px-4 py-3 text-base font-medium text-gray-700 hover:bg-gray-50 rounded-lg transition-colors"
                >
                  <Icon className="w-5 h-5" style={{color: '#f9d000'}} />
                  <span>{item.label}</span>
                </a>
              );
            })}
          </nav>
        </div>
      )}
    </header>
  );
}
