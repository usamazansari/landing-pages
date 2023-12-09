import { ErrorCard } from '@landing-pages/react/common/components';
import { randomId } from '@mantine/hooks';
import { useMemo } from 'react';
import { useNewsApi } from '../../hooks';
import type { INews } from '../../types';
import { NewsCarousel } from './NewsCarousel';
import { NewsSection } from './NewsSection';

export function RelatedPopularNews({ apiKey, category }: { apiKey: string; category: string }) {
  const { data, error, isError, isLoading, isSuccess } = useNewsApi({
    apiKey,
    category,
  });
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

  return (
    <NewsSection name={category}>
      {isLoading ? <NewsCarousel newsItemList={emptyNews} /> : null}
      {isSuccess ? <NewsCarousel newsItemList={data?.news} /> : null}
      {isError ? <ErrorCard error={error} /> : null}
    </NewsSection>
  );
}
