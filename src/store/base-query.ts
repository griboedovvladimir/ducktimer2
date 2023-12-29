// eslint-disable-next-line import/no-extraneous-dependencies
import { BaseQueryFn } from '@reduxjs/toolkit/query';
// eslint-disable-next-line import/no-extraneous-dependencies
import axios, { AxiosRequestConfig, AxiosError } from 'axios';

type ReturnBaseQueryFn = BaseQueryFn<BaseQueryFnParams>;

type BaseQueryFnParams = {
  url: string;
  method: AxiosRequestConfig['method'];
  body?: AxiosRequestConfig['data'];
  params?: AxiosRequestConfig['params'];
};

export const baseQuery: ReturnBaseQueryFn = async ({ url, method, body, params }) => {
  try {
    const result = await axios({ url, method, data: body, params });

    return { data: result.data, meta: result.headers };
  } catch (axiosError) {
    const err = axiosError as AxiosError;

    return {
      error: {
        status: err.response?.status,
        data: err.response?.data || err.message,
      },
    };
  }
};
