import { createAction, createReducer } from '@reduxjs/toolkit';

type Controller = { pause: boolean; currentTime: number; showDetail: boolean };

const prefix = (name: string) => `controller/${name}`;

export const setPause = createAction<boolean>(prefix('setPause'));

export const setCurrentTime = createAction<number>(prefix('setCurrentTime'));

export const setShowDetail = createAction<boolean>(prefix('setShowDetail'));

export const controllerReducer = createReducer<Controller>(
  { pause: true, currentTime: 0, showDetail: false },
  builder => {
    builder.addCase(setPause, (state, action) => {
      const newState = { ...state };
      newState.pause = action.payload;
      return newState;
    });

    builder.addCase(setCurrentTime, (state, action) => {
      const newState = { ...state };
      newState.currentTime = action.payload;
      return newState;
    });

    builder.addCase(setShowDetail, (state, action) => {
      const newState = { ...state };
      newState.showDetail = action.payload;
      return newState;
    });
  }
);
