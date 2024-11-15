import { PageContent } from '@/core';
import { VehicleBrandsTable } from '@/modules/vehicles/components/tables/vehicle-brands-table';

export default function VehicleBrandsPage() {
  return (
    <PageContent title='Vehicle Brands'>
      <VehicleBrandsTable />
    </PageContent>
  );
}
