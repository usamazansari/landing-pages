import { Badge, Box, Card, Flex, Image, MantineProvider, ScrollArea, Skeleton, Spoiler, Text, useMantineTheme } from '@mantine/core';
import { useListState, useMediaQuery } from '@mantine/hooks';
import React, { useMemo } from 'react';
import { theme } from '../../../../config/mantine/mantine.theme';
import { ErrorBoundary, ErrorBoundaryFallback, ErrorCard } from '../../error-boundary';
import type { News } from './News.types';
import { useNewsApi } from './useNewsApi';

function NewsLayout({ children }: { children: React.ReactNode }) {
  const theme = useMantineTheme();
  const isNarrow = useMediaQuery(`(max-width: ${theme.breakpoints.md})`);

  return (
    <Box
      className="grid gap-xl"
      style={{
        gridTemplateAreas: isNarrow
          ? `'top-middle-left-center'
          'top-right'
          'top-middle-right'
          'middle-left'
          'middle-center'
          'middle-right'
          'bottom-left'
          'bottom-middle-left'
          'bottom-middle-right-center'
          `
          : `'top-middle-left-center top-middle-left-center top-right'
          'top-middle-left-center top-middle-left-center top-middle-right'
          'middle-left middle-center middle-right'
          'bottom-middle-left bottom-middle-right-center bottom-middle-right-center'
          'bottom-left bottom-middle-right-center bottom-middle-right-center'`,
      }}>
      {children}
    </Box>
  );
}

function NewsSkeleton() {
  return (
    <Card withBorder>
      <Card.Section>
        <Skeleton height={250} />
      </Card.Section>
      <Box mt="md" className="grid gap-md">
        <Skeleton height={24} />
        <Flex align="center" justify="space-between">
          <Skeleton height={16} />
          <Flex align="flex-start" wrap="wrap" gap="xs">
            <Skeleton height={16} />
            <Skeleton height={16} />
          </Flex>
        </Flex>
        <Flex direction="column">
          <Skeleton height={80} />
        </Flex>
      </Box>
    </Card>
  );
}

function NewsItem({ newsItem, largeArea }: { newsItem: News['news'][number]; largeArea: boolean }) {
  return (
    <Card className="h-full" withBorder>
      <Card.Section>
        <Image
          h={largeArea ? 750 : 250}
          src={newsItem.image}
          fallbackSrc="https://img.freepik.com/free-vector/flat-design-no-data-illustration_23-2150527142.jpg"
        />
      </Card.Section>
      <Box mt="md" className="grid gap-md">
        <Text fw="bold">{newsItem.title}</Text>
        <Flex align="center" justify="flex-start" gap="md">
          <Text size="sm" c="dimmed" fs="italic" className="flex items-center gap-xs">
            <span className="material-icons">today</span>
            {new Date(newsItem.published).toDateString()}
          </Text>
          <Flex align="flex-start" wrap="wrap" gap="xs">
            {newsItem.category.map(c => (
              <Badge variant="filled">{c.toUpperCase()}</Badge>
            ))}
          </Flex>
        </Flex>
        <Flex direction="column" gap="xs">
          <Spoiler hideLabel="Show less" showLabel="Show more" maxHeight={42}>
            {newsItem.description}
          </Spoiler>
        </Flex>
      </Box>
    </Card>
  );
}

export function News({ apiKey }: { apiKey: string }) {
  const { data, isError, isLoading, isSuccess, error } = useNewsApi({ apiKey });
  const [gridAreaList] = useListState([
    'top-middle-left-center',
    'top-right',
    'top-middle-right',
    'middle-left',
    'middle-center',
    'middle-right',
    'bottom-left',
    'bottom-middle-left',
    'bottom-middle-right-center',
  ]);

  const slicedNews = useMemo(() => (data?.news ?? []).slice(0, gridAreaList.length + 3), [data, gridAreaList]);

  return (
    <MantineProvider theme={theme}>
      <ErrorBoundary fallback={<ErrorBoundaryFallback />}>
        <ScrollArea h="100%" className="m-4">
          <Flex direction="column" gap="lg" className="container mx-auto">
            <Card className="h-32 grid place-content-center" withBorder>
              <Text ta="center">Advertisement</Text>
            </Card>
            {isLoading ? (
              <NewsLayout>
                {gridAreaList.map(area => (
                  <Box key={area} style={{ gridArea: area }}>
                    <NewsSkeleton />
                  </Box>
                ))}
              </NewsLayout>
            ) : null}
            {isSuccess ? (
              <NewsLayout>
                {slicedNews.map((newsItem, index) => (
                  <Box key={newsItem.id} style={{ gridArea: gridAreaList[index] }}>
                    <NewsItem newsItem={newsItem} largeArea={['top-middle-left-center', 'bottom-middle-right-center'].includes(gridAreaList[index])} />
                  </Box>
                ))}
              </NewsLayout>
            ) : null}
            {isError ? <ErrorCard error={error} /> : null}
          </Flex>
        </ScrollArea>
      </ErrorBoundary>
    </MantineProvider>
  );
}
