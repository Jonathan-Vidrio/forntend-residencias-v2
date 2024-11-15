import { PageContent } from '@/core';
import { ServiceTypeDetails } from '@/modules/services/components/details/service-type-details';

export default async function DetailsServiceTypePage(props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  const { id } = params;

  return (
    <PageContent title='Service Type Details'>
      <ServiceTypeDetails id={id} />
    </PageContent>
  );
}
