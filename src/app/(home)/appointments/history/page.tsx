import { PageContent } from '@/core';
import { AppointmentsHistory } from '@/modules/appointment/components/tables/appointments-history';

export default function AppointmentsHistoryPage() {
  return (
    <PageContent title='Appointments History'>
      <AppointmentsHistory />
    </PageContent>
  );
}
