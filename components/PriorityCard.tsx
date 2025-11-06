'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';

interface PriorityCardProps {
  priority: 'critical' | 'important' | 'supporting';
  title: string;
  description: string;
  source: {
    text: string;
    url: string;
  };
  category?: string;
}

const priorityConfig = {
  critical: {
    badge: '🔴 Critical',
    borderColor: '#CD5C5C',
    bgColor: 'rgba(205, 92, 92, 0.1)',
    badgeColor: 'text-red-700 bg-red-100',
  },
  important: {
    badge: '🟡 Important',
    borderColor: '#F4A460',
    bgColor: 'rgba(244, 164, 96, 0.1)',
    badgeColor: 'text-amber-700 bg-amber-100',
  },
  supporting: {
    badge: '🟢 Supporting',
    borderColor: '#556B2F',
    bgColor: 'rgba(85, 107, 47, 0.1)',
    badgeColor: 'text-green-700 bg-green-100',
  },
};

export function PriorityCard({
  priority,
  title,
  description,
  source,
  category,
}: PriorityCardProps) {
  const config = priorityConfig[priority];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      whileHover={{
        scale: 1.02,
        y: -8,
        transition: { duration: 0.2 }
      }}
      className="bg-white rounded-xl border-2 hover:shadow-2xl transition-shadow duration-300 p-6"
      style={{
        borderLeft: `4px solid ${config.borderColor}`,
        backgroundColor: config.bgColor
      }}
    >
      <div className="flex items-center justify-between mb-3">
        {category && (
          <span
            className="text-sm font-bold uppercase tracking-wide px-3 py-1.5 rounded"
            style={{
              color: config.borderColor,
              backgroundColor: config.bgColor
            }}
          >
            {category}
          </span>
        )}
        <span className={`text-xs font-bold uppercase tracking-wide px-2 py-1 rounded ${config.badgeColor}`}>
          {config.badge}
        </span>
      </div>

      <h3 className="font-semibold text-gray-900 leading-tight text-xl mb-3">
        {title}
      </h3>

      <div className="text-gray-600 leading-relaxed text-base prose prose-lg max-w-none">
        <p>{description}</p>
      </div>
    </motion.div>
  );
}
