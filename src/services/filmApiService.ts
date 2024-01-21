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
  tagTypes: ['Films'],
  endpoints: (build) => ({
    fetchFilms: build.query<{ films: string[]; developers: string[] }, string>({
      query: () => ({
        url: `backend/filmform.php`,
        method: RequestMethod.GET,
      }),
      providesTags: () => ['Films'],
    }),
    fetchFilmsProperties: build.mutation<
      { asaiso: string[]; dilution: string[]; temp: string[] },
      Partial<ITimeParams>
    >({
      query: (body) => ({
        url: `backend/filmform2.php`,
        method: RequestMethod.POST,
        body,
      }),
    }),
    fetchTime: build.mutation<string, ITimeParams>({
      query: (body) => ({
        url: `backend/filmformset.php`,
        method: RequestMethod.POST,
        body,
      }),
    }),
    calculateTemp: build.mutation<null, string>({
      query: (body) => ({
        url: `backend/todigitaltruth.php`,
        method: RequestMethod.POST,
        body,
      }),
    }),
  }),
});

export const { useFetchFilmsQuery, useFetchFilmsPropertiesMutation, useFetchTimeMutation, useCalculateTempMutation } =
  filmApiService;
