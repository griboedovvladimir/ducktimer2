// eslint-disable-next-line import/no-extraneous-dependencies
import { createApi } from '@reduxjs/toolkit/query/react';

import { baseQuery } from '../store/base-query';
import { RequestMethod } from '../shared/enums';

export const filmApiService = createApi({
  baseQuery,
  reducerPath: 'filmApiService',
  tagTypes: ['Films', 'FilmProperty'],
  endpoints: (build) => ({
    fetchFilms: build.query<{ films: string[]; developers: string[] }, string>({
      query: () => ({
        url: `backend/filmform.php`,
        method: RequestMethod.GET,
      }),
      providesTags: () => ['Films'],
    }),
    fetchFilmsProperties: build.query<
      { iso: string[]; dilution: string[]; temp: string[] },
      { film: string; dev: string }
    >({
      query: (body) => ({
        url: `backend/filmform2.php`,
        method: RequestMethod.POST,
        body,
      }),
      providesTags: () => ['FilmProperty'],
    }),
  }),
});

export const { useFetchFilmsQuery, useFetchFilmsPropertiesQuery } = filmApiService;
