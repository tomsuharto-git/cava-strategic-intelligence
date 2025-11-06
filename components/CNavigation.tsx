'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Building2, Users, MessageSquare, TrendingUp, Target, Globe, BookOpen } from 'lucide-react';

const navItems = [
  { href: '/', label: 'Overview', icon: BookOpen },
  { href: '/company', label: 'Company', icon: Building2 },
  { href: '/consumer', label: 'Consumer', icon: Users },
  { href: '/communications', label: 'Communications', icon: MessageSquare },
  { href: '/category', label: 'Category', icon: TrendingUp },
  { href: '/competition', label: 'Competition', icon: Target },
  { href: '/culture', label: 'Culture', icon: Globe },
];

export default function CNavigation() {
  const pathname = usePathname();

  return (
    <nav className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-cava-olive-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-3 group">
            <div className="w-10 h-10 bg-gradient-to-br from-cava-olive-500 to-cava-terracotta-500 rounded-lg flex items-center justify-center transform group-hover:scale-105 transition-transform">
              <span className="text-white font-bold text-xl">C</span>
            </div>
            <div>
              <div className="text-lg font-bold text-gray-900">CAVA USA</div>
              <div className="text-xs text-cava-olive-600">Strategic Intelligence</div>
            </div>
          </Link>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center space-x-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href || (item.href !== '/' && pathname.startsWith(item.href));

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`
                    flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium
                    transition-all duration-200
                    ${isActive
                      ? 'bg-cava-olive-100 text-cava-olive-800'
                      : 'text-gray-600 hover:bg-cava-warm-50 hover:text-cava-olive-700'
                    }
                  `}
                >
                  <Icon className="w-4 h-4" />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </div>

          {/* Master Brief Button */}
          <Link
            href="/master-brief"
            className={`
              hidden md:flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-semibold
              transition-all duration-200
              ${pathname === '/master-brief'
                ? 'bg-cava-terracotta-500 text-white'
                : 'bg-cava-terracotta-100 text-cava-terracotta-800 hover:bg-cava-terracotta-200'
              }
            `}
          >
            <BookOpen className="w-4 h-4" />
            <span>Master Brief</span>
          </Link>
        </div>

        {/* Mobile Navigation */}
        <div className="md:hidden pb-3 space-y-1">
          <div className="flex flex-wrap gap-2">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href || (item.href !== '/' && pathname.startsWith(item.href));

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`
                    flex items-center space-x-1 px-3 py-1.5 rounded-md text-xs font-medium
                    ${isActive
                      ? 'bg-cava-olive-100 text-cava-olive-800'
                      : 'text-gray-600 hover:bg-cava-warm-50'
                    }
                  `}
                >
                  <Icon className="w-3 h-3" />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </div>
          <Link
            href="/master-brief"
            className={`
              flex items-center justify-center space-x-2 px-3 py-1.5 rounded-md text-xs font-semibold w-full
              ${pathname === '/master-brief'
                ? 'bg-cava-terracotta-500 text-white'
                : 'bg-cava-terracotta-100 text-cava-terracotta-800'
              }
            `}
          >
            <BookOpen className="w-3 h-3" />
            <span>Master Brief</span>
          </Link>
        </div>
      </div>
    </nav>
  );
}
