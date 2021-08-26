import { createReducer, createAction, createAsyncThunk } from '@reduxjs/toolkit';
import { Track, Song, getSongUrl } from '@/api';
import { to } from '@/utils';
import { PlayMode } from '@/enum';
import { message } from 'antd';

type CurrentTrack = { current: number; tracks: Track[]; song?: Song };

export const setCurrentTrack = createAction<CurrentTrack>('currentTrack/set');
export const setSong = createAsyncThunk<Song, number>(
  'currentTrack/setSong',
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
export const changeSong =
  createAction<{ next: boolean; mode: PlayMode }>('currentTrack/changeSong');

export const currentTrackReducer = createReducer<CurrentTrack>(
  { current: -1, tracks: [] },
  builder => {
    builder.addCase(setCurrentTrack, (state, action) => {
      const { current, tracks } = action.payload;
      return { ...state, current, tracks };
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
  }
);
