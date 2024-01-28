import { Anchor, Box, Breadcrumbs, Button, Card, Flex, Space, Text } from '@mantine/core';
import { useMemo } from 'react';
import { setShouldRefetch, useAppDispatch, useAppSelector } from '../store';
import { NewsLayout, RelatedPopularNews } from './internal';

export function News() {
  const dispatch = useAppDispatch();
  const category = useAppSelector(state => state.news.selectedCategory);
  const relatedPopularCategories = useAppSelector(state => state.news.relatedPopularCategories);

  const items = useMemo(() => {
    const items = [] as { title: string; icon: string; href: string }[];
    items.push({ title: '', icon: 'house', href: '/' });
    items.push({ title: 'News', icon: '', href: '/news' });
    if (!category) return items;
    items.push({ title: category.toUpperCase(), icon: '', href: `/news/${category.toLowerCase().replace(/[\s_]/g, '-')}` });
    return items;
  }, [category]);

  const breadCrumbItems = useMemo(() => {
    return items.map(item => (
      <Anchor key={item.title.toLowerCase()} href={item.href} underline="never">
        <Flex align="center" gap="xs">
          {!item.icon ? null : (
            <Text className="grid place-content-center" style={{ lineHeight: 'normal' }}>
              <span className="material-symbols-outlined">{item.icon}</span>
            </Text>
          )}
          {!item.title ? null : <Text style={{ lineHeight: 'normal' }}>{item.title}</Text>}
        </Flex>
      </Anchor>
    ));
  }, [items]);

  return (
    <Box className="container grid gap-lg mx-auto min-h-full" px="md" my="lg">
      <Box>
        <Space />
        <Flex align="center" justify="space-between">
          <Breadcrumbs>{breadCrumbItems}</Breadcrumbs>
          {false && (
            <Button
              variant="subtle"
              onClick={() => {
                dispatch(setShouldRefetch(true));
              }}>
              <Flex align="center" gap="sm">
                <Text className="leading-[normal] flex items-center">
                  <span className="material-symbols-outlined">refresh</span>
                </Text>
                <Text fw={500} className="leading-[normal] flex items-center">
                  Refresh
                </Text>
              </Flex>
            </Button>
          )}
        </Flex>
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
    </Box>
  );
}
