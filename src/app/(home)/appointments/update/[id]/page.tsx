import { PageContent } from '@/core';

/**
 * Renders the Update Appointment page.
 *
 * This page provides functionality to update the details of an existing appointment.
 *
 * @async
 * @component
 * @param {Object} props - The component props.
 * @param {Promise<{ id: string }>} props.params - A promise resolving to an object containing the appointment ID.
 * @returns {Promise<JSX.Element>} The update appointment page component.
 */
export default async function UpdateAppointment(props: { params: Promise<{ id: string }> }): Promise<JSX.Element> {
  const params = await props.params;
  const { id } = params;

  return (
    <PageContent title='Update Appointment'>
      <></>
    </PageContent>
  );
}
