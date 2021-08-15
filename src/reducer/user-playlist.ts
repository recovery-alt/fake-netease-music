import { createReducer, createAction, createAsyncThunk } from '@reduxjs/toolkit';
import { getUserPlaylist, UserPlaylist } from '@/api';
import { to } from '@/utils';

export const setUserPlaylist = createAsyncThunk<{ playlist: UserPlaylist[] }, number>(
  'userPlaylist/set',
  async (uid, { rejectWithValue }) => {
    const [err, res] = await to(getUserPlaylist(uid));
    if (err || !res) return rejectWithValue(null);
    const { code, ...rest } = res;

    if (code === 200) {
      return rest;
    } else {
      return rejectWithValue(null);
    }
  }
);

export const setUserPlaylistFromCache = createAction<UserPlaylist>('userPlaylist/setCache');

export const userSubcountReducer = createReducer<{ playlist: UserPlaylist[] }>(
  { playlist: [] },
  builder => {
    builder.addCase(setUserPlaylist.fulfilled, (state, action) => {
      return { ...state, ...action.payload };
    });
    builder.addCase(setUserPlaylistFromCache, (state, action) => {
      return { ...state, ...action.payload };
    });
  }
);
