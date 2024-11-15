import { PageContent } from '@/core';
import { UsersTable } from '@/modules/users/ components/tables/users-table';

export default function UsersPage() {
  return (
    <PageContent title='Users'>
      <UsersTable />
    </PageContent>
  );
}
