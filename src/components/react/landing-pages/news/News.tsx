import { Badge, Box, Card, Flex, Image, MantineProvider, ScrollArea, Skeleton, Spoiler, Text, Title, useMantineTheme } from '@mantine/core';
import { theme } from '../../../../config/mantine/mantine.theme';
import { ErrorBoundary, ErrorBoundaryFallback, ErrorCard } from '../../error-boundary';
import { useNewsApi } from './useNewsApi';
import { useListState, useMediaQuery } from '@mantine/hooks';
import React, { useMemo } from 'react';
import type { News } from './News.types';

function NewsLayout({ children }: { children: React.ReactNode }) {
  const theme = useMantineTheme();
  const isNarrow = useMediaQuery(`(max-width: ${theme.breakpoints.md})`);
  return (
    <Box
      className="grid gap-4"
      style={{
        gridTemplateAreas: isNarrow
          ? `
            'enlarged-full'
            'aside-top'
            'aside-bottom'
            'center-left'
            'center'
            'center-right'
            'enlarged-horizontal'
            'bottom-right'
          `
          : `
          'enlarged-full enlarged-full aside-top'
          'enlarged-full enlarged-full aside-bottom'
          'center-left center center-right'
          'enlarged-horizontal enlarged-horizontal bottom-right'
          `,
      }}>
      {children}
    </Box>
  );
}

function NewsItemLayout({ children }: { children: React.ReactNode }) {
  const theme = useMantineTheme();
  const isNarrow = useMediaQuery(`(max-width: ${theme.breakpoints.md})`);

  return (
    <Box
      className="grid gap-4"
      style={{
        gridTemplateAreas: isNarrow
          ? `
              'image'
              'title'
              'category'
              'published'
              'description'
            `
          : `
              'image image title'
              'image image category'
              'published empty empty'
              'description description description'
            `,
      }}>
      {children}
    </Box>
  );
}

function NewsSkeleton({ scale }: { scale: number }) {
  const theme = useMantineTheme();
  const isNarrow = useMediaQuery(`(max-width: ${theme.breakpoints.md})`);

  const scaleFactor = useMemo(() => (isNarrow ? 4 : scale), []);

  return (
    <NewsItemLayout>
      <Skeleton height={32 * scaleFactor} width="100%" style={{ gridArea: 'image' }} />
      <Skeleton height={3 * scaleFactor} style={{ gridArea: 'title', alignSelf: 'flex-end' }} />
      <Flex direction="column" style={{ gridArea: 'category' }} gap="xs">
        <Skeleton height={2 * scaleFactor} />
        <Skeleton height={2 * scaleFactor} width="80%" />
      </Flex>
      <Skeleton height={1 * scaleFactor} width="30%" style={{ gridArea: 'published', alignSelf: 'flex-end' }} />
      <Flex direction="column" gap="xs" style={{ gridArea: 'description' }}>
        <Skeleton height={1 * scaleFactor} />
        <Skeleton height={1 * scaleFactor} />
        <Skeleton height={1 * scaleFactor} width="65%" />
      </Flex>
    </NewsItemLayout>
  );
}

function NewsItem({ image, title, category, published, description }: News['news'][number]) {
  return (
    <NewsItemLayout>
      <Image src={image} style={{ gridArea: 'image' }} />
      <Title order={3} style={{ gridArea: 'title', alignSelf: 'flex-end' }}>
        {title}
      </Title>
      <Flex align="center" wrap="wrap" gap="xs" style={{ gridArea: 'category' }}>
        {category.map(c => (
          <Badge variant="filled">{c.toUpperCase()}</Badge>
        ))}
      </Flex>
      <Text size="sm" c="dimmed" style={{ gridArea: 'published', alignSelf: 'flex-end' }}>
        {new Date(published).toDateString()}
      </Text>
      <Flex direction="column" gap="xs" style={{ gridArea: 'description' }}>
        <Spoiler hideLabel="Show less" showLabel="Show more" maxHeight={42}>
          {description}
        </Spoiler>
      </Flex>
    </NewsItemLayout>
  );
}

export function News({ apiKey }: { apiKey: string }) {
  const { data, isError, isLoading, isSuccess, error } = useNewsApi({ apiKey });
  const [gridAreaList] = useListState([
    'enlarged-full',
    'aside-top',
    'aside-bottom',
    'center-left',
    'center',
    'center-right',
    'enlarged-horizontal',
    'bottom-right',
  ]);

  const slicedNews = useMemo(() => data?.news?.slice(0, gridAreaList.length - 2) ?? [], [data, gridAreaList]);

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
                {gridAreaList.map((area, index) => (
                  <Box key={area} style={{ gridArea: area }}>
                    <NewsSkeleton scale={!index ? 4 : 12} />
                  </Box>
                ))}
              </NewsLayout>
            ) : null}
            {isSuccess ? (
              <NewsLayout>
                {slicedNews.map((newsItem, index) => (
                  <Box key={newsItem.id} style={{ gridArea: gridAreaList[index] }}>
                    <NewsItem {...newsItem} />
                  </Box>
                ))}
              </NewsLayout>
            ) : null}
            {isError ? ErrorCard(error) : null}
          </Flex>
        </ScrollArea>
      </ErrorBoundary>
    </MantineProvider>
  );
}
