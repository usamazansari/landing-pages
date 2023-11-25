import type { QueryHooks } from '@landing-pages/react/common/types';
import { useEffect, useState } from 'react';
import type { INewsCategoryResponse, INewsResponse } from '../types';

const BASE_URL = 'https://api.currentsapi.services/v1';
const USE_CACHE = true;

export const useNewsApi = ({ apiKey, category }: { apiKey: string; category?: string }): QueryHooks<INewsResponse> => {
  const endpoint = `${BASE_URL}/latest-news?apiKey=${apiKey}${!category ? '' : '&category=' + category}`;
  const [data, setData] = useState<INewsResponse | null>(null);
  const [error, setError] = useState<Error | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  useEffect(() => {
    (async function () {
      try {
        setIsLoading(true);
        const response = await fetch(endpoint, { cache: USE_CACHE ? 'force-cache' : 'default' });
        const json = (await response.json()) as INewsResponse;
        setData(json);
        setIsSuccess(true);
      } catch (error: unknown) {
        setError((error as Error) ?? new Error('Something went wrong!'));
      } finally {
        setIsLoading(false);
      }
    })();
  }, [apiKey]);

  return { data, isLoading, isSuccess, error, isError: !!error } as QueryHooks<INewsResponse>;
};

export const useAvailableNewsCategoriesApi = () => {
  const endpoint = `${BASE_URL}/available/categories`;
  const [data, setData] = useState<INewsCategoryResponse | null>(null);
  const [error, setError] = useState<Error | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  useEffect(() => {
    (async function () {
      try {
        setIsLoading(true);
        const response = await fetch(endpoint, { cache: USE_CACHE ? 'force-cache' : 'default' });
        const json = (await response.json()) as INewsCategoryResponse;
        setData(json);
        setIsSuccess(true);
      } catch (error: unknown) {
        setError((error as Error) ?? new Error('Something went wrong!'));
      } finally {
        setIsLoading(false);
      }
    })();
  }, []);

  return { data, isLoading, isSuccess, error, isError: !!error } as QueryHooks<INewsCategoryResponse>;
};
