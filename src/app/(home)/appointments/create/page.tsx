import { PageContent } from '@/core';
import { CreateAppointmentForm } from '@/modules/appointment/components/forms/create-appointment-form';

/**
 * Renders the Create Appointment page.
 *
 * This page includes a form for creating a new appointment.
 *
 * @component
 * @returns {JSX.Element} The create appointment page component.
 */
export default function CreateAppointmentPage(): JSX.Element {
  return (
    <PageContent title='Create Appointment' className='flex justify-center'>
      <CreateAppointmentForm className='w-1/2' />
    </PageContent>
  );
}
