import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type { Country, City } from '../types';

const WEATHER_API_URL = 'https://api.openweathermap.org/data/2.5/weather';
const GEOCODING_API_URL = 'https://api.api-ninjas.com/v1/geocoding';
const COUNTRIES_API_URL = 'https://restcountries.com/v3.1';

export const weatherApi = createApi({
  baseQuery: fetchBaseQuery({}),
  endpoints: (builder) => ({
    searchCity: builder.query<City[], { apiKey: string; city: string }>({
      query: ({ apiKey, city }) => ({ url: `${GEOCODING_API_URL}?city=${city}`, headers: { 'X-Api-Key': apiKey } }),
    }),
    getCountriesList: builder.query<Country[], { countryCodeListStringified: string }>({
      query: ({ countryCodeListStringified }) => ({
        url: `${COUNTRIES_API_URL}/alpha?codes=${countryCodeListStringified}&fields=name,cca2,cca3`,
      }),
    }),
  }),
});
