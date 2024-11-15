import { PageContent } from '@/core';
import { AppointmentDetails } from '@/modules/appointment/components/details/appointment-details';

export default async function DetailsAppointment(props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  const { id } = params;

  return (
    <PageContent title='Appointment Details'>
      <AppointmentDetails id={id} />
    </PageContent>
  );
}
