import { PageContent } from '@/core';
import { UpdateUserForm } from '@/modules/users/ components/forms/update-user-form';

export default async function UpdateUserPage(props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  const { id } = params;

  return (
    <PageContent title='Update User' className='w-full flex flex-col justify-center items-center'>
      <UpdateUserForm className='w-1/2' id={id} />
    </PageContent>
  );
}
