import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type Controller = { pause: boolean; currentTime: number; showDetail: boolean };

const initialState: Controller = { pause: true, currentTime: 0, showDetail: false };

const { reducer: controllerReducer, actions } = createSlice({
  name: 'controller',
  initialState,
  reducers: {
    setPause(state, action: PayloadAction<boolean>) {
      const newState = { ...state };
      newState.pause = action.payload;
      return newState;
    },
    setCurrentTime(state, action: PayloadAction<number>) {
      const newState = { ...state };
      newState.currentTime = action.payload;
      return newState;
    },
    setShowDetail(state, action: PayloadAction<boolean>) {
      const newState = { ...state };
      newState.showDetail = action.payload;
      return newState;
    },
  },
});

export const { setPause, setCurrentTime, setShowDetail } = actions;
export { controllerReducer };
