import { ErrorBoundary, ErrorBoundaryFallback } from '@landing-pages/react/common/components';
import { theme } from '@landing-pages/react/common/config';
import { MantineProvider } from '@mantine/core';
import '@mantine/core/styles.css';
import { Home } from './Home';
import { HomeFooter } from './HomeFooter';
import { HomeHeader } from './HomeHeader';

export function HomePage() {
  return (
    <ErrorBoundary fallback={<ErrorBoundaryFallback />}>
      <MantineProvider theme={theme}>
        <HomeHeader />
        <Home />
        <HomeFooter />
      </MantineProvider>
    </ErrorBoundary>
  );
}

