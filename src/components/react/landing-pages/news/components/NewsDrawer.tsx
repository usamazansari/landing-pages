import { Box, Divider, Drawer, Flex, Input, List, NavLink, ScrollArea, Text, useMantineTheme } from '@mantine/core';
import { useViewportSize } from '@mantine/hooks';
import { useMemo } from 'react';
import { useScreenSizeWatcher } from '../../../common/hooks';

export function NewsDrawer({ categories = [], opened, close }: { categories: string[]; opened: boolean; close: () => void }) {
  const theme = useMantineTheme();
  const { width } = useViewportSize();
  const { isNarrowViewport } = useScreenSizeWatcher({ theme, width });

  const groupedCategories = useMemo(
    () =>
      categories
        .sort((a, b) => a.localeCompare(b))
        .reduce((acc, category) => {
          acc.set(category.charAt(0).toLowerCase(), [
            ...(acc.get(category.charAt(0).toLowerCase()) || []),
            { label: category.toUpperCase(), href: `/news/${category.toLowerCase().replace(/\s/g, '-')}` },
          ]);
          return acc;
        }, new Map<string, { label: string; href: string }[]>()),
    [],
  );

  return (
    <Drawer.Root opened={opened} onClose={close} size={isNarrowViewport ? '100%' : 'md'} scrollAreaComponent={ScrollArea.Autosize}>
      <Drawer.Overlay visibleFrom="sm" backgroundOpacity={0.5} blur={4} />
      <Drawer.Content>
        <Drawer.Header p={0}>
          <Flex direction="column" className="w-full gap-md">
            <Flex align="center" gap="md" className="px-md pt-md">
              <Drawer.Title className="cursor-default">
                <Text fw={500}>Categories</Text>
              </Drawer.Title>
              <Drawer.CloseButton />
            </Flex>
            <Box className="px-md">
              <Input placeholder="Search across categories" />
            </Box>
            <Divider />
          </Flex>
        </Drawer.Header>
        <Drawer.Body p={0} className="relative">
          <Box className="grid gap-md">
            <List
              styles={{
                itemWrapper: { width: '100%' },
                itemLabel: { width: '100%' },
              }}>
              {[...groupedCategories.entries()].map(([initial, categories]) => (
                <List.Item key={initial}>
                  <Divider label={initial.toUpperCase()} labelPosition="left" className="p-md" />
                  <List
                    styles={{
                      itemWrapper: { width: '100%' },
                      itemLabel: { width: '100%' },
                    }}>
                    {categories.map(({ label, href }) => (
                      <List.Item key={href}>
                        <NavLink label={label} href={href} />
                      </List.Item>
                    ))}
                  </List>
                </List.Item>
              ))}
            </List>
          </Box>
          <Box className="grid sticky bottom-0 left-0 right-0" style={{ backgroundColor: 'var(--mantine-color-body)' }}>
            <Divider />
            <Text m="md">{categories.length} categories fetched</Text>
          </Box>
        </Drawer.Body>
      </Drawer.Content>
    </Drawer.Root>
  );
}

