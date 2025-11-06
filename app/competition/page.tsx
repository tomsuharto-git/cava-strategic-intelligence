import { Target } from 'lucide-react';
import CPageTemplate from '@/components/CPageTemplate';
import competitionData from '@/data/competition.json';

export default function CompetitionPage() {
  return <CPageTemplate icon={Target} title="Competitive Analysis" data={competitionData} />;
}
