import { ErrorCard } from '@landing-pages/react/common/components';
import { useScreenSizeWatcher } from '@landing-pages/react/common/hooks';
import type { QueryHooks } from '@landing-pages/react/common/types';
import { Box, useMantineTheme } from '@mantine/core';
import { useListState, useViewportSize } from '@mantine/hooks';
import { useMemo } from 'react';
import type { INewsResponse } from '../types';
import { NewsCarousel } from './NewsCarousel';
import { NewsItem } from './NewsItem';
import { NewsSection } from './NewsSection';
import { NewsSkeleton } from './NewsSkeleton';

export function NewsLayout({ category, response }: { category: string; response: QueryHooks<INewsResponse> }) {
  const theme = useMantineTheme();
  const { width } = useViewportSize();
  const { isNarrowViewport } = useScreenSizeWatcher({ theme, width });

  const { data, error, isError, isLoading, isSuccess } = response;
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
    'carousel',
  ]);

  const headlines = useMemo(() => (data?.news ?? []).slice(0, latestNewsGridAreaList.length - 1), [data, latestNewsGridAreaList]);
  const otherNews = useMemo(() => (data?.news ?? []).slice(latestNewsGridAreaList.length - 1), [data, latestNewsGridAreaList]);

  return (
    <NewsSection name={category}>
      <Box className="grid gap-md">
        <Box
          className="grid gap-xl"
          style={{
            gridTemplateAreas: isNarrowViewport
              ? `
                'top-middle-left-center'
                'top-right'
                'top-middle-right'
                'middle-left'
                'middle-center'
                'middle-right'
                'bottom-left'
                'bottom-middle-left'
                'bottom-middle-right-center'
                'carousel'
              `
              : `
                'top-middle-left-center top-middle-left-center top-right'
                'top-middle-left-center top-middle-left-center top-middle-right'
                'middle-left middle-center middle-right'
                'bottom-middle-left bottom-middle-right-center bottom-middle-right-center'
                'bottom-left bottom-middle-right-center bottom-middle-right-center'
                'carousel carousel carousel'
              `,
          }}>
          {isLoading
            ? latestNewsGridAreaList.map(area => (
                <Box key={area} style={{ gridArea: area }}>
                  <NewsSkeleton />
                </Box>
              ))
            : null}
          {isSuccess ? (
            <>
              {headlines.map((newsItem, index) => (
                <Box key={newsItem.id} style={{ gridArea: latestNewsGridAreaList[index] }}>
                  <NewsItem newsItem={newsItem} largeArea={['top-middle-left-center', 'bottom-middle-right-center'].includes(latestNewsGridAreaList[index])} />
                </Box>
              ))}

              <Box style={{ gridArea: latestNewsGridAreaList.at(-1) }}>
                <NewsCarousel newsItemList={otherNews} />
              </Box>
            </>
          ) : null}
          {isError ? <ErrorCard error={error} /> : null}
        </Box>
      </Box>
    </NewsSection>
  );
}

