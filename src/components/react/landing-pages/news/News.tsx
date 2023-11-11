import { Box, Card, Flex, MantineProvider, Loader, ScrollArea, Text } from '@mantine/core';
import { theme } from '../../../../config/mantine/mantine.theme';
import { ErrorBoundary, ErrorBoundaryFallback } from '../../error-boundary';
import { useNewsApi } from './useNewsApi';

export function News({ apiKey }: { apiKey: string }) {
  const { data, isError, isLoading, isSuccess, error } = useNewsApi({ apiKey });
  return (
    <MantineProvider theme={theme}>
      <ErrorBoundary fallback={<ErrorBoundaryFallback />}>
        <ScrollArea h="100%" className="p-4">
          <Flex direction="column" gap="lg" className="container mx-auto">
            <Card className="h-32 grid place-content-center" withBorder>
              <Text ta="center">Advertisement</Text>
            </Card>
            {isLoading ? <Loader /> : null}
            {isSuccess ? <Text>{JSON.stringify(data)}</Text> : null}
            {isError ? (
              <Box className="grid gap-4">
                <Text c="red" size="lg">
                  Error fetching data
                </Text>
                <Text>{JSON.stringify(error)}</Text>
              </Box>
            ) : null}
          </Flex>
        </ScrollArea>
      </ErrorBoundary>
    </MantineProvider>
  );
}
