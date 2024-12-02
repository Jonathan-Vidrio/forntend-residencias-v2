import { PageContent } from '@/core';
import { AppointmentDetails } from '@/modules/appointment/components/details/appointment-details';

/**
 * Renders the Appointment Details page.
 *
 * This page displays detailed information about a specific appointment.
 *
 * @async
 * @component
 * @param {Object} props - The component props.
 * @param {Promise<{ id: string }>} props.params - A promise resolving to an object containing the appointment ID.
 * @returns {Promise<JSX.Element>} The appointment details page component.
 */
export default async function DetailsAppointment(props: { params: Promise<{ id: string }> }): Promise<JSX.Element> {
  const params = await props.params;
  const { id } = params;

  return (
    <PageContent title='Appointment Details'>
      <AppointmentDetails id={id} />
    </PageContent>
  );
}
