import { Anchor, Box, Breadcrumbs, Button, Card, Flex, ScrollArea, Space, Text } from '@mantine/core';
import { useMemo } from 'react';
// import { setShouldRefetch, useAppDispatch, useAppSelector } from '../store';

export function Weather() {
  //   const dispatch = useAppDispatch();

  const items = useMemo(() => {
    const items = [] as { title: string; icon: string; href: string }[];
    items.push({ title: '', icon: 'house', href: '/' });
    items.push({ title: 'Weather', icon: '', href: '/weather' });
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
            {false && (
              <Button
                variant="subtle"
                onClick={() => {
                  //   dispatch(setShouldRefetch(true));
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
        <Box></Box>
      </Flex>
    </ScrollArea>
  );
}
