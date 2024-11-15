import { PageContent } from '@/core';
import { AppointmentsTable } from '@/modules/appointment/components/tables/appointments-table';

export default function AppointmentsPage() {
  return (
    <PageContent title='Appointments'>
      <AppointmentsTable />
    </PageContent>
  );
}
