import { PageContent } from "@/core";
import { CreateResourceForm } from "@/modules/services/components/forms/create-resource-form";

export default function CreateResourcePage() {
  return (
    <PageContent title='Create Resource' className='flex justify-center'>
      <CreateResourceForm className='w-1/2' />
    </PageContent>
  );
}
