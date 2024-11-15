import { PageContent } from '@/core';
import { ProductCategoriesTable } from '@/modules/products/components/tables/product-categories-table';

export default function ProductsCategoriesPage() {
  return (
    <PageContent title='Categories'>
      <ProductCategoriesTable />
    </PageContent>
  );
}
