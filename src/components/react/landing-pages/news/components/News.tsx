import { ActionIcon, Affix, Anchor, Box, Breadcrumbs, Button, Card, Flex, ScrollArea, Space, Text, Transition } from '@mantine/core';
import { useWindowScroll } from '@mantine/hooks';
import { useMemo } from 'react';
import { setShouldRefetch, useAppDispatch, useAppSelector } from '../store';
import { NewsLayout, RelatedPopularNews } from './internal';

export function News() {
  const dispatch = useAppDispatch();
  const category = useAppSelector(state => state.news.selectedCategory);
  const relatedPopularCategories = useAppSelector(state => state.news.relatedPopularCategories);
  const [scroll, scrollTo] = useWindowScroll();

  const items = useMemo(() => {
    const items = [] as { title: string; icon: string; href?: string }[];
    items.push({ title: '', icon: 'home', href: '/' });
    items.push({ title: 'News', icon: '', href: '/news' });
    if (!category) return items;
    items.push({ title: category.toUpperCase(), icon: '' });
    return items;
  }, [category]);

  const breadCrumbItems = useMemo(() => {
    return items.map(item => (
      <Anchor key={item.title.toLowerCase()} href={item?.href} underline="never">
        <Flex align="center" gap="xs">
          {!item.icon ? null : <span className="material-icons">{item.icon}</span>}
          {!item.title ? null : <Text>{item.title}</Text>}
        </Flex>
      </Anchor>
    ));
  }, [items]);

  return (
    <>
      <ScrollArea h="100%">
        <Flex direction="column" gap="lg" className="container mx-auto my-lg">
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
                      <span className="material-icons">refresh</span>
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
        </Flex>
      </ScrollArea>
      <Affix position={{ bottom: 20, right: 20 }}>
        <Transition transition="slide-up" mounted={scroll.y > 0}>
          {transitionStyles => (
            <ActionIcon size="xl" variant="filled" radius="xl" onClick={() => scrollTo({ y: 0 })} style={transitionStyles}>
              <span className="material-icons">expand_less</span>
            </ActionIcon>
          )}
        </Transition>
      </Affix>
    </>
  );
}
