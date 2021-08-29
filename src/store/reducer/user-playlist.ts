import { createReducer, createAction, createAsyncThunk } from '@reduxjs/toolkit';
import { getUserPlaylist } from '@/api';
import { UserPlaylist } from '@/types';
import { to } from '@/utils';
import { message } from 'antd';

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

export const userPlaylistReducer = createReducer<{ playlist: UserPlaylist[] }>(
  { playlist: [] },
  builder => {
    builder.addCase(setUserPlaylist.fulfilled, (state, action) => {
      return { ...state, ...action.payload };
    });

    builder.addCase(setUserPlaylist.rejected, state => {
      message.error('获取歌单列表失败，请稍后重试～');
      return state;
    });
  }
);
