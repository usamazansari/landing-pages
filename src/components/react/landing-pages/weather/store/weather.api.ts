import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type { Forecast, Location } from '../types';

export const weatherApi = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: 'https://api.openweathermap.org/data/3.0/onecall' }),
  endpoints: builder => ({
    getCurrentForecast: builder.query<Forecast, { apiKey: string; lat: number; lon: number }>({
      query: ({ apiKey, lat, lon }) => `?lat=${lat}&lon=${lon}&appid=${apiKey}`,
    }),
    getCityCoordinates: builder.query<Location, { apiKey: string; city: string }>({
      query: ({ apiKey, city }) => `?q=${city}&appid=${apiKey}`,
    }),
  }),
});

export const { useGetCityCoordinatesQuery, useLazyGetCityCoordinatesQuery, useGetCurrentForecastQuery, useLazyGetCurrentForecastQuery } = weatherApi;
