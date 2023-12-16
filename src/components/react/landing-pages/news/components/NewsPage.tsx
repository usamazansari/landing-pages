import { PageWithAffix } from '@landing-pages/react/common/components';
import { useEffect } from 'react';
import { setAPIKey, useAppDispatch } from '../store';
import { News } from './News';
import { NewsFooter } from './NewsFooter';
import { NewsHeader } from './NewsHeader';

export function NewsPage({ apiKey }: { apiKey: string }) {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(setAPIKey(apiKey));
  }, [apiKey, dispatch]);

  return <PageWithAffix nav={<NewsHeader />} main={<News />} footer={<NewsFooter />} />;
}
