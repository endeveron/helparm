import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { ISearchSlice } from 'features/search/types';
import { RootState } from 'redux/store';

const initialState: ISearchSlice = {
  query: '',
  isClear: false,
};

const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {
    setQuery: (state, action: PayloadAction<string>) => {
      state.query = action.payload;
    },
    setClearSearch: (state, action: PayloadAction<boolean>) => {
      state.isClear = action.payload;
    },

    resetSearchState: (_) => initialState,
  },
});

const searchReducer = searchSlice.reducer;

export const { setQuery, setClearSearch, resetSearchState } =
  searchSlice.actions;

export const selectFilterQuery = (state: RootState) => state.search.query;
export const selectClearSearch = (state: RootState) => state.search.isClear;

export { searchReducer };
