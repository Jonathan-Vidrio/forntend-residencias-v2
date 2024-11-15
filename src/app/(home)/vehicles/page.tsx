import { PageContent } from '@/core';
import { VehiclesTable } from '@/modules/vehicles/components/tables/vehicles-table';

export default function VehiclesPage() {
  return (
    <PageContent title='Vehicles'>
      <VehiclesTable />
    </PageContent>
  );
}
