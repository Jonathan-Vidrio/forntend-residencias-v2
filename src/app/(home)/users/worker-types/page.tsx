import { PageContent } from '@/core';
import { WorkerTypesTable } from '@/modules/users/ components/tables/worker-types-table';

export default function WorkerTypesPage() {
  return (
    <PageContent title='Worker Types'>
      <WorkerTypesTable />
    </PageContent>
  );
}
