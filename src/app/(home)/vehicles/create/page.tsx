import { PageContent } from '@/core';
import { CreateVehicleForm } from '@/modules/vehicles/components/forms/create-vehicle-form';

export default function CreateVehiclePage() {
  return (
    <PageContent title='Create Vehicle' className='flex justify-center'>
      <CreateVehicleForm className='w-1/2' />
    </PageContent>
  );
}
