import { ErrorBoundary, ErrorBoundaryFallback } from '@landing-pages/react/common/components';
import { theme } from '@landing-pages/react/common/config';
import { MantineProvider } from '@mantine/core';
import '@mantine/core/styles.css';
import { useEffect } from 'react';
import { setAPIKey, useAppDispatch } from '../store';
import { News } from './News';
import { NewsFooter } from './NewsFooter';
import { NewsHeader } from './NewsHeader';

export function NewsPage({ apiKey }: { apiKey: string }) {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(setAPIKey({ apiKey }));
  }, [apiKey, dispatch]);

  return (
    <ErrorBoundary fallback={<ErrorBoundaryFallback />}>
      <MantineProvider theme={theme}>
        <nav>
          <NewsHeader />
        </nav>
        <main>
          <News />
        </main>
        <footer>
          <NewsFooter />
        </footer>
      </MantineProvider>
    </ErrorBoundary>
  );
}
