import { PageContent } from '@/core';
import { ProductsTable } from '@/modules/products/components/tables/products-table';

export default function ProductsPage() {
  return (
    <PageContent title='Products'>
      <ProductsTable />
    </PageContent>
  );
}
