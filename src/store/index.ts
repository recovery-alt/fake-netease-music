import { configureStore } from '@reduxjs/toolkit';
import {
  userReducer,
  userPlaylistReducer,
  currentTrackReducer,
  controllerReducer,
} from './reducer';

const store = configureStore({
  reducer: {
    user: userReducer,
    userPlaylist: userPlaylistReducer,
    currentTrack: currentTrackReducer,
    controller: controllerReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;

export * from './reducer';
