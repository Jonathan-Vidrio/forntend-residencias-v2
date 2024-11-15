import { PageContent } from '@/core';
import { CreateWorkerTypeForm } from '@/modules/users/ components/forms/create-worker-type-form';

export default function CreateWorkerTypePage() {
  return (
    <PageContent title='Create Worker Type' className='w-full flex flex-col justify-center items-center gap-y-20'>
      <CreateWorkerTypeForm className='w-1/2' />
    </PageContent>
  );
}
