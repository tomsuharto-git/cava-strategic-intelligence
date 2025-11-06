import React from 'react';
import { Lightbulb, TrendingUp, Target } from 'lucide-react';

interface StrategicStoryProps {
  challenge?: string;
  insight?: string;
  imperative?: string;
}

export default function StrategicStory({ challenge, insight, imperative }: StrategicStoryProps) {
  if (!challenge && !insight && !imperative) return null;

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 my-8">
      {challenge && (
        <div className="bg-gradient-to-br from-red-50 to-red-100 border border-red-200 rounded-lg p-6">
          <div className="flex items-center space-x-3 mb-4">
            <div className="w-10 h-10 bg-red-500 rounded-lg flex items-center justify-center">
              <TrendingUp className="w-5 h-5 text-white" />
            </div>
            <h3 className="text-lg font-bold text-gray-900">The Challenge</h3>
          </div>
          <p className="text-sm text-gray-700 leading-relaxed">{challenge}</p>
        </div>
      )}

      {insight && (
        <div className="bg-gradient-to-br from-yellow-50 to-yellow-100 border border-yellow-200 rounded-lg p-6">
          <div className="flex items-center space-x-3 mb-4">
            <div className="w-10 h-10 bg-yellow-500 rounded-lg flex items-center justify-center">
              <Lightbulb className="w-5 h-5 text-white" />
            </div>
            <h3 className="text-lg font-bold text-gray-900">The Insight</h3>
          </div>
          <p className="text-sm text-gray-700 leading-relaxed">{insight}</p>
        </div>
      )}

      {imperative && (
        <div className="bg-gradient-to-br from-cava-olive-50 to-cava-olive-100 border border-cava-olive-200 rounded-lg p-6">
          <div className="flex items-center space-x-3 mb-4">
            <div className="w-10 h-10 bg-cava-olive-600 rounded-lg flex items-center justify-center">
              <Target className="w-5 h-5 text-white" />
            </div>
            <h3 className="text-lg font-bold text-gray-900">The Imperative</h3>
          </div>
          <p className="text-sm text-gray-700 leading-relaxed font-medium">{imperative}</p>
        </div>
      )}
    </div>
  );
}
