import { PageContent } from '@/core';
import { AppointmentsHistory } from '@/modules/appointment/components/tables/appointments-history';

/**
 * Renders the Appointments History page.
 *
 * This page displays a table showing the history of appointments.
 *
 * @component
 * @returns {JSX.Element} The appointments history page component.
 */
export default function AppointmentsHistoryPage(): JSX.Element {
  return (
    <PageContent title='Appointments History'>
      <AppointmentsHistory />
    </PageContent>
  );
}
