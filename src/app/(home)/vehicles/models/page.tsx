import { PageContent } from '@/core';
import { VehicleModelsTable } from '@/modules/vehicles/components/tables/vehicle-models-table';

export default function VehicleModelsPage() {
  return (
    <PageContent title='Vehicle Models'>
      <VehicleModelsTable />
    </PageContent>
  );
}
