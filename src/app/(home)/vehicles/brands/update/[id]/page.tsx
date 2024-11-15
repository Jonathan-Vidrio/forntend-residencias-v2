import { PageContent } from '@/core';
import { UpdateVehicleBrandForm } from '@/modules/vehicles/components/forms/update-vehicle-brand-form';

type Params = Promise<{ id: string }>;

export default async function UpdateVehicleBrandPage({ params }: { params: Params }) {
  const { id } = await params;

  return (
    <PageContent title='Update Vehicle Brand' className='flex justify-center'>
      <UpdateVehicleBrandForm id={id} className='w-1/2' />
    </PageContent>
  );
}
