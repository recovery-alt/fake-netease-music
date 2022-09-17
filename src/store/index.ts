import { configureStore } from '@reduxjs/toolkit';

import {
  controllerReducer,
  currentTrackReducer,
  djDetailReducer,
  userPlaylistReducer,
  userReducer,
} from './reducer';

const store = configureStore({
  reducer: {
    user: userReducer,
    userPlaylist: userPlaylistReducer,
    currentTrack: currentTrackReducer,
    controller: controllerReducer,
    djDetail: djDetailReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;

export * from './reducer';
