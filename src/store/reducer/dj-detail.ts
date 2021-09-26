import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { DJDetail } from '@/types';

const initialState: Partial<DJDetail> = {};

const { reducer: djDetailReducer, actions } = createSlice({
  name: 'djDetail',
  initialState,
  reducers: {
    setDJDetail(state, action: PayloadAction<DJDetail>) {
      return action.payload;
    },
  },
});

export const { setDJDetail } = actions;

export { djDetailReducer };
