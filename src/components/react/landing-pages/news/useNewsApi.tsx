import type { QueryHooks } from '../../utils';
import { useState, useEffect } from 'react';

interface NewsElement {
  id: string;
  title: string;
  description: string;
  url: string;
  author: string;
  image: string;
  language: string;
  category: string[];
  published: string;
}

export interface News {
  status: string;
  news: NewsElement[];
}

export const useNewsApi = ({ apiKey }: { apiKey: string }) => {
  const [data, setData] = useState<unknown>(null);
  const [error, setError] = useState<unknown>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const pResolve = () =>
    new Promise<unknown[]>((resolve, reject) => {
      setTimeout(() => {
        resolve([{ id: 1 }]);
      }, 2000);
    });

  const pReject = () =>
    new Promise((resolve, reject) => {
      setTimeout(() => {
        reject(new Error('Unable to load the data'));
      }, 2000);
    });

  useEffect(() => {
    (async function () {
      try {
        setIsLoading(true);
        const response = await fetch(`https://api.currentsapi.services/v1/latest-news?apiKey=${apiKey}`);
        const json = response.json();
        setData(json as unknown as News);
        setIsSuccess(true);
      } catch (error: unknown) {
        setError((error as Error).message);
      } finally {
        setIsLoading(false);
      }
    })();
  }, [apiKey]);

  return { data, isLoading, isSuccess, error, isError: !!error } as QueryHooks<unknown>;
};
