import { theme } from '@landing-pages/react/common/config';
import { MantineProvider } from '@mantine/core';
import '@mantine/core/styles.css';
import type React from 'react';
import { ErrorBoundary, ErrorBoundaryFallback } from '../error-boundary';

export function Provider({ children }: { children: React.ReactNode }) {
  return (
    <ErrorBoundary fallback={<ErrorBoundaryFallback />}>
      <MantineProvider theme={theme}>{children}</MantineProvider>
    </ErrorBoundary>
  );
}

