import { PageContent } from "@/core";
import { ResourceDetails } from "@/modules/services/components/details/resource-details";

export default async function DetailsResourcePage(props: { params: Promise<{ resource_id: string }> }) {
  const params = await props.params;
  const { resource_id } = params;

  return (
    <PageContent title='Service Details'>
      <ResourceDetails id={resource_id} />
    </PageContent>
  );
}
