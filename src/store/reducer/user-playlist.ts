import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { message } from 'antd';

import { getUserPlaylist } from '@/api';
import { UserPlaylist } from '@/types';
import { to } from '@/utils';

const prefix = (name?: string) => ('userPlaylist' + name ? `/${name}` : '');
const initialState: { playlist: UserPlaylist[] } = { playlist: [] };

export const setUserPlaylist = createAsyncThunk<{ playlist: UserPlaylist[] }, number>(
  prefix('set'),
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

const { reducer } = createSlice({
  name: prefix(),
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(setUserPlaylist.fulfilled, (state, action) => {
      return { ...state, ...action.payload };
    });

    builder.addCase(setUserPlaylist.rejected, state => {
      message.error('获取歌单列表失败，请稍后重试～');
      return state;
    });
  },
});

export { reducer as userPlaylistReducer };
