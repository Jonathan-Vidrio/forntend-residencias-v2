import { PageContent } from '@/core';
import { UpdateServiceTypeForm } from '@/modules/services/components/forms/update-service-type-form';

export default async function UpdateServiceTypePage(props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  const { id } = params;

  return (
    <PageContent title='Update Service Type' className='flex justify-center'>
      <UpdateServiceTypeForm id={id} className='w-1/2' />
    </PageContent>
  );
}
