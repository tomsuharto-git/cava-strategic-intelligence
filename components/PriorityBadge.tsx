import React from 'react';
import { AlertCircle, AlertTriangle, Info } from 'lucide-react';

interface PriorityBadgeProps {
  level: 'critical' | 'important' | 'supporting';
  size?: 'sm' | 'md' | 'lg';
}

export default function PriorityBadge({ level, size = 'md' }: PriorityBadgeProps) {
  const config = {
    critical: {
      icon: AlertCircle,
      label: 'Critical',
      colors: 'bg-red-100 text-red-800 border-red-300',
    },
    important: {
      icon: AlertTriangle,
      label: 'Important',
      colors: 'bg-yellow-100 text-yellow-800 border-yellow-300',
    },
    supporting: {
      icon: Info,
      label: 'Supporting',
      colors: 'bg-green-100 text-green-800 border-green-300',
    },
  };

  const sizes = {
    sm: 'text-xs px-2 py-0.5',
    md: 'text-sm px-3 py-1',
    lg: 'text-base px-4 py-2',
  };

  const iconSizes = {
    sm: 'w-3 h-3',
    md: 'w-4 h-4',
    lg: 'w-5 h-5',
  };

  const { icon: Icon, label, colors } = config[level];

  return (
    <div className={`
      inline-flex items-center space-x-1.5 rounded-full border font-medium
      ${colors}
      ${sizes[size]}
    `}>
      <Icon className={iconSizes[size]} />
      <span>{label}</span>
    </div>
  );
}
