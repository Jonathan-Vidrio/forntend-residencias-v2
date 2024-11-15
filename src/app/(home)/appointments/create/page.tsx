import { PageContent } from "@/core";
import { CreateAppointmentForm } from "@/modules/appointment/components/forms/create-appointment-form";

export default function CreateAppointmentPage() {
  return (
    <PageContent title='Create Appointment' className='flex justify-center'>
      <CreateAppointmentForm className='w-1/2' />
    </PageContent>
  );
}
