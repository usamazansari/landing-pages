import { Anchor, Divider, Flex, MantineProvider, Text } from '@mantine/core';
import '@mantine/core/styles.css';
import { theme } from '../../../../config/mantine/mantine.theme';
import { ErrorBoundary, ErrorBoundaryFallback } from '../../error-boundary';

export function HomeFooter() {
  return (
    <MantineProvider theme={theme}>
      <ErrorBoundary fallback={<ErrorBoundaryFallback />}>
        <Divider />
        <Flex gap="xs" px="md" justify="flex-end" align="center" className="h-16">
          <Text>Made by</Text>
          <Anchor href="https://github.com/usamazansari" target="_blank" underline="hover" className="underline-offset-2 dark:text-color-danger-fg">
            @usamazansari
          </Anchor>
        </Flex>
      </ErrorBoundary>
    </MantineProvider>
  );
}
