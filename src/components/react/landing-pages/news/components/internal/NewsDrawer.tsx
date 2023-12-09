import { Box, Divider, Drawer, Flex, Highlight, Input, List, NavLink, ScrollArea, Skeleton, Text, useMantineTheme } from '@mantine/core';
import { useViewportSize } from '@mantine/hooks';
import { useEffect, useMemo, useState } from 'react';
import { useScreenSizeWatcher } from '../../../../common/hooks';
import type { QueryHooks } from '@landing-pages/react/common/types';
import type { INewsCategoryResponse } from 'src/components/react/landing-pages/news/types';
import { ErrorCard } from '@landing-pages/react/common/components';

export function NewsDrawer({ response, opened, close }: { response: QueryHooks<INewsCategoryResponse>; opened: boolean; close: () => void }) {
  const theme = useMantineTheme();
  const { width } = useViewportSize();
  const { isNarrowViewport } = useScreenSizeWatcher({ theme, width });

  const { data, error, isError, isLoading, isSuccess } = response;

  const [filteredCategories, setFilteredCategories] = useState<string[]>([]);
  const [filterText, setFilterText] = useState<string>('');

  const groupedCategories = useMemo(
    () => [
      ...filteredCategories
        .sort((a, b) => a.localeCompare(b))
        .reduce((acc, category) => {
          acc.set(category.charAt(0).toLowerCase(), [
            ...(acc.get(category.charAt(0).toLowerCase()) || []),
            {
              label: category.toUpperCase(),
              href: `/news/${category.toLowerCase().replace(/\s/g, '-')}`,
            },
          ]);
          return acc;
        }, new Map<string, { label: string; href: string }[]>())
        .entries(),
    ],
    [filteredCategories],
  );

  useEffect(() => {
    setFilteredCategories(
      !filterText ? data?.categories ?? [] : (data?.categories ?? []).filter(category => category.toLowerCase().includes(filterText.toLowerCase())),
    );
  }, [data?.categories, filterText]);

  return (
    <Drawer.Root opened={opened} onClose={close} size={isNarrowViewport ? '100%' : 'md'} scrollAreaComponent={ScrollArea.Autosize}>
      <Drawer.Overlay visibleFrom="sm" backgroundOpacity={0.5} blur={4} />
      <Drawer.Content>
        <Drawer.Header p={0}>
          <Flex direction="column" className="w-full">
            <Flex align="center" gap="md" className="pr-xs">
              <Drawer.Title className="cursor-default">
                <Flex align="center" gap="xs" p="md">
                  <span className="material-icons">category</span>
                  <Text fw={500}>Categories</Text>
                </Flex>
              </Drawer.Title>
              <Drawer.CloseButton />
            </Flex>
            <Box className="px-md pb-md">
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
          {isLoading
            ? [, , , ,].map((_, index) => (
                <Box className="grid gap-md">
                  <Skeleton key={index} height={16} />
                </Box>
              ))
            : null}
          {isSuccess ? (
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
          ) : null}
          {isError ? <ErrorCard error={error} /> : null}

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

