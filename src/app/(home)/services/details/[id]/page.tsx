import { PageContent } from '@/core';
import { ServiceDetails } from '@/modules/services/components/details/service-details';

export default async function DetailsServicePage(props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  const { id } = params;

  return (
    <PageContent title='Service Details'>
      <ServiceDetails id={id} />
    </PageContent>
  );
}
