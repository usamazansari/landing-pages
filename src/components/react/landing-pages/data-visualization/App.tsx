import { ErrorBoundary, ErrorBoundaryFallback } from '@landing-pages/react/common/components';
import { theme } from '@landing-pages/react/common/config';
import { MantineProvider } from '@mantine/core';
import '@mantine/core/styles.css';
import { Provider } from 'react-redux';
import { DataVisualizationPage } from './components';
import { store } from './store';

export function DataVisualizationApp() {
  return (
    <Provider store={store}>
      <ErrorBoundary fallback={<ErrorBoundaryFallback />}>
        <MantineProvider theme={theme}>
          <DataVisualizationPage />
        </MantineProvider>
      </ErrorBoundary>
    </Provider>
  );
}
