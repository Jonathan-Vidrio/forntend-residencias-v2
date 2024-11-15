import { PageContent } from '@/core';

export default async function UpdateAppointment(props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  const { id } = params;

  return (
    <PageContent title='Update Appointment'>
      <></>
    </PageContent>
  );
}
