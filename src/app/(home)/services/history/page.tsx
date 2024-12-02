import { PageContent } from '@/core';
import { ServicesHistory } from '@/modules/services/components/tables/services-history';

/**
 * Renders the Services History page.
 *
 * This page displays a history of services.
 *
 * @component
 * @returns {JSX.Element} The services history page component.
 */
export default function ServicesHistoryPage() {
  return (
    <PageContent title='Services History'>
      <ServicesHistory />
    </PageContent>
  );
}
