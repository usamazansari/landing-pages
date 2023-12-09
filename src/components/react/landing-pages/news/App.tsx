import { ErrorBoundary, ErrorBoundaryFallback } from '@landing-pages/react/common/components';
import { theme } from '@landing-pages/react/common/config';
import { MantineProvider } from '@mantine/core';
import '@mantine/core/styles.css';
import { Provider } from 'react-redux';
import { NewsPage } from './components';
import { store } from './store';

export function NewsApp({ apiKey }: { apiKey: string }) {
  return (
    <Provider store={store}>
      <ErrorBoundary fallback={<ErrorBoundaryFallback />}>
        <MantineProvider theme={theme}>
          <NewsPage apiKey={apiKey} />
        </MantineProvider>
      </ErrorBoundary>
    </Provider>
  );
}
