import { Anchor, Badge, Box, Card, Flex, Image, Spoiler, Text } from '@mantine/core';
import type { INews } from '../types';

export function NewsItem({ newsItem, largeArea = false }: { newsItem: INews; largeArea?: boolean }) {
  return (
    <Card className="h-full" withBorder>
      <Card.Section>
        <Image
          h={largeArea ? 750 : 250}
          src={newsItem.image}
          fallbackSrc="https://img.freepik.com/free-vector/flat-design-no-data-illustration_23-2150527142.jpg"
        />
      </Card.Section>
      <Box mt="md" className="grid gap-md">
        <Anchor href={newsItem.url} target="_blank" fw="bold">
          {newsItem.title}
        </Anchor>
        <Flex align="center" justify="flex-start" gap="md">
          <Text size="sm" c="dimmed" fs="italic" className="flex items-center gap-xs">
            <span className="material-icons">today</span>
            {new Date(newsItem.published).toDateString()}
          </Text>
          <Flex align="flex-start" wrap="wrap" gap="xs">
            {newsItem.category.map(c => (
              <Badge key={c} variant="filled" component="a" href={`/news/${c.toLowerCase().replace(/\s/g, '-')}`} style={{ cursor: 'pointer' }}>
                {c.toUpperCase()}
              </Badge>
            ))}
          </Flex>
        </Flex>
        <Flex direction="column" gap="xs">
          <Spoiler hideLabel="Show less" showLabel="Show more" maxHeight={42}>
            {newsItem.description}
          </Spoiler>
        </Flex>
      </Box>
    </Card>
  );
}
