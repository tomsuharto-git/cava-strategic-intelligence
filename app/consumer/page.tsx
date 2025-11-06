import { Users } from 'lucide-react';
import CPageTemplate from '@/components/CPageTemplate';
import consumerData from '@/data/consumer.json';

export default function ConsumerPage() {
  return <CPageTemplate icon={Users} title="Consumer Insights: Flavor Seekers" data={consumerData} />;
}
