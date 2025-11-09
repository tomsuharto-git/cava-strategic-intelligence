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
  variant?: 'default' | 'compact' | 'bulleted';
  implication?: string;
}

const priorityConfig = {
  critical: {
    badge: '🔴 Critical',
    borderColor: '#CD5C5C',
    badgeColor: 'text-red-700 bg-red-100',
  },
  important: {
    badge: '🟡 Important',
    borderColor: '#F4A460',
    badgeColor: 'text-amber-700 bg-amber-100',
  },
  supporting: {
    badge: '🟢 Supporting',
    borderColor: '#f9d000',
    badgeColor: 'text-green-700 bg-green-100',
  },
};

export function PriorityCard({
  priority,
  title,
  description,
  source,
  category,
  variant = 'default',
  implication,
}: PriorityCardProps) {
  const config = priorityConfig[priority];
  const isCompact = variant === 'compact';
  const isBulleted = variant === 'bulleted';

  // Parse description into bullet points if bulleted variant
  const bullets = isBulleted
    ? (() => {
        // First, normalize the text by removing unwanted line breaks and bullet points
        const normalizedText = description
          .replace(/\n•\n/g, ' ')  // Remove standalone bullet points with newlines
          .replace(/\n/g, ' ')      // Replace remaining newlines with spaces
          .replace(/\s+/g, ' ')     // Collapse multiple spaces into one
          .trim();

        // First, try to split by emoji indicators
        const emojiPattern = /(🔴|🟡|🟢)/;
        if (emojiPattern.test(normalizedText)) {
          // Split by emojis and filter out empty strings
          return normalizedText
            .split(emojiPattern)
            .filter(s => s.trim() && !emojiPattern.test(s))
            .map(s => {
              let text = s.trim();
              // Ensure proper punctuation
              if (!text.endsWith('.') && !text.endsWith('!') && !text.endsWith('?')) {
                text += '.';
              }
              return text;
            });
        }
        // Fallback: split by periods if no emojis found
        return normalizedText.split('. ').filter(s => s.trim()).map(s => {
          let text = s.trim();
          if (!text.endsWith('.')) {
            text += '.';
          }
          return text;
        });
      })()
    : [];

  // Helper function to process markdown in text
  const processMarkdown = (text: string) => {
    return text
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      .replace(/\[Source:.*?\]/g, '');
  };

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
      className={`
        bg-white rounded-xl border-2
        hover:shadow-2xl
        transition-shadow duration-300
        ${isCompact ? 'p-4' : 'p-6'}
      `}
      style={{
        borderLeft: `4px solid ${config.borderColor}`
      }}
    >
      {/* Only show badge section if not bulleted variant */}
      {!isBulleted && (
        <div className="flex items-center justify-between mb-3">
          {category && (
            <span
              className="text-sm font-bold uppercase tracking-wide px-3 py-1.5 rounded"
              style={{
                color: config.borderColor,
                backgroundColor: `${config.borderColor}15`
              }}
            >
              {category}
            </span>
          )}
          <span className={`text-xs font-bold uppercase tracking-wide px-2 py-1 rounded ${config.badgeColor}`}>
            {config.badge}
          </span>
        </div>
      )}

      {!isBulleted && (
        <h3 className={`font-semibold text-gray-900 leading-tight ${isCompact ? 'text-lg mb-2' : 'text-xl mb-3'}`}>
          {title}
        </h3>
      )}

      {isBulleted ? (
        <ul className="space-y-2">
          {bullets.map((bullet, index) => (
            <li key={index} className="text-gray-700 leading-relaxed text-lg flex">
              <span className="mr-2">•</span>
              <span dangerouslySetInnerHTML={{ __html: processMarkdown(bullet) }} />
            </li>
          ))}
        </ul>
      ) : (
        <div
          className={`text-gray-600 leading-relaxed ${isCompact ? 'text-sm' : 'text-base'} prose prose-lg max-w-none`}
          dangerouslySetInnerHTML={{
            __html: description
              .replace(/\n\n/g, '</p><p>')
              .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
              .replace(/^\*\*(.+?)\*\*$/gm, '<strong>$1</strong>')
              .replace(/\[Source:.*?\]/g, '')
          }}
        />
      )}

      {/* Implication Badge */}
      {implication && (
        <div className="mt-4 pt-4 border-t border-gray-200">
          <div className="flex items-start gap-3">
            <span className="text-xs font-bold uppercase tracking-wide px-2.5 py-1.5 rounded bg-cava-olive-100 text-cava-olive-700 shrink-0">
              Implication
            </span>
            <p className="text-gray-700 leading-relaxed text-base font-medium">
              {implication}
            </p>
          </div>
        </div>
      )}
    </motion.div>
  );
}
