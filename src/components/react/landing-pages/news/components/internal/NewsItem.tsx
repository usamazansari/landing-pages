import { Anchor, Badge, Box, Card, Flex, Image, Spoiler, Text } from '@mantine/core';
import { useWindowScroll } from '@mantine/hooks';
import { setSelectedCategory, useAppDispatch } from 'src/components/react/landing-pages/news/store';
import type { INews } from '../../types';
import noNewsImage from '../../../../../../assets/news/no-news.webp';

export function NewsItem({ newsItem, largeArea = false }: { newsItem: INews; largeArea?: boolean }) {
  const dispatch = useAppDispatch();
  const [, scrollTo] = useWindowScroll();

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
            <Text c="dimmed" size="sm" className="leading-[normal] flex items-center">
              <span className="material-icons">today</span>
            </Text>
            <Text c="dimmed" size="sm" fs="italic" fw={500} className="leading-[normal] flex items-center">
              {new Date(newsItem.published).toDateString()}
            </Text>
          </Flex>
          <Flex align="flex-start" wrap="wrap" gap="xs">
            {newsItem.category.map(c => (
              <Badge
                key={c}
                variant="filled"
                component="button"
                onClick={() => {
                  dispatch(setSelectedCategory(c));
                  scrollTo({ y: 0 });
                }}
                style={{ cursor: 'pointer' }}>
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
