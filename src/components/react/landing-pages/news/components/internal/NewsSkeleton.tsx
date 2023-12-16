import { Box, Card, Flex, Skeleton } from '@mantine/core';

export function NewsSkeleton({ largeArea }: { largeArea: boolean }) {
  return (
    <Card withBorder>
      <Card.Section>
        <Skeleton height={largeArea ? 750 : 250} />
      </Card.Section>
      <Box mt="md" className="grid gap-md">
        <Skeleton height={24} />
        <Flex align="center" justify="space-between">
          <Skeleton height={16} />
          <Flex align="flex-start" wrap="wrap" gap="xs">
            <Skeleton height={16} />
            <Skeleton height={16} />
          </Flex>
        </Flex>
        <Flex direction="column">
          <Skeleton height={80} />
        </Flex>
      </Box>
    </Card>
  );
}
