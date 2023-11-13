import { Accordion, Box, Card, Code, Text } from '@mantine/core';

export function ErrorCard(error: Error) {
  return (
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
  );
}
