import { Card, Flex, MantineProvider, ScrollArea, Text } from '@mantine/core';
import { theme } from '../../../../config/mantine/mantine.theme';
import { ErrorBoundary, ErrorBoundaryFallback } from '../../error-boundary';

export function News() {
  return (
    <MantineProvider theme={theme}>
      <ErrorBoundary fallback={<ErrorBoundaryFallback />}>
        <ScrollArea h="100%" className="p-4">
          <Flex direction="column" gap="lg" className="container mx-auto">
            <Card className="h-32 grid place-content-center" withBorder>
              <Text ta="center">Advertisement</Text>
            </Card>
          </Flex>
        </ScrollArea>
      </ErrorBoundary>
    </MantineProvider>
  );
}
