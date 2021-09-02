import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { getSongUrl, getPersonalFM, getSongDetail, getPlaylistDetail } from '@/api';
import { to } from '@/utils';
import { PlayMode } from '@/enum';
import { message } from 'antd';
import { Music, Track, Song } from '@/types';
import { RootState } from '..';

type CurrentTrack = { current: number; tracks: Track[]; song?: Song; fm: Music[] };

const prefix = (name: string) => `currentTrack/${name}`;
const initialState: CurrentTrack = { current: -1, tracks: [], fm: [] };

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

export const setFM = createAsyncThunk(prefix('setFM'), async (id, { rejectWithValue }) => {
  const [err, res] = await to(getPersonalFM());
  if (err || !res) return rejectWithValue(null);
  const { code, data } = res;

  return code === 200 && data.length ? data : rejectWithValue(null);
});

export const nextFM = createAsyncThunk<CurrentTrack, void, { state: RootState }>(
  prefix('nextFM'),
  async (id, { getState, dispatch, rejectWithValue }) => {
    const state = getState();
    const { currentTrack } = state;
    const { fm, current } = currentTrack;
    const newCurrentTrack = { ...currentTrack };
    const len = fm.length;
    if (len === current + 1) {
      const [err] = await to(dispatch(setFM()));
      if (err) return rejectWithValue(null);
    }
    newCurrentTrack.current++;
    newCurrentTrack.current %= len;

    return newCurrentTrack;
  }
);

export const insertSong = createAsyncThunk<{ songs: Track[] }, number>(
  prefix('insertSong'),
  async (id, { rejectWithValue, dispatch }) => {
    const [err, res] = await to(Promise.all([getSongDetail(id), dispatch(setSong(id))]));
    if (err || !res?.[0]) return rejectWithValue(null);
    return res[0];
  }
);

export const fetchAndSetCurrentTrack = createAsyncThunk<undefined, number>(
  prefix('fetchAndSetCurrentTrack'),
  async (id, { rejectWithValue, dispatch }) => {
    const [err, res] = await to(getPlaylistDetail(id));
    if (err || !res) return rejectWithValue(null);
    dispatch(setCurrentTrack({ current: 0, tracks: res.playlist.tracks, fm: [] }));
  }
);

const { reducer, actions } = createSlice({
  name: 'currentTrack',
  initialState,
  reducers: {
    setCurrentTrack(state, action: PayloadAction<CurrentTrack>) {
      const { current, tracks, fm } = action.payload;
      // 重置fm里面的歌
      fm.length = 0;
      return { ...state, current, tracks, fm };
    },
    changeSong(state, action: PayloadAction<{ next: boolean; mode: PlayMode }>) {
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
    },
    changeCurrent(state, action: PayloadAction<number>) {
      const newState = { ...state };
      newState.current = action.payload;
      return newState;
    },
  },
  extraReducers(builder) {
    const defaultHandler = (state: CurrentTrack) => state;

    builder.addCase(setSong.fulfilled, (state, action) => {
      return { ...state, song: action.payload };
    });

    builder.addCase(setSong.rejected, defaultHandler);

    builder.addCase(setFM.fulfilled, (state, action) => {
      const newState = { ...state };
      newState.fm = action.payload;
      newState.current = 0;
      return newState;
    });

    builder.addCase(setFM.rejected, defaultHandler);

    builder.addCase(nextFM.fulfilled, state => {
      const newState = { ...state };
      newState.current++;

      return newState;
    });

    builder.addCase(nextFM.rejected, defaultHandler);

    builder.addCase(insertSong.fulfilled, (state, action) => {
      const newState = { ...state };
      newState.fm = [];
      newState.tracks = [...newState.tracks];
      let needSetCurrent = false;
      action.payload.songs.forEach(song => {
        if (!newState.tracks.find(track => song.id === track.id)) {
          newState.tracks.push(song);
          needSetCurrent = true;
        }
      });

      if (needSetCurrent) newState.current = newState.tracks.length - 1;
      return newState;
    });

    builder.addCase(insertSong.rejected, defaultHandler);

    builder.addCase(fetchAndSetCurrentTrack.fulfilled, defaultHandler);
    builder.addCase(fetchAndSetCurrentTrack.rejected, defaultHandler);
  },
});

export const { setCurrentTrack, changeSong, changeCurrent } = actions;

export { reducer as currentTrackReducer };
