'use client';

import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

interface ExpandableSectionProps {
  title: string;
  children: React.ReactNode;
  defaultExpanded?: boolean;
  priority?: 'critical' | 'important' | 'supporting';
}

export default function ExpandableSection({
  title,
  children,
  defaultExpanded = true,
  priority,
}: ExpandableSectionProps) {
  const [isExpanded, setIsExpanded] = useState(defaultExpanded);

  const priorityColors = {
    critical: 'border-red-200 bg-red-50/30 hover:bg-red-50/50',
    important: 'border-yellow-200 bg-yellow-50/30 hover:bg-yellow-50/50',
    supporting: 'border-green-200 bg-green-50/30 hover:bg-green-50/50',
  };

  return (
    <div className={`
      border rounded-lg overflow-hidden transition-all duration-200
      ${priority ? priorityColors[priority] : 'border-cava-olive-200 bg-white hover:shadow-md'}
    `}>
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full flex items-center justify-between p-4 text-left"
      >
        <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
        {isExpanded ? (
          <ChevronUp className="w-5 h-5 text-cava-olive-600" />
        ) : (
          <ChevronDown className="w-5 h-5 text-cava-olive-600" />
        )}
      </button>

      {isExpanded && (
        <div className="px-4 pb-4 prose prose-sm max-w-none">
          {children}
        </div>
      )}
    </div>
  );
}
