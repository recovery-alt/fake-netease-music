import { configureStore } from '@reduxjs/toolkit';
import { userReducer, userPlaylistReducer, currentTrackReducer } from '@/reducer';

const store = configureStore({
  reducer: {
    user: userReducer,
    userPlaylist: userPlaylistReducer,
    currentTrack: currentTrackReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
