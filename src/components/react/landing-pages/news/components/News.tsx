import { Anchor, Breadcrumbs, Card, Flex, ScrollArea, Space, Text } from '@mantine/core';
import { useMemo } from 'react';
import { useNewsApi } from '../hooks';
import { NewsLayout } from './internal';
import { RelatedPopularNews } from './internal/RelatedPopularNews';

export function News({ apiKey, category = '' }: { apiKey: string; category?: string }) {
  const response = useNewsApi({ apiKey, category });

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

  const relatedPopularCategories = useMemo(() => {
    const categories = response?.data?.news
      ?.map(article => article.category)
      .flat()
      .filter(c => c !== category);
    return Object.entries(
      categories?.reduce((acc: Record<string, number>, category) => {
        acc[category] = (acc[category] || 0) + 1;
        return acc;
      }, {}) ?? {},
    )
      .sort((a, b) => b[1] - a[1])
      .slice(0, 2)
      .map(([category]) => category);
  }, [category, response?.data?.news]);

  return (
    <ScrollArea h="100%">
      <Flex direction="column" gap="lg" className="container mx-auto my-lg">
        <Space />
        <Breadcrumbs>{breadCrumbItems}</Breadcrumbs>
        <Card className="h-32 grid place-content-center mt-4" withBorder>
          <Text ta="center">Advertisement</Text>
        </Card>
        <NewsLayout category={category} response={response} />
        <Space style={{ margin: '0.5rem 0rem' }} />
        <Text size="lg" fw={500}>
          Related News
        </Text>
        <Space style={{ margin: '0.5rem 0rem' }} />
        {!relatedPopularCategories.length ? null : relatedPopularCategories.map(c => <RelatedPopularNews key={c} apiKey={apiKey} category={c} />)}
      </Flex>
    </ScrollArea>
  );
}
