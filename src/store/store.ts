// eslint-disable-next-line import/no-extraneous-dependencies
import { combineReducers, configureStore } from '@reduxjs/toolkit';

import { filmApiService } from '../services/filmApiService';

const rootReducer = combineReducers({
  [filmApiService.reducerPath]: filmApiService.reducer,
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }).concat(filmApiService.middleware),
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
