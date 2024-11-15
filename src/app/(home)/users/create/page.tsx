import { PageContent } from "@/core";
import { CreateUserForm } from "@/modules/users/ components/forms/create-user-form";

export default function CreateUserPage() {
  return (
    <PageContent title='New User' className='w-full flex flex-col justify-center items-center'>
      <CreateUserForm className='w-1/2' />
    </PageContent>
  );
}
