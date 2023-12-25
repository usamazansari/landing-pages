import { Anchor, Badge, Box, Card, Flex, Image, Spoiler, Text } from '@mantine/core';
import noNewsImage from '../../../../../../assets/news/no-news.webp';
import type { INews } from '../../types';
import { useGetAvailableNewsCategoriesQuery } from '../../store';
import { useCallback } from 'react';

export function NewsItem({ newsItem, largeArea = false }: { newsItem: INews; largeArea?: boolean }) {
  const { data } = useGetAvailableNewsCategoriesQuery();
  const isCategoryAvailable = useCallback((category: string) => data?.categories.includes(category), [data?.categories]);

  return (
    <Card className="h-full" withBorder>
      <Card.Section>
        <Image h={largeArea ? 750 : 250} src={newsItem.image} fallbackSrc={noNewsImage.src} alt={newsItem.title} />
      </Card.Section>
      <Box mt="md" className="grid gap-md">
        <Anchor href={newsItem.url} target="_blank" fw="bold">
          {newsItem.title}
        </Anchor>
        <Flex align="center" justify="space-between" gap="xs">
          <Flex align="center" gap="xs">
            <Text c="dimmed" size="sm" className="flex items-center" style={{ lineHeight: 'normal' }}>
              <span className="material-symbols-outlined">today</span>
            </Text>
            <Text c="dimmed" size="sm" fs="italic" fw={500} className="flex items-center whitespace-nowrap" style={{ lineHeight: 'normal' }}>
              {new Date(newsItem.published).toDateString()}
            </Text>
          </Flex>
          <Flex align="flex-start" wrap="wrap" gap="xs">
            {newsItem.category.map(c => (
              <Badge
                key={c}
                variant={isCategoryAvailable(c) ? 'filled' : 'outline'}
                component="a"
                href={`/news/${c.toLowerCase().replace(/[\s_]/g, '-')}`}
                style={{ pointerEvents: isCategoryAvailable(c) ? 'auto' : 'none', cursor: isCategoryAvailable(c) ? 'pointer' : 'default' }}>
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
