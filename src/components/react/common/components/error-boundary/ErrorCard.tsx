import { Accordion, Box, Card, Code, Text } from '@mantine/core';
import type { SerializedError } from '@reduxjs/toolkit';
import type { FetchBaseQueryError } from '@reduxjs/toolkit/query';
import { useMemo } from 'react';

export function isFetchBaseQueryError(error?: FetchBaseQueryError | SerializedError): error is FetchBaseQueryError {
  return !!(error as FetchBaseQueryError)?.status;
}

export function isSerializedError(error?: FetchBaseQueryError | SerializedError): error is SerializedError {
  return !!(error as SerializedError)?.stack;
}

export function ErrorCard({ error }: { error?: FetchBaseQueryError | SerializedError | Error }) {
  const { stack, message } = useMemo(() => {
    if (isFetchBaseQueryError(error)) return { stack: new Error(error.status.toString()).stack, message: error.status.toString() };
    if (isSerializedError(error) || error instanceof Error) return { stack: error.stack, message: error.message };
    const fallbackError = new Error('Unknown error');
    return { stack: fallbackError.stack, message: fallbackError.message };
  }, [error]);
  return (
    <Card withBorder>
      <Card.Section withBorder>
        <Box className="flex items-center justify-center p-4" c="red">
          <span className="material-symbols-outlined text-7xl">error</span>
        </Box>
      </Card.Section>
      <Card.Section withBorder>
        <Accordion>
          <Accordion.Item value="error">
            <Accordion.Control>
              <Box className="grid gap-xs">
                <Text className="leading-none" fw={500}>
                  Something went wrong!
                </Text>
                <Text size="xs" c="dimmed" className="leading-none">
                  {message}
                </Text>
              </Box>
            </Accordion.Control>
            <Accordion.Panel>
              <Box className="grid gap-sm">
                <Code p="md" block>
                  {stack}
                </Code>
              </Box>
            </Accordion.Panel>
          </Accordion.Item>
        </Accordion>
      </Card.Section>
    </Card>
  );
}
