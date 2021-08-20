import { configureStore } from '@reduxjs/toolkit';
import { userReducer, userPlaylistReducer } from '@/reducer';

const store = configureStore({
  reducer: {
    user: userReducer,
    userPlaylist: userPlaylistReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
