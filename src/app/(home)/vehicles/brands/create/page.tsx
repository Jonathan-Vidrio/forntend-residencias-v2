import { PageContent } from '@/core';
import { CreateVehicleBrandForm } from '@/modules/vehicles/components/forms/create-vehicle-brand-form';

export default function CreateVehicleBrandPage() {
  return (
    <PageContent title='Create Vehicle Brand' className='w-full flex flex-col justify-center items-center gap-y-20'>
      <CreateVehicleBrandForm className='w-1/2' />
    </PageContent>
  );
}
