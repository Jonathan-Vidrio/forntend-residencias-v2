import { PageContent } from '@/core';
import { ServiceTypesTable } from '@/modules/services/components/tables/service-types-table';

export default function ServiceTypesPage() {
  return (
    <PageContent title='Service Types'>
      <ServiceTypesTable />
    </PageContent>
  );
}
