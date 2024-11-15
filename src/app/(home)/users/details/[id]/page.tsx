import { PageContent } from '@/core';
import { UserDetails } from '@/modules/users/ components/details/user-details';

export default async function DetailsUserPage(props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  const { id } = params;

  return (
    <PageContent title='User Details'>
      <UserDetails id={id} />
    </PageContent>
  );
}
