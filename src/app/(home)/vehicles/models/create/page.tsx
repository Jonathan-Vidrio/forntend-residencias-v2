import { PageContent } from '@/core';
import { CreateVehicleModelForm } from '@/modules/vehicles/components/forms/create-vehicle-model-form';

export default function CreateVehicleModelPage() {
  return (
    <PageContent title='Create Vehicle Model' className='flex justify-center'>
      <CreateVehicleModelForm className='w-1/2' />
    </PageContent>
  );
}
