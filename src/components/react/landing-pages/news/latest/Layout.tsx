import { Box, useMantineTheme } from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';
import React from 'react';

export function Layout({ children }: { children: React.ReactNode }) {
  const theme = useMantineTheme();
  const isNarrow = useMediaQuery(`(max-width: ${theme.breakpoints.md})`);

  return (
    <Box
      className="grid gap-xl"
      style={{
        gridTemplateAreas: isNarrow
          ? `'top-middle-left-center'
          'top-right'
          'top-middle-right'
          'middle-left'
          'middle-center'
          'middle-right'
          'bottom-left'
          'bottom-middle-left'
          'bottom-middle-right-center'
          `
          : `'top-middle-left-center top-middle-left-center top-right'
          'top-middle-left-center top-middle-left-center top-middle-right'
          'middle-left middle-center middle-right'
          'bottom-middle-left bottom-middle-right-center bottom-middle-right-center'
          'bottom-left bottom-middle-right-center bottom-middle-right-center'`,
      }}>
      {children}
    </Box>
  );
}
