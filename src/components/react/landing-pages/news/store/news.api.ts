import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type { INewsCategoryResponse, INewsResponse } from '../types';

export const newsApi = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: 'https://api.currentsapi.services/v1' }),
  endpoints: builder => ({
    getNews: builder.query<INewsResponse, { apiKey: string; category?: string }>({
      query: ({ apiKey, category }) => `latest-news?apiKey=${apiKey}&language=en${!category ? '' : '&category=' + category}`,
    }),
    getAvailableNewsCategories: builder.query<INewsCategoryResponse, void>({
      query: () => 'available/categories',
    }),
  }),
});

export const { useGetAvailableNewsCategoriesQuery, useGetNewsQuery } = newsApi;
