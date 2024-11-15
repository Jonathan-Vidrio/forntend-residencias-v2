import { PageContent } from '@/core';
import { VehicleBrandDetails } from '@/modules/vehicles/components/details/vehicle-brand-details';

type Params = Promise<{ id: string }>;

export default async function DetailsVehicleBrandPage({ params }: { params: Params }) {
  const { id } = await params;

  return (
    <PageContent title='Vehicle Brand Details'>
      <VehicleBrandDetails id={id} />
    </PageContent>
  );
}
