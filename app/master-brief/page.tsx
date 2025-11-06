import { BookOpen } from 'lucide-react';
import CPageTemplate from '@/components/CPageTemplate';
import masterData from '@/data/master.json';

export default function MasterBriefPage() {
  return (
    <div>
      <div className="bg-gradient-to-r from-cava-terracotta-500 to-cava-olive-600 text-white py-8 mb-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center space-x-4">
            <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center">
              <BookOpen className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="text-4xl font-bold">Master Strategic Brief</h1>
              <p className="text-cava-warm-100 mt-2">
                Comprehensive synthesis of all 6Cs dimensions with strategic priorities and investment recommendations
              </p>
            </div>
          </div>
        </div>
      </div>
      <CPageTemplate icon={BookOpen} title="" data={masterData} />
    </div>
  );
}
