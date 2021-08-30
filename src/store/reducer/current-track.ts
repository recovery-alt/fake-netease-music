import { createReducer, createAction, createAsyncThunk } from '@reduxjs/toolkit';
import { getSongUrl, getPersonalFM } from '@/api';
import { to } from '@/utils';
import { PlayMode } from '@/enum';
import { message } from 'antd';
import { Music, Track, Song } from '@/types';
import { RootState } from '..';

type CurrentTrack = { current: number; tracks: Track[]; song?: Song; fm: Music[] };

const prefix = (name: string) => `currentTrack/${name}`;

export const setCurrentTrack = createAction<CurrentTrack>(prefix('set'));

export const setSong = createAsyncThunk<Song, number>(
  prefix('setSong'),
  async (id, { rejectWithValue }) => {
    const [err, res] = await to(getSongUrl(id));
    if (err || !res) return rejectWithValue(null);
    const { code, data } = res;

    if (code === 200) {
      if (data.length === 0 || !data[0].url) {
        message.error('应合作方要求，该资源暂时下架>_<');
        return rejectWithValue(null);
      }
      return data[0];
    } else {
      return rejectWithValue(null);
    }
  }
);

export const changeSong = createAction<{ next: boolean; mode: PlayMode }>(prefix('changeSong'));

export const changeCurrent = createAction<number>(prefix('changeCurrent'));

export const setFM = createAsyncThunk(prefix('setFM'), async (id, { rejectWithValue }) => {
  const [err, res] = await to(getPersonalFM());
  if (err || !res) return rejectWithValue(null);
  const { code, data } = res;

  return code === 200 && data.length ? data : rejectWithValue(null);
});

export const nextFM = createAsyncThunk<CurrentTrack, void, { state: RootState }>(
  prefix('nextFM'),
  async (id, { getState, dispatch }) => {
    const state = getState();
    const { currentTrack } = state;
    const { fm, current } = currentTrack;
    const newCurrentTrack = { ...currentTrack };
    const len = fm.length;
    if (len === current + 1) await dispatch(setFM());
    newCurrentTrack.current++;
    newCurrentTrack.current %= len;

    return newCurrentTrack;
  }
);

export const currentTrackReducer = createReducer<CurrentTrack>(
  { current: -1, tracks: [], fm: [] },
  builder => {
    builder.addCase(setCurrentTrack, (state, action) => {
      const { current, tracks, fm } = action.payload;
      // 重置fm里面的歌
      fm.length = 0;
      return { ...state, current, tracks, fm };
    });

    builder.addCase(setSong.fulfilled, (state, action) => {
      return { ...state, song: action.payload };
    });

    builder.addCase(setSong.rejected, state => {
      return state;
    });

    builder.addCase(changeSong, (state, action) => {
      const getRandomPlayIndex = (len: number) => Math.floor((len - 1) * Math.random());
      const { mode, next } = action.payload;
      const { tracks, current } = state;
      const len = tracks.length;
      let index: number;
      if (mode === PlayMode.RANDOM) {
        index = getRandomPlayIndex(len);
      } else {
        index = next ? current + 1 : current - 1;
        if (index < 0) index += len;
        index %= len;
      }
      const newState = { ...state };
      newState.current = index;
      return newState;
    });

    builder.addCase(changeCurrent, (state, action) => {
      const newState = { ...state };
      newState.current = action.payload;
      return newState;
    });

    builder.addCase(setFM.fulfilled, (state, action) => {
      const newState = { ...state };
      newState.fm = action.payload;
      newState.current = 0;
      return newState;
    });

    builder.addCase(setFM.rejected, state => {
      return state;
    });

    builder.addCase(nextFM.fulfilled, state => {
      const newState = { ...state };
      newState.current++;

      return newState;
    });
  }
);
