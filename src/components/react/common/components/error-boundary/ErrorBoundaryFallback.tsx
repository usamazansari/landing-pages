import { Box, Text } from '@mantine/core';
import React from 'react';

export function ErrorBoundaryFallback(): React.ReactNode {
  return (
    <Box className="w-screen h-screen grid place-content-center">
      <Text c="red">Something went wrong!</Text>
    </Box>
  );
}
