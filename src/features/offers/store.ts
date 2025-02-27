import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { IOffer, IOfferSlice } from 'features/offers/types';
import { RootState } from 'redux/store';

const initialState: IOfferSlice = {
  list: [],
  searchQuery: '',
  clearSearch: false,
};

const offersSlice = createSlice({
  name: 'offers',
  initialState,
  reducers: {
    setOfferList: (state, action: PayloadAction<IOffer[]>) => {
      state.list = action.payload;
    },
    setOfferSearchQuery: (state, action: PayloadAction<string>) => {
      state.searchQuery = action.payload;
    },
    clearOfferSearch: (state, action: PayloadAction<boolean>) => {
      state.clearSearch = action.payload;
    },

    resetAnalyticsState: (_) => initialState,
  },
});

const offersReducer = offersSlice.reducer;

export const {
  setOfferList,
  setOfferSearchQuery,
  clearOfferSearch,
  resetAnalyticsState,
} = offersSlice.actions;

export const selectOfferList = (state: RootState): IOffer[] =>
  state.offers.list;
export const selectOfferSearchQuery = (state: RootState) =>
  state.offers.searchQuery;
export const selectClearOfferSearch = (state: RootState) =>
  state.offers.clearSearch;

export { offersReducer };
