import { ErrorBoundary, ErrorBoundaryFallback } from '@landing-pages/react/common/components';
import { theme } from '@landing-pages/react/common/config';
import '@mantine/core/styles.css';
import { MantineProvider } from '@mantine/core';
import { News } from './News';
import { NewsFooter } from './NewsFooter';
import { NewsHeader } from './NewsHeader';

export function NewsPage({ apiKey }: { apiKey: string }) {
  return (
    <ErrorBoundary fallback={<ErrorBoundaryFallback />}>
      <MantineProvider theme={theme}>
        <NewsHeader apiKey={apiKey} />
        <News apiKey={apiKey} />
        <NewsFooter />
      </MantineProvider>
    </ErrorBoundary>
  );
}

