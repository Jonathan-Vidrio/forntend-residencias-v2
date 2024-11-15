import { PageContent } from '@/core';
import { UpdateProductForm } from '@/modules/products/components/forms/update-product-form';

export default async function UpdateProductPage(props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  const { id } = params;

  return (
    <PageContent title='Update Products' className='flex justify-center'>
      <UpdateProductForm id={id} className='w-1/2' />
    </PageContent>
  );
}
