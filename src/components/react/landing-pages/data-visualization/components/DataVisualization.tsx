import { ScrollArea, Anchor, Box, Breadcrumbs, Flex, Space, Text } from '@mantine/core';
import { useMemo } from 'react';
import { PersonalExpenses } from '../data';
import { SimpleBarChart, SimpleLineChart } from './internal';

export function DataVisualization() {
  const items = useMemo(() => {
    const items = [] as { title: string; icon: string; href: string }[];
    items.push({ title: '', icon: 'house', href: '/' });
    items.push({ title: 'Data Visualization', icon: '', href: '/data-visualization' });
    return items;
  }, []);

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
    <ScrollArea h="100%">
      <Box className="container grid gap-lg mx-auto my-lg min-h-full" px="md">
        <Box>
          <Space />
          <Flex align="center" justify="space-between">
            <Breadcrumbs>{breadCrumbItems}</Breadcrumbs>
          </Flex>
        </Box>
        <Box className="h-full">
          <SimpleLineChart data={PersonalExpenses} />
          <SimpleBarChart data={PersonalExpenses} />
        </Box>
      </Box>
    </ScrollArea>
  );
}
