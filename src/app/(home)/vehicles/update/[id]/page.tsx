import { PageContent } from '@/core';
import { UpdateVehicleForm } from '@/modules/vehicles/components/forms/update-vehicle-form';

export default async function UpdateVehiclePage(props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  const { id } = params;

  return (
    <PageContent title='Update Vehicle' className='flex justify-center'>
      <UpdateVehicleForm id={id} className='w-1/2' />
    </PageContent>
  );
}
