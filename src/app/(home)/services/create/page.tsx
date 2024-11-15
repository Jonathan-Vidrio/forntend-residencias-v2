import { PageContent } from '@/core';
import { CreateServiceForm } from '@/modules/services/components/forms/create-service-form';

export default function CreateServicePage() {
  return (
    <PageContent title='Create Service' className='flex justify-center'>
      <CreateServiceForm className='w-1/2' />
    </PageContent>
  );
}
