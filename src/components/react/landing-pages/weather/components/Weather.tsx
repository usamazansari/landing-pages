import { Anchor, Box, Breadcrumbs, Card, Flex, Space, Text } from '@mantine/core';
import { useMemo } from 'react';
import { SearchCity } from './internal';

export function Weather() {
  const items = useMemo(() => {
    const items = [] as { title: string; icon: string; href: string }[];
    items.push({ title: '', icon: 'house', href: '/' });
    items.push({ title: 'Weather', icon: '', href: '/weather' });
    return items;
  }, []);

  const breadCrumbItems = useMemo(() => {
    return items.map((item) => (
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
    <Flex direction="column" gap="lg" className="container mx-auto my-lg" px="md">
      <Box>
        <Space />
        <Flex align="center" justify="space-between">
          <Breadcrumbs>{breadCrumbItems}</Breadcrumbs>
        </Flex>
      </Box>
      <Box>
        <Card className="h-32 grid place-content-center mt-4" withBorder>
          <Text ta="center">Advertisement</Text>
        </Card>
      </Box>
      <Box className="grid grid-cols-4 gap-md">
        <SearchCity />
      </Box>
    </Flex>
  );
}
