import { Carousel } from '@mantine/carousel';
import { Anchor, Badge, Box, Card, Divider, Flex, Image, MantineProvider, ScrollArea, Skeleton, Spoiler, Text, useMantineTheme } from '@mantine/core';
import { useListState, useMediaQuery } from '@mantine/hooks';
import '@mantine/carousel/styles.css';
import React, { useMemo } from 'react';
import { theme } from '../../../../config/mantine/mantine.theme';
import { ErrorBoundary, ErrorBoundaryFallback, ErrorCard } from '../../error-boundary';
import { NewsCategory, type News } from './News.types';
import { useLatestNewsApi, useNewsCategoryApi } from './useNewsApi';

function NewsCarousel({ newsItemList = [] }: { newsItemList: News['news'] }) {
  const theme = useMantineTheme();
  const isNarrow = useMediaQuery(`(max-width: ${theme.breakpoints.md})`);

  return (
    <Box className="grid grid-cols-1">
      {!newsItemList.length ? (
        <Box className="grid place-content-center h-full w-full">
          <Flex align="center">
            <span className="material-icons">error</span>
            <Text c="dimmed">No news available</Text>
          </Flex>
        </Box>
      ) : (
        <Carousel align="start" slideGap="md" slideSize={isNarrow ? '85%' : '30%'} dragFree>
          {newsItemList.map(newsItem => (
            <Carousel.Slide key={newsItem.id}>
              <NewsItem newsItem={newsItem} />
            </Carousel.Slide>
          ))}
        </Carousel>
      )}
    </Box>
  );
}

function CategoricalNews({ apiKey, category }: { apiKey: string; category: NewsCategory }) {
  const theme = useMantineTheme();
  const isNarrow = useMediaQuery(`(max-width: ${theme.breakpoints.md})`);

  const { data, isError, isLoading, isSuccess, error } = useNewsCategoryApi({ apiKey, category });

  return (
    <NewsSectionBox name={category}>
      {isLoading ? (
        <Box className="grid gap-xl grid-cols-1 md:grid-cols-3">
          <NewsSkeleton />
          {!isNarrow ? (
            <>
              <NewsSkeleton />
              <NewsSkeleton />
            </>
          ) : null}
        </Box>
      ) : null}
      {isSuccess ? <NewsCarousel newsItemList={data?.news} /> : null}
      {isError ? <ErrorCard error={error} /> : null}
    </NewsSectionBox>
  );
}

function NewsLayoutForLatestNews({ children }: { children: React.ReactNode }) {
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

function NewsItem({ newsItem, largeArea = false }: { newsItem: News['news'][number]; largeArea?: boolean }) {
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
        <Anchor href={newsItem.url} target="_blank" fw="bold">
          {newsItem.title}
        </Anchor>
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

function NewsSectionBox({ name, children }: { name: string; children: React.ReactNode }) {
  return (
    <Box className="grid gap-md">
      <Divider
        label={
          <Text size="lg" fw="bold">
            {name.toLowerCase().replace(/./i, $ => $.toUpperCase())}
          </Text>
        }
        labelPosition="left"
      />
      {children}
    </Box>
  );
}

function LatestNews({ apiKey }: { apiKey: string }) {
  const { data, isError, isLoading, isSuccess, error } = useLatestNewsApi({ apiKey });
  const [latestNewsGridAreaList] = useListState([
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

  const headlines = useMemo(() => (data?.news ?? []).slice(0, latestNewsGridAreaList.length), [data, latestNewsGridAreaList]);
  const otherNews = useMemo(() => (data?.news ?? []).slice(latestNewsGridAreaList.length), [data, latestNewsGridAreaList]);

  return (
    <NewsSectionBox name="Latest News">
      {isLoading ? (
        <NewsLayoutForLatestNews>
          {latestNewsGridAreaList.map(area => (
            <Box key={area} style={{ gridArea: area }}>
              <NewsSkeleton />
            </Box>
          ))}
        </NewsLayoutForLatestNews>
      ) : null}
      {isSuccess ? (
        <Box className="grid gap-md">
          <NewsLayoutForLatestNews>
            {headlines.map((newsItem, index) => (
              <Box key={newsItem.id} style={{ gridArea: latestNewsGridAreaList[index] }}>
                <NewsItem newsItem={newsItem} largeArea={['top-middle-left-center', 'bottom-middle-right-center'].includes(latestNewsGridAreaList[index])} />
              </Box>
            ))}
          </NewsLayoutForLatestNews>
          <NewsCarousel newsItemList={otherNews} />
        </Box>
      ) : null}
      {isError ? <ErrorCard error={error} /> : null}
    </NewsSectionBox>
  );
}

export function News({ apiKey }: { apiKey: string }) {
  const [categoryList] = useListState<NewsCategory>([
    NewsCategory.Business,
    NewsCategory.Finance,
    NewsCategory.General,
    NewsCategory.Lifestyle,
    NewsCategory.Politics,
    NewsCategory.Technology,
    NewsCategory.World,
  ]);

  return (
    <MantineProvider theme={theme}>
      <ErrorBoundary fallback={<ErrorBoundaryFallback />}>
        <ScrollArea h="100%" className="m-4">
          <Flex direction="column" gap="lg" className="container mx-auto">
            <Card className="h-32 grid place-content-center" withBorder>
              <Text ta="center">Advertisement</Text>
            </Card>
            <Box className="grid gap-xl">
              <LatestNews apiKey={apiKey} />
              {categoryList.map(category => (
                <CategoricalNews key={category} apiKey={apiKey} category={category} />
              ))}
            </Box>
          </Flex>
        </ScrollArea>
      </ErrorBoundary>
    </MantineProvider>
  );
}
