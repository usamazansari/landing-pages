import { ErrorCard } from '@landing-pages/react/common/components';
import { useMemo } from 'react';
import { useNewsApi } from '../hooks';
import type { INews } from '../types';
import { NewsCarousel } from './NewsCarousel';
import { NewsSection } from './NewsSection';

export function RelatedPopularNews({ apiKey, category }: { apiKey: string; category: string }) {
  const { data, error, isError, isLoading, isSuccess } = useNewsApi({ apiKey, category });
  const emptyNews = useMemo(
    () =>
      Array.from({ length: 4 }).fill({
        author: '',
        category: [],
        description: '',
        id: '',
        image: '',
        language: '',
        published: '',
        title: '',
        url: '',
      } as INews) as INews[],
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

