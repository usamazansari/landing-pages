import { ErrorCard } from '@landing-pages/react/common/components';
import { useScreenSizeWatcher } from '@landing-pages/react/common/hooks';
import { Box, useMantineTheme } from '@mantine/core';
import { useListState, useViewportSize } from '@mantine/hooks';
import { useEffect, useMemo } from 'react';
import { useAppDispatch, useAppSelector, useGetNewsQuery, setRelatedPopularCategories, setShouldRefetch } from '../../store';
import { NewsCarousel } from './NewsCarousel';
import { NewsItem } from './NewsItem';
import { NewsSection } from './NewsSection';
import { NewsSkeleton } from './NewsSkeleton';
import { NewsCategoryMapper } from '../../utils';

export function NewsLayout() {
  const theme = useMantineTheme();
  const { width } = useViewportSize();
  const { isNarrowViewport } = useScreenSizeWatcher({ theme, width });

  const dispatch = useAppDispatch();
  const apiKey = useAppSelector(state => state.news.apiKey);
  const category = useAppSelector(state => state.news.selectedCategory);
  const shouldRefetch = useAppSelector(state => state.news.shouldRefetch);
  const { data, error, isError, isLoading, isSuccess, refetch } = useGetNewsQuery(
    { apiKey, category },
    {
      skip: !apiKey,
    },
  );

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

  const headlines = useMemo(
    () => NewsCategoryMapper((data?.news ?? []).slice(0, latestNewsGridAreaList.length - 1)),
    [data?.news, latestNewsGridAreaList.length],
  );
  const otherNews = useMemo(() => NewsCategoryMapper((data?.news ?? []).slice(latestNewsGridAreaList.length - 1)), [data?.news, latestNewsGridAreaList.length]);

  useEffect(() => {
    if (shouldRefetch) {
      refetch();
      dispatch(setShouldRefetch(false));
    }
  }, [dispatch, refetch, shouldRefetch]);

  useEffect(() => {
    if (isSuccess) {
      const categories = data?.news
        ?.map(article => article.category)
        .flat()
        .filter(c => c !== category);
      const relatedCategories = Object.entries(
        categories?.reduce((acc: Record<string, number>, category) => {
          acc[category] = (acc[category] || 0) + 1;
          return acc;
        }, {}) ?? {},
      )
        .sort((a, b) => b[1] - a[1])
        .slice(0, 2)
        .map(([category]) => category);
      dispatch(setRelatedPopularCategories(relatedCategories));
    }
  }, [category, data?.news, dispatch, isSuccess]);

  return (
    <NewsSection name={category}>
      <Box className="grid gap-md">
        {isError ? (
          <Box className="grid w-full h-full">
            <ErrorCard error={error} />
          </Box>
        ) : (
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
                    <NewsItem
                      newsItem={newsItem}
                      largeArea={!isNarrowViewport ? ['top-middle-left-center', 'bottom-middle-right-center'].includes(latestNewsGridAreaList[index]) : false}
                    />
                  </Box>
                ))}

                <Box style={{ gridArea: latestNewsGridAreaList.at(-1) }}>
                  <NewsCarousel newsItemList={otherNews} />
                </Box>
              </>
            ) : null}
          </Box>
        )}
      </Box>
    </NewsSection>
  );
}
