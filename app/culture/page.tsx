import { Globe } from 'lucide-react';
import CPageTemplate from '@/components/CPageTemplate';
import cultureData from '@/data/culture.json';

export default function CulturePage() {
  return <CPageTemplate icon={Globe} title="Cultural Trends" data={cultureData} />;
}
