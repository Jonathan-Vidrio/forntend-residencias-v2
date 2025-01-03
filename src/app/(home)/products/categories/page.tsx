import { PageContent } from '@/core';
import { ProductCategoriesTable } from '@/modules/products/components/tables/product-categories-table';

/**
 * Renders the Product Categories page.
 *
 * This page displays a table listing all product categories.
 *
 * @component
 * @returns {JSX.Element} The product categories page component.
 */
export default function ProductsCategoriesPage() {
  return (
    <PageContent title='Categories'>
      <ProductCategoriesTable />
    </PageContent>
  );
}
