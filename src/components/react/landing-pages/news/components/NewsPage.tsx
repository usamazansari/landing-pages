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

  return (
    <>
      <nav className="sticky top-0 left-0 right-0 z-10">
        <NewsHeader />
      </nav>
      <main>
        <News />
      </main>
      <footer>
        <NewsFooter />
      </footer>
    </>
  );
}
