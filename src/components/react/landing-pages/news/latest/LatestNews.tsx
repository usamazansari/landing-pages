import { Box } from '@mantine/core';
import { useListState } from '@mantine/hooks';
import { useMemo } from 'react';
import { ErrorCard } from '../../../error-boundary';
import { NewsCarousel, NewsItem, NewsSection, NewsSkeleton } from '../common';
import { useLatestNewsApi } from '../useNewsApi';
import { Layout } from './Layout';

export function LatestNews({ apiKey }: { apiKey: string }) {
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
    <NewsSection name="Latest News">
      {isLoading ? (
        <Layout>
          {latestNewsGridAreaList.map(area => (
            <Box key={area} style={{ gridArea: area }}>
              <NewsSkeleton />
            </Box>
          ))}
        </Layout>
      ) : null}
      {isSuccess ? (
        <Box className="grid gap-md">
          <Layout>
            {headlines.map((newsItem, index) => (
              <Box key={newsItem.id} style={{ gridArea: latestNewsGridAreaList[index] }}>
                <NewsItem newsItem={newsItem} largeArea={['top-middle-left-center', 'bottom-middle-right-center'].includes(latestNewsGridAreaList[index])} />
              </Box>
            ))}
          </Layout>
          <NewsCarousel newsItemList={otherNews} />
        </Box>
      ) : null}
      {isError ? <ErrorCard error={error} /> : null}
    </NewsSection>
  );
}
