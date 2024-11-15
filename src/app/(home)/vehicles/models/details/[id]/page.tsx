import { PageContent } from '@/core';
import { VehicleModelDetails } from '@/modules/vehicles/components/details/vehicle-models-details';

type Params = Promise<{ id: string }>;

export default async function DetailsVehicleModelPage({ params }: { params: Params }) {
  const { id } = await params;

  return (
    <PageContent title='Vehicle Model Details'>
      <VehicleModelDetails id={id} />
    </PageContent>
  );
}
