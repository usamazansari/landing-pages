import type { QueryHooks } from '../../utils';
import { useState, useEffect } from 'react';
import type { News, NewsCategory } from './News.types';

export const useLatestNewsApi = ({ apiKey }: { apiKey: string }) => {
  const [data, setData] = useState<News | null>(null);
  const [error, setError] = useState<Error | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  useEffect(() => {
    (async function () {
      try {
        setIsLoading(true);
        const response = await fetch(`https://api.currentsapi.services/v1/latest-news?apiKey=${apiKey}`, { cache: 'force-cache' });
        const json = (await response.json()) as News;
        setData(json);
        setIsSuccess(true);
      } catch (error: unknown) {
        setError((error as Error) ?? new Error('Something went wrong!'));
      } finally {
        setIsLoading(false);
      }
    })();
  }, [apiKey]);

  return { data, isLoading, isSuccess, error, isError: !!error } as QueryHooks<News>;
};

export const useNewsCategoryApi = ({ apiKey, category }: { apiKey: string; category: NewsCategory }) => {
  const [data, setData] = useState<News | null>(null);
  const [error, setError] = useState<Error | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  useEffect(() => {
    (async function () {
      try {
        setIsLoading(true);
        const response = await fetch(`https://api.currentsapi.services/v1/latest-news?apiKey=${apiKey}&category=${category}`, { cache: 'force-cache' });
        const json = (await response.json()) as News;
        setData(json);
        setIsSuccess(true);
      } catch (error: unknown) {
        setError((error as Error) ?? new Error('Something went wrong!'));
      } finally {
        setIsLoading(false);
      }
    })();
  }, [apiKey]);

  return { data, isLoading, isSuccess, error, isError: !!error } as QueryHooks<News>;
};
