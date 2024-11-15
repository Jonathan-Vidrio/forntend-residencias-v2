import { PageContent } from '@/core';
import { CreateProductCategoryForm } from '@/modules/products/components/forms/create-product-category-form';

export default function CreateProductCategoryPage() {
  return (
    <PageContent title='Create Product Category' className='flex justify-center'>
      <CreateProductCategoryForm className='w-1/2' />
    </PageContent>
  );
}
