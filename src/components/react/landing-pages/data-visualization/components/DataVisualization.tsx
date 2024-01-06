import { Anchor, Box, Breadcrumbs, Flex, ScrollArea, Space, Text } from '@mantine/core';
import { useMemo } from 'react';
import { PersonalExpenses } from '../data';
import { useElementSize } from '@mantine/hooks';
import { LineChart } from './internal';

export function DataVisualization() {
  const { ref: boxRef, width: boxWidth, height: boxHeight } = useElementSize();
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
      <Flex direction="column" gap="lg" className="container mx-auto my-lg" px="md">
        <Box>
          <Space />
          <Flex align="center" justify="space-between">
            <Breadcrumbs>{breadCrumbItems}</Breadcrumbs>
          </Flex>
        </Box>
        <Box ref={boxRef}>
          {/* <LineChart data={PersonalExpenses} series={[{ name: 'amount', color: 'blue' }]} dataKey={'date'} /> */}
          <LineChart data={PersonalExpenses} height={boxHeight} width={boxWidth} />
        </Box>
      </Flex>
    </ScrollArea>
  );
}
