// eslint-disable-next-line import/no-extraneous-dependencies
import { createApi } from '@reduxjs/toolkit/query/react';

import { baseQuery } from '../store/base-query';
import { RequestMethod } from '../shared/enums';

interface ITimeParams {
  asaiso: string;
  dilution: string;
  temp: string;
  film: string;
  dev: string;
}

export const filmApiService = createApi({
  baseQuery,
  reducerPath: 'filmApiService',
  tagTypes: ['Films', 'FilmProperty', 'FilmTime', 'TempConvert'],
  endpoints: (build) => ({
    fetchFilms: build.query<{ films: string[]; developers: string[] }, string>({
      query: () => ({
        url: `backend/filmform.php`,
        method: RequestMethod.GET,
      }),
      providesTags: () => ['Films'],
    }),
    fetchFilmsProperties: build.query<{ asaiso: string[]; dilution: string[]; temp: string[] }, Partial<ITimeParams>>({
      query: (body) => ({
        url: `backend/filmform2.php`,
        method: RequestMethod.POST,
        body,
      }),
      providesTags: () => ['FilmProperty'],
    }),
    fetchTime: build.query<string, ITimeParams>({
      query: (body) => ({
        url: `backend/filmformset.php`,
        method: RequestMethod.POST,
        body,
      }),
      providesTags: () => ['FilmTime'],
    }),
    calculateTemp: build.query<null, string>({
      query: (body) => ({
        url: `backend/todigitaltruth.php`,
        method: RequestMethod.POST,
        body,
      }),
      providesTags: () => ['TempConvert'],
    }),
  }),
});

export const { useFetchFilmsQuery, useFetchFilmsPropertiesQuery, useFetchTimeQuery, useCalculateTempQuery } =
  filmApiService;
