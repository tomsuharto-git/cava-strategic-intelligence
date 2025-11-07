'use client';

import Link from 'next/link';
import { Building2, Users, Megaphone, Package, Swords, Globe } from 'lucide-react';

interface CItem {
  title: string;
  icon: React.ComponentType<{ className?: string }>;
  href: string;
  description: string;
}

const cItems: CItem[] = [
  {
    title: 'Company',
    icon: Building2,
    href: '/company',
    description: 'Brand positioning, business model, and organizational capabilities',
  },
  {
    title: 'Category',
    icon: Package,
    href: '/category',
    description: 'Market dynamics, trends, and category drivers',
  },
  {
    title: 'Competition',
    icon: Swords,
    href: '/competition',
    description: 'Competitive landscape and positioning analysis',
  },
  {
    title: 'Consumer',
    icon: Users,
    href: '/consumer',
    description: 'Target audience, behaviors, needs, and segmentation',
  },
  {
    title: 'Culture',
    icon: Globe,
    href: '/culture',
    description: 'Cultural context, trends, and societal forces',
  },
  {
    title: 'Communications',
    icon: Megaphone,
    href: '/communications',
    description: 'Marketing strategy, messaging, and brand communications',
  },
];

export default function CNavigation() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {cItems.map((item) => {
        const Icon = item.icon;
        return (
          <Link
            key={item.href}
            href={item.href}
            className="group bg-white rounded-xl p-6 border-2 border-gray-200 hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
            style={{'--hover-border-color': '#f9d000'} as any}
          >
            <div className="mb-3">
              <Icon className="w-10 h-10 text-gray-700 transition-colors" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2 transition-colors">
              {item.title}
            </h3>
            <p className="text-base text-gray-600 leading-relaxed">
              {item.description}
            </p>
            <div className="mt-4 font-medium text-sm group-hover:translate-x-1 transition-transform inline-block" style={{color: '#f9d000'}}>
              Explore →
            </div>
          </Link>
        );
      })}
    </div>
  );
}
