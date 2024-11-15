import { PageContent } from '@/core';
import { ProductCategoryDetails } from '@/modules/products/components/details/product-category-details';

export default async function DetailsProductCategoryPage(props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  const { id } = params;

  return (
    <PageContent title='Product Category Details'>
      <ProductCategoryDetails id={id} />
    </PageContent>
  );
}
