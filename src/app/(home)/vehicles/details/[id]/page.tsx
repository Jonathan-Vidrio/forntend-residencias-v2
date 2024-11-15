import { PageContent } from '@/core';
import { VehicleDetails } from '@/modules/vehicles/components/details/vehicle-details';

export default async function VehicleDetailsPage(props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  const { id } = params;

  return (
    <PageContent title='Vehicle Details'>
      <VehicleDetails id={id} />
    </PageContent>
  );
}
