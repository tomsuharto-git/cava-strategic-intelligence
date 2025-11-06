import Link from 'next/link';
import { Building2, Users, MessageSquare, TrendingUp, Target, Globe, ArrowRight, BookOpen } from 'lucide-react';
import PriorityBadge from '@/components/PriorityBadge';

// Import master brief data
import masterData from '@/data/master.json';

const categories = [
  {
    id: 'company',
    title: 'Company',
    description: 'Business performance, growth trajectory, and competitive position',
    icon: Building2,
    color: 'from-blue-500 to-blue-600',
    href: '/company',
  },
  {
    id: 'consumer',
    title: 'Consumer',
    description: 'Flavor Seekers: Bold, adventurous fast-casual customers',
    icon: Users,
    color: 'from-purple-500 to-purple-600',
    href: '/consumer',
  },
  {
    id: 'communications',
    title: 'Communications',
    description: 'Brand messaging, media strategy, and customer engagement',
    icon: MessageSquare,
    color: 'from-pink-500 to-pink-600',
    href: '/communications',
  },
  {
    id: 'category',
    title: 'Category',
    description: 'Fast-casual Mediterranean market dynamics and trends',
    icon: TrendingUp,
    color: 'from-green-500 to-green-600',
    href: '/category',
  },
  {
    id: 'competition',
    title: 'Competition',
    description: 'Competitive landscape and strategic positioning',
    icon: Target,
    color: 'from-red-500 to-red-600',
    href: '/competition',
  },
  {
    id: 'culture',
    title: 'Culture',
    description: 'Cultural trends shaping consumer behavior',
    icon: Globe,
    color: 'from-yellow-500 to-yellow-600',
    href: '/culture',
  },
];

export default function HomePage() {
  const { tldr, story, meta } = masterData;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Hero Section */}
      <div className="text-center mb-16">
        <div className="inline-block mb-4">
          <div className="w-20 h-20 bg-gradient-to-br from-cava-olive-500 to-cava-terracotta-500 rounded-2xl flex items-center justify-center">
            <span className="text-white font-bold text-4xl">C</span>
          </div>
        </div>
        <h1 className="text-5xl font-bold text-gray-900 mb-4">
          CAVA USA Strategic Intelligence
        </h1>
        <p className="text-xl text-gray-600 mb-2">
          Comprehensive 6Cs Analysis: Flavor Seekers Strategy
        </p>
        <p className="text-sm text-cava-olive-600">
          November 2025 • United States
        </p>
      </div>

      {/* Executive Summary */}
      <div className="bg-gradient-to-br from-cava-warm-50 to-cava-olive-50 border border-cava-olive-200 rounded-2xl p-8 mb-12">
        <div className="flex items-center space-x-3 mb-6">
          <BookOpen className="w-8 h-8 text-cava-terracotta-600" />
          <h2 className="text-3xl font-bold text-gray-900">Executive Summary</h2>
        </div>

        {tldr?.summary && (
          <div className="prose prose-lg max-w-none mb-6">
            <p className="text-gray-700 leading-relaxed">{tldr.summary}</p>
          </div>
        )}

        {tldr?.priority && typeof tldr.priority === 'object' && 'title' in tldr.priority && (
          <div className="bg-white border border-red-200 rounded-lg p-6 mt-6">
            <div className="flex items-start space-x-4">
              <PriorityBadge level="critical" size="lg" />
              <div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">
                  {(tldr.priority as any).title}
                </h3>
                <p className="text-gray-700">
                  {(tldr.priority as any).text}
                </p>
              </div>
            </div>
          </div>
        )}

        <div className="mt-8">
          <Link
            href="/master-brief"
            className="inline-flex items-center space-x-2 bg-cava-terracotta-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-cava-terracotta-600 transition-colors"
          >
            <span>Read Full Master Brief</span>
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </div>

      {/* Strategic Story */}
      {story && typeof story === 'object' && ((story as any).challenge || (story as any).insight || (story as any).imperative) && (
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Strategic Framework</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {(story as any).challenge && (
              <div className="bg-white border border-red-200 rounded-xl p-6 hover:shadow-lg transition-shadow">
                <h3 className="text-sm font-bold text-red-600 uppercase mb-3">The Challenge</h3>
                <p className="text-gray-700 text-sm leading-relaxed">{(story as any).challenge}</p>
              </div>
            )}
            {(story as any).insight && (
              <div className="bg-white border border-yellow-200 rounded-xl p-6 hover:shadow-lg transition-shadow">
                <h3 className="text-sm font-bold text-yellow-600 uppercase mb-3">The Insight</h3>
                <p className="text-gray-700 text-sm leading-relaxed">{(story as any).insight}</p>
              </div>
            )}
            {(story as any).imperative && (
              <div className="bg-white border border-cava-olive-200 rounded-xl p-6 hover:shadow-lg transition-shadow">
                <h3 className="text-sm font-bold text-cava-olive-600 uppercase mb-3">The Imperative</h3>
                <p className="text-gray-700 text-sm leading-relaxed font-medium">{(story as any).imperative}</p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* 6Cs Grid */}
      <div className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-6">Explore the 6Cs Analysis</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((category) => {
            const Icon = category.icon;
            return (
              <Link
                key={category.id}
                href={category.href}
                className="group bg-white border border-gray-200 rounded-xl p-6 hover:shadow-xl transition-all duration-200 hover:-translate-y-1"
              >
                <div className={`w-12 h-12 bg-gradient-to-br ${category.color} rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-cava-olive-700 transition-colors">
                  {category.title}
                </h3>
                <p className="text-sm text-gray-600 mb-4">{category.description}</p>
                <div className="flex items-center text-cava-olive-600 text-sm font-medium group-hover:text-cava-olive-700">
                  <span>Explore analysis</span>
                  <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
            );
          })}
        </div>
      </div>

      {/* Key Insights */}
      <div className="bg-white border border-cava-olive-200 rounded-2xl p-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-6">Key Strategic Insights</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="border-l-4 border-cava-terracotta-500 pl-4">
            <h3 className="text-lg font-bold text-gray-900 mb-2">Market Opportunity</h3>
            <p className="text-gray-700 text-sm">
              Mediterranean fast-casual is a $14.2B market growing at 10.8% CAGR with no national competitor.
              CAVA's 352 units face a clear path to 1,000+ unit goal by 2032.
            </p>
          </div>
          <div className="border-l-4 border-cava-olive-500 pl-4">
            <h3 className="text-lg font-bold text-gray-900 mb-2">Operational Excellence</h3>
            <p className="text-gray-700 text-sm">
              $2.8M average unit volumes, 25.6% restaurant-level margins, and 12.9% traffic growth
              demonstrate best-in-class execution in declining industry.
            </p>
          </div>
          <div className="border-l-4 border-yellow-500 pl-4">
            <h3 className="text-lg font-bold text-gray-900 mb-2">Awareness Challenge</h3>
            <p className="text-gray-700 text-sm">
              67% awareness in mature markets vs. 90%+ for competitors creates growth bottleneck.
              Flavor Seekers are the cultural unlock for rapid awareness expansion.
            </p>
          </div>
          <div className="border-l-4 border-red-500 pl-4">
            <h3 className="text-lg font-bold text-gray-900 mb-2">Strategic Window</h3>
            <p className="text-gray-700 text-sm">
              18-24 month window to establish Mediterranean authority before Chipotle or well-funded
              competitors enter category at scale.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
