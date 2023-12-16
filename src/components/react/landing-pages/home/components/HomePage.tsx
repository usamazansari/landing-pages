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
        <nav className="sticky top-0 left-0 right-0 z-10">
          <HomeHeader />
        </nav>
        <main>
          <Home />
        </main>
        <footer>
          <HomeFooter />
        </footer>
      </MantineProvider>
    </ErrorBoundary>
  );
}
