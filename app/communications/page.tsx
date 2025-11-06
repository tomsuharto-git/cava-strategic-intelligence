import { MessageSquare } from 'lucide-react';
import CPageTemplate from '@/components/CPageTemplate';
import communicationsData from '@/data/communications.json';

export default function CommunicationsPage() {
  return <CPageTemplate icon={MessageSquare} title="Communications Strategy" data={communicationsData} />;
}
