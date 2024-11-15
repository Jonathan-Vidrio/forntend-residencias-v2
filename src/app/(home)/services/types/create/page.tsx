import { PageContent } from '@/core';
import { CreateServiceTypeForm } from '@/modules/services/components/forms/create-service-type-form';

export default function CreateServiceType() {
  return (
    <PageContent title='Create Service Type' className='flex justify-center'>
      <CreateServiceTypeForm className='w-1/2' />
    </PageContent>
  );
}
