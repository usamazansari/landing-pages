import { Anchor, Box, Breadcrumbs, Card, Flex, ScrollArea, Space, Text } from '@mantine/core';
import { useMemo } from 'react';
import { useAppSelector } from '../store';
import { NewsLayout, RelatedPopularNews } from './internal';

export function News() {
  const category = useAppSelector(state => state.news.selectedCategory);
  const relatedPopularCategories = useAppSelector(state => state.news.relatedPopularCategories);

  const items = useMemo(() => {
    const items = [] as { title: string; icon: string; href: string }[];
    items.push({ title: '', icon: 'home', href: '/' });
    items.push({ title: 'News', icon: '', href: '/news' });
    if (!category) return items;
    items.push({
      title: category.toUpperCase(),
      icon: '',
      href: `/news/${category.toLowerCase().replace(/\s/g, '-')}`,
    });
    return items;
  }, [category]);

  const breadCrumbItems = useMemo(() => {
    return items.map(item => (
      <Anchor key={item.href} href={item.href} underline="never">
        <Flex align="center" gap="xs">
          {!item.icon ? null : <span className="material-icons">{item.icon}</span>}
          {!item.title ? null : <Text>{item.title}</Text>}
        </Flex>
      </Anchor>
    ));
  }, [items]);

  return (
    <ScrollArea h="100%">
      <Flex direction="column" gap="lg" className="container mx-auto my-lg">
        <Box>
          <Space />
          <Breadcrumbs>{breadCrumbItems}</Breadcrumbs>
        </Box>
        <Box>
          <Card className="h-32 grid place-content-center mt-4" withBorder>
            <Text ta="center">Advertisement</Text>
          </Card>
        </Box>
        <Box>
          <NewsLayout />
        </Box>
        {!relatedPopularCategories.length ? null : (
          <Box className="grid gap-md">
            <Space style={{ margin: '0.5rem 0rem' }} />
            <Text size="lg" fw={500}>
              Related News
            </Text>
            <Space style={{ margin: '0.5rem 0rem' }} />
            {relatedPopularCategories.map(c => (
              <RelatedPopularNews key={c} category={c} />
            ))}
          </Box>
        )}
      </Flex>
    </ScrollArea>
  );
}
