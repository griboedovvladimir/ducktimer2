// eslint-disable-next-line import/no-extraneous-dependencies
import { createApi } from '@reduxjs/toolkit/query/react';

import { API_CONSTANTS } from '../CONSTANTS';
import { baseQuery } from '../store/base-query';
import { RequestMethod } from '../shared/enums';

interface ITimeParams {
  asaiso: string;
  dilution: string;
  temp: string;
  film: string;
  dev: string;
  type: string;
}

export const filmApiService = createApi({
  baseQuery,
  reducerPath: 'filmApiService',
  tagTypes: ['Films'],
  endpoints: (build) => ({
    fetchFilms: build.query<{ films: string[]; developers: string[] }, string>({
      query: () => ({
        url: API_CONSTANTS.FILM_FORM_FIRST_STEP,
        method: RequestMethod.GET,
      }),
      providesTags: () => ['Films'],
    }),
    fetchFilmsProperties: build.mutation<
      { asaiso: string[]; dilution: string[]; temp: string[] },
      Partial<ITimeParams>
    >({
      query: (body) => ({
        url: API_CONSTANTS.FILM_FORM_SECOND_STEP,
        method: RequestMethod.POST,
        body,
      }),
    }),
    fetchTime: build.mutation<string, ITimeParams>({
      query: (body) => ({
        url: API_CONSTANTS.GET_TIME_BY_PARAMS,
        method: RequestMethod.POST,
        body,
      }),
    }),
    calculateTemp: build.mutation<null, string>({
      query: (body) => ({
        url: API_CONSTANTS.CALCULATE_TEMPERATURE,
        method: RequestMethod.POST,
        body,
      }),
    }),
    getToken: build.mutation<string | undefined, any>({
      query: (body) => ({
        url: API_CONSTANTS.LOGIN,
        method: RequestMethod.POST,
        body,
      }),
    }),
    setToken: build.mutation<string | undefined, any>({
      query: (body) => ({
        url: API_CONSTANTS.LOGIN,
        method: RequestMethod.POST,
        body,
      }),
    }),
  }),
});

export const {
  useFetchFilmsQuery,
  useFetchFilmsPropertiesMutation,
  useFetchTimeMutation,
  useCalculateTempMutation,
  useGetTokenMutation,
  useSetTokenMutation,
} = filmApiService;
