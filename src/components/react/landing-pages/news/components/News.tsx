import { Provider } from '@landing-pages/react/common/components';
import { Box, Card, Flex, ScrollArea, Text } from '@mantine/core';
import { useNewsApi } from '../hooks';
import { NewsLayout } from './NewsLayout';

export function News({ apiKey, category = '' }: { apiKey: string; category?: string }) {
  const response = useNewsApi({ apiKey });

  return (
    <Provider>
      <ScrollArea h="100%">
        <Flex direction="column" gap="lg" className="container mx-auto">
          <Card className="h-32 grid place-content-center mt-4" withBorder>
            <Text ta="center">Advertisement</Text>
          </Card>
          <NewsLayout category={category} response={response} />
        </Flex>
      </ScrollArea>
    </Provider>
  );
}
