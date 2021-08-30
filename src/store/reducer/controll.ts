import { createAction, createReducer } from '@reduxjs/toolkit';

type Controller = { pause: boolean; currentTime: number };

const prefix = (name: string) => `controller/${name}`;

export const setPause = createAction<boolean>(prefix('setPause'));

export const setCurrentTime = createAction<number>(prefix('setCurrentTime'));

export const controllerReducer = createReducer<Controller>(
  { pause: true, currentTime: 0 },
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
  }
);
