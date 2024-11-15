import { PageContent } from '@/core';
import { ProductDetails } from '@/modules/products/components/details/product-details';

export default async function DetailsProductPage(props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  const { id } = params;

  return (
    <PageContent title='Product Details'>
      <ProductDetails id={id} />
    </PageContent>
  );
}
