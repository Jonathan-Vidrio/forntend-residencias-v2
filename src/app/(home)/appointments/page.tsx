import { PageContent } from '@/core';
import { AppointmentsTable } from '@/modules/appointment/components/tables/appointments-table';

/**
 * Renders the Appointments page.
 *
 * This page displays a table listing all appointments.
 *
 * @component
 * @returns {JSX.Element} The appointments page component.
 */
export default function AppointmentsPage(): JSX.Element {
  return (
    <PageContent title='Appointments'>
      <AppointmentsTable />
    </PageContent>
  );
}
