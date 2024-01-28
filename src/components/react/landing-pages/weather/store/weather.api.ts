import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type { Forecast } from '../types';

export const weatherApi = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: '' }),
  endpoints: (builder) => ({
    getCurrentForecast: builder.query<Forecast, { apiKey: string; lat: number; lon: number }>({
      query: ({ apiKey, lat, lon }) => `?lat=${lat}&lon=${lon}&appid=${apiKey}`,
    }),
  }),
});
