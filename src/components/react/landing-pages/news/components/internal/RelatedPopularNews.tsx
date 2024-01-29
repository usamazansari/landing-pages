import { ErrorCard } from '@landing-pages/react/common/components';
import { randomId } from '@mantine/hooks';
import { useEffect, useMemo } from 'react';
import { setShouldRefetch, useAppDispatch, useAppSelector, useGetNewsQuery } from '../../store';
import type { INews } from '../../types';
import { NewsCategoryMapper } from '../../utils';
import { NewsCarousel } from './NewsCarousel';
import { NewsSection } from './NewsSection';

export function RelatedPopularNews({ category }: { category: string }) {
  const dispatch = useAppDispatch();
  const apiKey = useAppSelector((state) => state.news.apiKey);
  const shouldRefetch = useAppSelector((state) => state.news.shouldRefetch);
  const { data, error, isError, isLoading, isSuccess, refetch } = useGetNewsQuery(
    { apiKey, category },
    {
      skip: !apiKey,
    },
  );

  const newsItemList = useMemo(() => NewsCategoryMapper(data?.news ?? []), [data?.news]);

  const emptyNews = useMemo(
    () =>
      // eslint-disable-next-line no-sparse-arrays
      [, , ,].map(
        () =>
          ({
            author: '',
            category: [],
            description: '',
            id: randomId(),
            image: '',
            language: '',
            published: '',
            title: '',
            url: '',
          }) as INews,
      ) as INews[],
    [],
  );

  useEffect(() => {
    if (shouldRefetch) {
      refetch();
      dispatch(setShouldRefetch(false));
    }
  }, [dispatch, refetch, shouldRefetch]);

  return (
    <NewsSection category={category}>
      {isLoading ? <NewsCarousel newsItemList={emptyNews} /> : null}
      {isSuccess ? <NewsCarousel newsItemList={newsItemList} /> : null}
      {isError ? <ErrorCard error={error} /> : null}
    </NewsSection>
  );
}
