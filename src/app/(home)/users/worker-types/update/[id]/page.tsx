import { PageContent } from '@/core';
import { UpdateWorkerTypeForm } from '@/modules/users/ components/forms/update-worker-type-form';

export default async function UpdateWorkerTypePage(props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  const { id } = params;

  return (
    <PageContent title='Update Worker Type' className='w-full flex flex-col justify-center items-center'>
      <UpdateWorkerTypeForm id={id} className='w-1/2' />
    </PageContent>
  );
}
