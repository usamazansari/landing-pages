import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const dataVisualizationApi = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: '' }),
  endpoints: builder => ({}),
});

// export const {} = dataVisualizationApi;
