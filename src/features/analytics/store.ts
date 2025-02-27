import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { IAnalyticsSlice } from 'features/analytics/types';
import { RootState } from 'redux/store';

const initialState: IAnalyticsSlice = {
  visitorsNumber: 0,
};

const analyticsSlice = createSlice({
  name: 'analytics',
  initialState,
  reducers: {
    setVisitorsNumber: (state, action: PayloadAction<number>) => {
      state.visitorsNumber = action.payload;
    },

    resetAnalyticsState: (_) => initialState,
  },
});

const analyticsReducer = analyticsSlice.reducer;

export const { setVisitorsNumber, resetAnalyticsState } =
  analyticsSlice.actions;

export const selectVisitorsNumber = (state: RootState): number =>
  state.analytics.visitorsNumber;

export { analyticsReducer };
