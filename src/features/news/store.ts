import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { INews, INewsSlice } from 'features/news/types';
import { RootState } from 'redux/store';

const initialState: INewsSlice = {
  list: [],
  timestamp: 0,
};

const newsSlice = createSlice({
  name: 'news',
  initialState,
  reducers: {
    setNewsList: (state, action: PayloadAction<INews[]>) => {
      state.list = action.payload;
    },
    setTimestamp: (state, action: PayloadAction<number>) => {
      state.timestamp = action.payload;
    },

    resetAnalyticsState: (_) => initialState,
  },
});

const newsReducer = newsSlice.reducer;

export const { setNewsList, setTimestamp, resetAnalyticsState } =
  newsSlice.actions;

export const selectNewsList = (state: RootState): INews[] => state.news.list;
export const selectTimestamp = (state: RootState): number =>
  state.news.timestamp;

export { newsReducer };
