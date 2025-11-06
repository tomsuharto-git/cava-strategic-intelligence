import React from 'react';

interface SectionHeaderProps {
  icon?: React.ReactNode;
  title: string;
  subtitle?: string;
  priority?: 'critical' | 'important' | 'supporting';
}

export default function SectionHeader({ icon, title, subtitle, priority }: SectionHeaderProps) {
  const priorityColors = {
    critical: 'border-l-red-500 bg-red-50/50',
    important: 'border-l-yellow-500 bg-yellow-50/50',
    supporting: 'border-l-green-500 bg-green-50/50',
  };

  return (
    <div className={`
      border-l-4 pl-4 py-3 mb-6
      ${priority ? priorityColors[priority] : 'border-l-cava-olive-500 bg-cava-olive-50/30'}
    `}>
      <div className="flex items-center space-x-3">
        {icon && <div className="text-cava-olive-600">{icon}</div>}
        <div>
          <h2 className="text-2xl font-bold text-gray-900">{title}</h2>
          {subtitle && <p className="text-sm text-gray-600 mt-1">{subtitle}</p>}
        </div>
      </div>
    </div>
  );
}
