import { PageContent } from '@/core';
import { UpdateVehicleModelForm } from '@/modules/vehicles/components/forms/update-vehicle-model-form';

type Params = Promise<{ id: string }>;

export default async function UpdateVehicleModelPage({ params }: { params: Params }) {
  const { id } = await params;

  return (
    <PageContent title='Update Vehicle Model' className='flex justify-center'>
      <UpdateVehicleModelForm id={id} className='w-1/2' />
    </PageContent>
  );
}
