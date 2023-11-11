import { Box, Card, Flex, MantineProvider, Loader, ScrollArea, Text, CardSection, Accordion, Code, Divider } from '@mantine/core';
import { theme } from '../../../../config/mantine/mantine.theme';
import { ErrorBoundary, ErrorBoundaryFallback } from '../../error-boundary';
import { useNewsApi } from './useNewsApi';

export function News({ apiKey }: { apiKey: string }) {
  const { data, isError, isLoading, isSuccess, error } = useNewsApi({ apiKey });
  return (
    <MantineProvider theme={theme}>
      <ErrorBoundary fallback={<ErrorBoundaryFallback />}>
        <ScrollArea h="100%" className="m-4">
          <Flex direction="column" gap="lg" className="container mx-auto">
            <Card className="h-32 grid place-content-center" withBorder>
              <Text ta="center">Advertisement</Text>
            </Card>
            {isLoading ? (
              <Box className="flex grid-cols-[auto_auto] items-center justify-center h-full gap-4">
                <Loader />
                <Text>Loading Data</Text>
              </Box>
            ) : null}
            {isSuccess ? <Text>{JSON.stringify(data)}</Text> : null}
            {isError ? (
              <Card withBorder>
                <Card.Section withBorder>
                  <Box className="flex items-center justify-center p-4" c="red">
                    <span className="material-icons text-7xl">error</span>
                  </Box>
                </Card.Section>
                <Card.Section withBorder>
                  <Accordion>
                    <Accordion.Item value="error">
                      <Accordion.Control>
                        <Box className="grid gap-1">
                          <Text className="leading-none" fw={500}>
                            Error Fetching data
                          </Text>
                          <Text size="xs" c="dimmed" className="leading-none">
                            Click to view the error stacktrace
                          </Text>
                        </Box>
                      </Accordion.Control>
                      <Accordion.Panel>
                        <Box className="grid gap-2">
                          <Code p="md" block>
                            {error.stack}
                          </Code>
                        </Box>
                      </Accordion.Panel>
                    </Accordion.Item>
                  </Accordion>
                </Card.Section>
              </Card>
            ) : null}
          </Flex>
        </ScrollArea>
      </ErrorBoundary>
    </MantineProvider>
  );
}
