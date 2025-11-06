import { Building2 } from 'lucide-react';
import CPageTemplate from '@/components/CPageTemplate';
import companyData from '@/data/company.json';

export default function CompanyPage() {
  return <CPageTemplate icon={Building2} title="Company Analysis" data={companyData} />;
}
