import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query';

export const weatherApi = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: 'https://api.openweathermap.org/data/3.0/onecall' }),
  endpoints: builder => ({
    // TODO: @jitu712: Add types for this.
    getCurrentForecast: builder.query<any, { apiKey: string; lat: number; lon: number }>({
      // https://api.openweathermap.org/data/3.0/onecall?lat={lat}&lon={lon}&exclude={part}&appid={API key}
      query: ({ lat, lon }) => `?lat=${lat}&lon=${lon}&appid=${apiKey}`,
    }),
    getCityCoordinates: builder.query<any, { apiKey: string; city: string }>({
      // http://api.openweathermap.org/geo/1.0/direct?q={city name},{state code},{country code}&limit={limit}&appid={API key}
      query: ({ city }) => `?q=${city}&appid=${apiKey}`,
    }),
  }),
});

export const { useGetCurrentForecastQuery, useGetCityCoordinates } = weatherApi;
