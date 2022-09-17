import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import json from 'json5';

import { PlayMode } from '@/enum';

type Controller = {
  pause: boolean;
  currentTime: number;
  playMode: PlayMode;
  showDetail: boolean;
  keywords: string;
};

const controllerStr = localStorage.getItem('controller');
const initialState: Controller = controllerStr
  ? json.parse<Controller>(controllerStr)
  : { playMode: PlayMode.IN_TURN, pause: true, currentTime: 0, showDetail: false, keywords: '' };

const { reducer: controllerReducer, actions } = createSlice({
  name: 'controller',
  initialState,
  reducers: {
    setPlayMode(state, action: PayloadAction<PlayMode>) {
      const newState = { ...state };
      newState.playMode = action.payload;
      return newState;
    },
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
    setKeywords(state, action: PayloadAction<string>) {
      const newState = { ...state };
      newState.keywords = action.payload;
      return newState;
    },
    setController(state, action: PayloadAction<Controller>) {
      const newState = { ...state, ...action.payload };
      return newState;
    },
  },
});

export const { setPlayMode, setPause, setCurrentTime, setShowDetail, setKeywords, setController } =
  actions;
export { controllerReducer };
