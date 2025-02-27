import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';

import { analyticsReducer } from 'features/analytics/store';
import { newsReducer } from 'features/news/store';
import { offersReducer } from 'features/offers/store';
import { searchReducer } from 'features/search/store';
import { uiReducer } from 'redux/ui';

const rootReducer = combineReducers({
  analytics: analyticsReducer,
  news: newsReducer,
  offers: offersReducer,
  search: searchReducer,
  ui: uiReducer,
});

const store = configureStore({
  reducer: rootReducer,
  devTools: process.env.NODE_ENV !== 'production',
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof rootReducer>;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export { store };
