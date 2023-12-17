import { Box, CloseButton, Divider, Drawer, Flex, Highlight, List, NavLink, ScrollArea, Skeleton, Text, TextInput, useMantineTheme } from '@mantine/core';
import { useViewportSize } from '@mantine/hooks';
import { useEffect, useMemo, useState } from 'react';
import { useScreenSizeWatcher } from '@landing-pages/react/common/hooks';
import { setSelectedCategory, useAppDispatch, useAppSelector, useGetAvailableNewsCategoriesQuery } from '../../store';
import { ErrorCard } from '@landing-pages/react/common/components';

export function NewsDrawer({ opened, close }: { opened: boolean; close: () => void }) {
  const theme = useMantineTheme();
  const { width } = useViewportSize();
  const { isNarrowViewport } = useScreenSizeWatcher({ theme, width });
  const dispatch = useAppDispatch();
  const selectedCategory = useAppSelector(state => state.news.selectedCategory);

  const { data, error, isError, isLoading, isSuccess } = useGetAvailableNewsCategoriesQuery();

  const [filteredCategories, setFilteredCategories] = useState<string[]>([]);
  const [filterText, setFilterText] = useState<string>('');

  const groupedCategories = useMemo(
    () =>
      [
        ...filteredCategories
          .reduce((acc, category) => {
            acc.set(category.charAt(0).toLowerCase(), [
              ...(acc.get(category.charAt(0).toLowerCase()) || []),
              {
                label: category.toUpperCase(),
              },
            ]);
            return acc;
          }, new Map<string, { label: string }[]>())
          .entries(),
      ].sort((a, b) => a[0].localeCompare(b[0])),
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
              <TextInput
                value={filterText}
                rightSection={!filterText ? <span className="material-icons">search</span> : <CloseButton onClick={() => setFilterText('')} />}
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
          {isLoading ? (
            <Box className="grid gap-md p-md">
              {Array.from({ length: 5 }).map((_, index) => (
                // eslint-disable-next-line react/no-array-index-key
                <Skeleton key={`news-drawer-skeleton-${index}`} height={16} />
              ))}
            </Box>
          ) : null}
          {isSuccess ? (
            <Box className="grid gap-md">
              <List
                styles={{
                  itemWrapper: { width: '100%' },
                  itemLabel: { width: '100%' },
                }}>
                <Divider className="p-md" />
                <List.Item>
                  <NavLink
                    variant={selectedCategory === '' ? 'light' : 'subtle'}
                    label="HOME"
                    href="/news"
                    onClick={() => {
                      dispatch(setSelectedCategory(''));
                    }}
                  />
                </List.Item>
                {groupedCategories.map(([initial, categories]) => (
                  <List.Item key={initial}>
                    <Divider label={initial.toUpperCase()} labelPosition="left" className="p-md" />
                    <List
                      styles={{
                        itemWrapper: { width: '100%' },
                        itemLabel: { width: '100%' },
                      }}>
                      {categories.map(({ label }) => (
                        <List.Item key={label}>
                          <NavLink
                            variant={label.toLowerCase().replace(/\s/g, '-') === selectedCategory ? 'light' : 'subtle'}
                            label={<Highlight highlight={filterText}>{label}</Highlight>}
                            onClick={() => {
                              dispatch(setSelectedCategory(label.toLowerCase().replace(/\s/g, '-')));
                              close();
                            }}
                          />
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
            {isLoading ? (
              <Flex align="center" gap="xs" p="md" justify="flex-end">
                <span className="material-icons animate-spin">autorenew</span>
                <Text c="dimmed">Fetching categories</Text>
              </Flex>
            ) : null}
            {isSuccess ? (
              <Flex align="center" gap="xs" p="md" justify="flex-end">
                <span className="material-icons">info</span>
                <Text c="dimmed">
                  {filteredCategories.length} {`${filteredCategories.length === 1 ? 'category' : 'categories'}`} available
                </Text>
              </Flex>
            ) : null}
            {isError ? (
              <Flex align="center" gap="xs" p="md" justify="flex-end">
                <Text className="grid place-content-center leading-[normal]" c="red">
                  <span className="material-icons">warning</span>
                </Text>
                <Text className="leading-[normal]" c="red">
                  Unable to fetch categories
                </Text>
              </Flex>
            ) : null}
          </Box>
        </Drawer.Body>
      </Drawer.Content>
    </Drawer.Root>
  );
}
