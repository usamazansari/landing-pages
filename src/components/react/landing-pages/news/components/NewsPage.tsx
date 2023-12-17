import { PageWithAffix } from '@landing-pages/react/common/components';
import { useEffect } from 'react';
import { setAPIKey, setSelectedCategory, useAppDispatch } from '../store';
import { News } from './News';
import { NewsFooter } from './NewsFooter';
import { NewsHeader } from './NewsHeader';

export function NewsPage({ apiKey, selectedCategory }: { apiKey: string; selectedCategory?: string }) {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(setAPIKey(apiKey));
  }, [apiKey, dispatch]);

  useEffect(() => {
    if (!selectedCategory) return;
    dispatch(setSelectedCategory(selectedCategory.toLowerCase().replace(/[\s_]/g, '-')));
  }, [dispatch, selectedCategory]);

  return <PageWithAffix nav={<NewsHeader />} main={<News />} footer={<NewsFooter />} />;
}
