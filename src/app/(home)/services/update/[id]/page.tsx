import { PageContent } from '@/core';
import { UpdateServiceForm } from '@/modules/services/components/forms/update-service-form';

export default async function UpdateServicePage(props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  const { id } = params;

  return (
    <PageContent title='Update Service' className='flex justify-center'>
      <UpdateServiceForm id={id} className='w-1/2' />
    </PageContent>
  );
}
