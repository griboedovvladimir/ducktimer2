// eslint-disable-next-line import/no-extraneous-dependencies
import { createApi } from '@reduxjs/toolkit/query/react';

import { baseQuery } from '../store/base-query';
import { RequestMethod } from '../shared/enums';

export const filmApiService = createApi({
  baseQuery,
  reducerPath: 'filmApiService',
  tagTypes: ['CloseReason'],
  endpoints: (build) => ({
    fetchFilms: build.query<{ films: string[]; developers: string[] }, string>({
      query: () => ({
        url: `backend/filmform.php`,
        method: RequestMethod.GET,
      }),
      providesTags: () => ['CloseReason'],
    }),
  }),
});

export const { useFetchFilmsQuery } = filmApiService;
