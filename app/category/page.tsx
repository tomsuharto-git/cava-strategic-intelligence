import { TrendingUp } from 'lucide-react';
import CPageTemplate from '@/components/CPageTemplate';
import categoryData from '@/data/category.json';

export default function CategoryPage() {
  return <CPageTemplate icon={TrendingUp} title="Category Dynamics" data={categoryData} />;
}
