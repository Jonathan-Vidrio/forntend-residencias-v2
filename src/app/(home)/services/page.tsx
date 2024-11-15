import { PageContent } from '@/core';
import { ServicesTable } from '@/modules/services/components/tables/services-table';

export default function ServicesPage() {
  return (
    <PageContent title='Services'>
      <ServicesTable />
    </PageContent>
  );
}
