import { ErrorCard } from '@landing-pages/react/common/components';
import { Box } from '@mantine/core';
import React from 'react';

export function ErrorBoundaryFallback({ error }: { error: Error }): React.ReactNode {
  return (
    <Box className="w-screen grid container mx-auto my-xl">
      <ErrorCard error={error} />
    </Box>
  );
}
