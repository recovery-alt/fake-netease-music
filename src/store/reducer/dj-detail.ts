import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { DJDetail } from '@/types';
import json from 'json5';

const currentTrackStr = localStorage.getItem('currentTrack');
const initialState: Partial<DJDetail> = currentTrackStr
  ? json.parse<DJDetail>(currentTrackStr)
  : {};

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
