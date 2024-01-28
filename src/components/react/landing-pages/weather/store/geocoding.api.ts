import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type { Location } from '../types';

export const geoCodingApi = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: 'https://api.api-ninjas.com/v1/geocoding' }),
  endpoints: (builder) => ({
    searchCity: builder.query<Location[], { apiKey: string; city: string }>({
      query: ({ apiKey, city }) => ({ url: `?q=${city}&appid=${apiKey}`, headers: { 'X-Api-Key': apiKey } }),
    }),
  }),
});
