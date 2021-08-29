import { createAction, createReducer } from '@reduxjs/toolkit';

type Controller = { pause: boolean };

export const setPause = createAction<boolean>('controller/setPause');

export const controllerReducer = createReducer<Controller>({ pause: true }, builder => {
  builder.addCase(setPause, (state, action) => {
    const newState = { ...state };
    newState.pause = action.payload;
    return newState;
  });
});
