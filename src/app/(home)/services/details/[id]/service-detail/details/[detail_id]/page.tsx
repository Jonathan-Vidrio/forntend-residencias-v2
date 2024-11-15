import { PageContent } from '@/core';
import { ServiceDetailDetails } from '@/modules/services/components/details/service-detail-details';

export default async function DetailsServiceDetailPage(props: { params: Promise<{ detail_id: string }> }) {
  const params = await props.params;
  const { detail_id } = params;

  return (
    <PageContent title='Service Detail'>
      <ServiceDetailDetails id={detail_id} />
    </PageContent>
  );
}
