import { PageContent } from '@/core';
import { WorkerTypeDetails } from '@/modules/users/ components/details/worker-type-details';

export default async function DetailsWorkerTypePage(props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  const { id } = params;

  return (
    <PageContent title='Worker Type Details'>
      <WorkerTypeDetails id={id} />
    </PageContent>
  );
}
