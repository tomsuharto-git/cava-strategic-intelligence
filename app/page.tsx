'use client';

import { CNavigation } from '@/components/CNavigation';
import { PriorityCard } from '@/components/PriorityCard';
import { Building2, Users, MessageSquare, TrendingUp, Target, Globe } from 'lucide-react';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import CountUp from 'react-countup';
import masterData from '@/data/master.json';
import companyData from '@/data/company.json';
import categoryData from '@/data/category.json';
import competitionData from '@/data/competition.json';
import consumerData from '@/data/consumer.json';
import cultureData from '@/data/culture.json';
import communicationsData from '@/data/communications.json';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5 }
  }
};

export default function Home() {
  const statsRef = useRef(null);
  const isStatsInView = useInView(statsRef, { once: true, margin: "-100px" });

  const cInsights = [
    {
      title: companyData.tldr[0]?.title || 'Company',
      text: companyData.tldr[0]?.implication || '',
      href: '/company',
      icon: Building2
    },
    {
      title: categoryData.tldr[0]?.title || 'Category',
      text: categoryData.tldr[0]?.implication || '',
      href: '/category',
      icon: TrendingUp
    },
    {
      title: competitionData.tldr[0]?.title || 'Competition',
      text: competitionData.tldr[0]?.implication || '',
      href: '/competition',
      icon: Target
    },
    {
      title: consumerData.tldr[0]?.title || 'Consumer',
      text: consumerData.tldr[0]?.implication || '',
      href: '/consumer',
      icon: Users
    },
    {
      title: cultureData.tldr[0]?.title || 'Culture',
      text: cultureData.tldr[0]?.implication || '',
      href: '/culture',
      icon: Globe
    },
    {
      title: communicationsData.tldr[0]?.title || 'Communications',
      text: communicationsData.tldr[0]?.implication || '',
      href: '/communications',
      icon: MessageSquare
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="text-white py-24" style={{background: 'linear-gradient(135deg, #2F4F2F 0%, #556B2F 100%)'}}>
        <div className="section-container">
          <div className="max-w-4xl">
            <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
              CAVA USA Get Smart
            </h1>
            <p className="text-xl md:text-2xl leading-relaxed" style={{color: 'rgba(255,255,255,0.9)'}}>
              A comprehensive 6Cs analysis revealing CAVA's path to Mediterranean fast-casual dominance through Flavor Seeker strategy, operational excellence, and strategic brand-building in America's evolving dining landscape.
            </p>
          </div>
        </div>
      </section>

      {/* Executive Summary */}
      <section className="section-container py-16">
        <div className="bg-white rounded-2xl shadow-lg p-8 md:p-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">
            Executive Summary
          </h2>
          <div className="prose prose-lg max-w-none">
            <p className="text-lg text-gray-700 leading-relaxed">
              CAVA stands at a once-in-decade cultural and category convergence: Mediterranean fast-casual ($14.2B market, 10.8% CAGR) has no national competitor, Gen Z's $2T wellness revolution prioritizes functional nutrition over restrictive diets, and ethnic cuisine mainstreaming validates bold flavors. The company's operational excellence—<strong>352 units generating $954M revenue (+35.1%)</strong>, <strong>18.1% comps</strong>, <strong>12.9% traffic growth</strong>, <strong>25.6% margins</strong>—proves product-market fit. But <strong>67% awareness in mature markets versus competitors' 90%</strong>, and only 40% in new geographies, creates growth bottleneck requiring aggressive brand-building.
            </p>
            <div ref={statsRef} className="grid md:grid-cols-3 gap-6 my-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={isStatsInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.6, delay: 0 }}
                className="rounded-lg p-6 border-2"
                style={{backgroundColor: 'rgba(85, 107, 47, 0.1)', borderColor: '#556B2F'}}
              >
                <div className="text-4xl font-bold mb-2" style={{color: '#556B2F'}}>
                  {isStatsInView && (
                    <>
                      <CountUp start={0} end={352} duration={2} />
                    </>
                  )}
                </div>
                <div className="text-sm font-semibold text-gray-700 uppercase tracking-wide">
                  Restaurant Units
                </div>
                <p className="text-sm text-gray-600 mt-2">
                  Growing to 1,000+ by 2032 in Mediterranean category leadership play
                </p>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={isStatsInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.6, delay: 0.15 }}
                className="rounded-lg p-6 border-2"
                style={{backgroundColor: 'rgba(205, 92, 92, 0.1)', borderColor: '#CD5C5C'}}
              >
                <div className="text-4xl font-bold mb-2" style={{color: '#CD5C5C'}}>
                  {isStatsInView && (
                    <CountUp start={0} end={25.6} decimals={1} duration={2} suffix="%" />
                  )}
                </div>
                <div className="text-sm font-semibold text-gray-700 uppercase tracking-wide">
                  Restaurant-Level Margins
                </div>
                <p className="text-sm text-gray-600 mt-2">
                  Best-in-class unit economics with $2.8M AUV
                </p>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={isStatsInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="rounded-lg p-6 border-2"
                style={{backgroundColor: 'rgba(47, 79, 47, 0.1)', borderColor: '#2F4F2F'}}
              >
                <div className="text-4xl font-bold mb-2" style={{color: '#2F4F2F'}}>
                  {isStatsInView && (
                    <>
                      <CountUp start={0} end={12.9} decimals={1} duration={2} suffix="%" />
                    </>
                  )}
                </div>
                <div className="text-sm font-semibold text-gray-700 uppercase tracking-wide">
                  Traffic Growth Q3 2024
                </div>
                <p className="text-sm text-gray-600 mt-2">
                  Exceptional performance while industry declined 3.3%
                </p>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* 6Cs Key Insights */}
      <section className="section-container py-16">
        <div className="mb-8">
          <h2 className="text-4xl font-bold text-gray-900 mb-3">
            6Cs Key Insights
          </h2>
          <p className="text-xl text-gray-600">
            Critical findings across each dimension of analysis
          </p>
        </div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {cInsights.map((insight) => {
            const Icon = insight.icon;
            return (
              <motion.a
                key={insight.href}
                href={insight.href}
                variants={itemVariants}
                whileHover={{ scale: 1.03, y: -4 }}
                transition={{ duration: 0.2 }}
                className="group bg-white rounded-xl p-6 border-2 border-gray-200 hover:shadow-xl transition-all duration-300"
                style={{'--hover-border': '#556B2F'} as any}
              >
                <div className="flex items-center gap-3 mb-4">
                  <Icon className="w-8 h-8 text-gray-700 transition-colors" />
                  <h3 className="text-xl font-bold text-gray-900 transition-colors">
                    {insight.title}
                  </h3>
                </div>
                <p className="text-sm text-gray-600 leading-relaxed">
                  {insight.text}
                </p>
                <div className="mt-4 font-medium text-sm group-hover:translate-x-1 transition-transform inline-block" style={{color: '#556B2F'}}>
                  Read more →
                </div>
              </motion.a>
            );
          })}
        </motion.div>
      </section>

      {/* Meta Strategic Story */}
      <section className="section-container py-16">
        <div className="mb-8">
          <h2 className="text-4xl font-bold text-gray-900 mb-3">
            Strategic Imperative
          </h2>
          <p className="text-xl text-gray-600">
            The strategic narrative driving CAVA's transformation from regional player to national Mediterranean leader
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-8 md:p-12">
          <div className="grid md:grid-cols-3 gap-8">
            <div className="border-l-4 pl-6" style={{borderColor: '#CD5C5C'}}>
              <h3 className="text-xl font-bold mb-3" style={{color: '#CD5C5C'}}>Challenge</h3>
              <p className="text-gray-700">
                CAVA achieved rare operational excellence (18.1% comps, 25.6% margins, 12.9% traffic when category declined 3.3%) but faces structural growth constraint: low brand awareness (40-67% vs. 90% competitor baseline) limits new market velocity, Flavor Seekers' promiscuity across 5-7 brands prevents frequency lock-in, and capital-intensive company-owned model demands patient investment before critical mass. Meanwhile, Chipotle's shadow looms—if they deploy 3,600-unit scale toward Mediterranean category, CAVA's first-mover advantage evaporates overnight.
              </p>
            </div>
            <div className="border-l-4 pl-6" style={{borderColor: '#556B2F'}}>
              <h3 className="text-xl font-bold mb-3" style={{color: '#556B2F'}}>Insight</h3>
              <p className="text-gray-700">
                Flavor Seekers aren't choosing restaurants—they're choosing identities. Mediterranean dining signals desirable attributes ("I'm health-conscious but not boring, culturally curious, adventurous, sustainably minded") that Chipotle's Mexican, Sweetgreen's salads, and QSR can't deliver simultaneously. Mediterranean cuisine resolves their values-behavior gap: inherently plant-forward, globally respected for health, culturally authentic with regional diversity, and bold-flavored through spices and healthy fats. CAVA's role: make virtue effortless.
              </p>
            </div>
            <div className="border-l-4 pl-6" style={{borderColor: '#2F4F2F'}}>
              <h3 className="text-xl font-bold mb-3" style={{color: '#2F4F2F'}}>Imperative</h3>
              <p className="text-gray-700">
                Transform CAVA from "fast-casual Mediterranean option" to "Flavor Seekers' identity HQ" where weekly Mediterranean dining becomes badge of adventurous, wellness-optimized, culturally curious self. Accelerate unit growth to 80-100 annually prioritizing college towns, adventure sport markets, and urban cores. Launch "Mediterranean Authority" campaign owning authenticity before Chipotle enters. Gamify loyalty through progression systems converting occasional visits to 2-3x/week frequency. Execute in 18 months or face permanent #2 positioning.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Strategic Opportunities */}
      <section className="section-container py-16">
        <div className="mb-8">
          <h2 className="text-4xl font-bold text-gray-900 mb-3">
            Strategic Priorities
          </h2>
          <p className="text-xl text-gray-600">
            Three key opportunities for transforming from regional player to Mediterranean category leader
          </p>
        </div>

        <div className="grid md:grid-cols-1 gap-6">
          <PriorityCard
            priority="critical"
            title="Mediterranean Authority Campaign (18-Month Timeline)"
            description="Own 'authentic Mediterranean' positioning through ingredient sourcing storytelling, chef credibility, and health science validation before Chipotle/Panera expand Mediterranean offerings. Establish supply relationships with Greek olive oil producers, Lebanese spice cooperatives, Turkish protein suppliers. Secure Mayo Clinic or Blue Zones partnership. Investment: $40M. Expected: Defensive moat against Chipotle entry, 80% 'Mediterranean specialist' awareness."
            source={{ text: 'Priority 1', url: '#authority' }}
            category="Authority"
          />
          <PriorityCard
            priority="critical"
            title="Flavor Seeker Loyalty Gamification (12-Month Build)"
            description="Convert occasional visitors (1-2x/month, 60% of base) to weekly loyalists (2-3x/week) through Mediterranean Passport progression system, creator partnerships, and community challenges. Target 40% enrollment (1.3M users) achieving 2x visit frequency. Integration with fitness apps, college brand ambassadors, and 100 micro-influencers. Investment: $25M. Expected: $160-200M incremental revenue, $40-50M EBITDA with no new real estate."
            source={{ text: 'Priority 2', url: '#loyalty' }}
            category="Loyalty"
          />
          <PriorityCard
            priority="important"
            title="Geographic White Space Acceleration (36-Month Execution)"
            description="Increase unit opening pace from 56-58 to 80-100 annually, prioritizing high-density Flavor Seeker markets (college towns, adventure sport hubs, urban cores). Target 700-1,000 units by 2028 establishing 'CAVA = Mediterranean' mental availability before competitive collision. Focus on Boulder, Austin, Portland, Nashville with 5-7 unit clusters. Investment: $180M. Expected: Coast-to-coast presence, $3-4B revenue scale, defensive positioning."
            source={{ text: 'Priority 3', url: '#expansion' }}
            category="Expansion"
          />
        </div>
      </section>

      {/* 6Cs Navigation */}
      <section className="section-container py-16">
        <div className="mb-8">
          <h2 className="text-4xl font-bold text-gray-900 mb-3">
            Explore the 6Cs Framework
          </h2>
          <p className="text-xl text-gray-600">
            Dive deep into each dimension of the strategic analysis
          </p>
        </div>

        <CNavigation />
      </section>

      {/* Footer */}
      <footer className="text-white py-12 mt-16" style={{backgroundColor: '#2F4F2F'}}>
        <div className="section-container">
          <div className="text-center">
            <p className="text-sm" style={{color: 'rgba(255,255,255,0.9)'}}>
              CAVA USA Get Smart • 6Cs Framework • {new Date().getFullYear()}
            </p>
            <p className="text-xs mt-2" style={{color: 'rgba(255,255,255,0.6)'}}>
              United States Market Focus • Flavor Seekers Strategy • November 2025
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
