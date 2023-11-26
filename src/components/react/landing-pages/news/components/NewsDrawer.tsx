import { Box, Divider, Drawer, Flex, Highlight, Input, List, NavLink, ScrollArea, Text, useMantineTheme } from '@mantine/core';
import { useViewportSize } from '@mantine/hooks';
import { useEffect, useMemo, useState } from 'react';
import { useScreenSizeWatcher } from '../../../common/hooks';

export function NewsDrawer({ categories = [], opened, close }: { categories: string[]; opened: boolean; close: () => void }) {
  const theme = useMantineTheme();
  const { width } = useViewportSize();
  const { isNarrowViewport } = useScreenSizeWatcher({ theme, width });
  const [filteredCategories, setFilteredCategories] = useState<string[]>(categories);
  const [filterText, setFilterText] = useState<string>('');

  const groupedCategories = useMemo(
    () => [
      ...filteredCategories
        .sort((a, b) => a.localeCompare(b))
        .reduce((acc, category) => {
          acc.set(category.charAt(0).toLowerCase(), [
            ...(acc.get(category.charAt(0).toLowerCase()) || []),
            { label: category.toUpperCase(), href: `/news/${category.toLowerCase().replace(/\s/g, '-')}` },
          ]);
          return acc;
        }, new Map<string, { label: string; href: string }[]>())
        .entries(),
    ],
    [filteredCategories],
  );

  useEffect(() => {
    setFilteredCategories(!filterText ? categories : categories.filter(category => category.toLowerCase().includes(filterText.toLowerCase())));
  }, [categories, filterText]);

  return (
    <Drawer.Root opened={opened} onClose={close} size={isNarrowViewport ? '100%' : 'md'} scrollAreaComponent={ScrollArea.Autosize}>
      <Drawer.Overlay visibleFrom="sm" backgroundOpacity={0.5} blur={4} />
      <Drawer.Content>
        <Drawer.Header p={0}>
          <Flex direction="column" className="w-full gap-md">
            <Flex align="center" gap="md" className="px-md pt-md">
              <Drawer.Title className="cursor-default">
                <Flex align="center" gap="xs" p="md">
                  <span className="material-icons">category</span>
                  <Text fw={500}>Categories</Text>
                </Flex>
              </Drawer.Title>
              <Drawer.CloseButton />
            </Flex>
            <Box className="px-md">
              <Input
                value={filterText}
                rightSection={<span className="material-icons">search</span>}
                onChange={e => {
                  setFilterText(e.currentTarget.value);
                }}
                placeholder="Search across categories"
              />
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
              <Divider className="p-md" />
              <List.Item>
                <NavLink label="HOME" href="/news" />
              </List.Item>
              {groupedCategories.map(([initial, categories]) => (
                <List.Item key={initial}>
                  <Divider label={initial.toUpperCase()} labelPosition="left" className="p-md" />
                  <List
                    styles={{
                      itemWrapper: { width: '100%' },
                      itemLabel: { width: '100%' },
                    }}>
                    {categories.map(({ label, href }) => (
                      <List.Item key={href}>
                        <NavLink label={<Highlight highlight={filterText}>{label}</Highlight>} href={href} />
                      </List.Item>
                    ))}
                  </List>
                </List.Item>
              ))}
            </List>
          </Box>
          <Box className="grid sticky bottom-0 left-0 right-0" style={{ backgroundColor: 'var(--mantine-color-body)' }}>
            <Divider />
            <Flex align="center" gap="xs" p="md" justify="flex-end">
              <span className="material-icons">info</span>
              <Text c="dimmed">{filteredCategories.length} categories fetched</Text>
            </Flex>
          </Box>
        </Drawer.Body>
      </Drawer.Content>
    </Drawer.Root>
  );
}

