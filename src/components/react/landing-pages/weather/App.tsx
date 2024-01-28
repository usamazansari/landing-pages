import { ErrorBoundary, ErrorBoundaryFallback } from '@landing-pages/react/common/components';
import { theme } from '@landing-pages/react/common/config';
import { MantineProvider } from '@mantine/core';
import '@mantine/core/styles.css';
import { Provider } from 'react-redux';
import { WeatherPage } from './components';
import { weatherStore, geoCodingStore } from './store';

export function WeatherApp({ apiKey }: { apiKey: string }) {
  return (
    <Provider store={weatherStore}>
      <Provider store={geoCodingStore}>
        <ErrorBoundary fallback={<ErrorBoundaryFallback />}>
          <MantineProvider theme={theme}>
            <WeatherPage apiKey={apiKey} />
          </MantineProvider>
        </ErrorBoundary>
      </Provider>
    </Provider>
  );
}
