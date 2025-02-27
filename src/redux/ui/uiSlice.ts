import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { RootState } from 'redux/store';
import { ThemeMode, UiState } from 'redux/ui';

const initialState: UiState = {
  themeMode: 'dark',
};

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    setThemeMode: (state, action: PayloadAction<ThemeMode>) => {
      state.themeMode = action.payload;
    },

    clearUiState: () => initialState,
  },
});

const uiReducer = uiSlice.reducer;

export const { setThemeMode } = uiSlice.actions;
export const selectThemeMode = (state: RootState) => state.ui.themeMode;
export { uiReducer };
