import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type { Location } from '../types';

const WEATHER_API_URL = 'https://api.openweathermap.org/data/2.5/weather';
const GEOCODING_API_URL = 'https://api.api-ninjas.com/v1/geocoding';

export const weatherApi = createApi({
  baseQuery: fetchBaseQuery({}),
  endpoints: (builder) => ({
    searchCity: builder.query<Location[], { apiKey: string; city: string }>({
      query: ({ apiKey, city }) => ({ url: `${GEOCODING_API_URL}?city=${city}`, headers: { 'X-Api-Key': apiKey } }),
    }),
  }),
});
