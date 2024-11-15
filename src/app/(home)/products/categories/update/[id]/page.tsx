import { PageContent } from '@/core';
import { UpdateProductCategoryForm } from '@/modules/products/components/forms/update-product-category-form';

export default async function UpdateProductCategoryPage(props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  const { id } = params;

  return (
    <PageContent title='Update Product Category' className='flex justify-center'>
      <UpdateProductCategoryForm id={id} className='w-1/2' />
    </PageContent>
  );
}
