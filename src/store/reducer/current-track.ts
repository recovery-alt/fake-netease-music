import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { message } from 'antd';
import json from 'json5';

import { getAlbum, getPersonalFM, getPlaylistDetail, getSongDetail, getSongUrl } from '@/api';
import { PlayMode } from '@/enum';
import { Music, Song, Track } from '@/types';
import { to } from '@/utils';

import { RootState } from '..';

type CurrentTrack = {
  current: number;
  tracks: Track[];
  song?: Song;
  fm: Music[];
  autoPlay?: boolean;
  cacheCurrent?: number;
};
const prefix = (name: string) => `currentTrack/${name}`;
const currentTrackStr = localStorage.getItem('currentTrack');
const initialState: CurrentTrack = currentTrackStr
  ? json.parse<CurrentTrack>(currentTrackStr)
  : { current: -1, tracks: [], fm: [], autoPlay: true };

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

export const setFM = createAsyncThunk<{ init: boolean; data: Music[] }, boolean>(
  prefix('setFM'),
  async (init, { rejectWithValue }) => {
    const [err, res] = await to(getPersonalFM());
    if (err || !res) return rejectWithValue(null);
    const { code, data } = res;

    return code === 200 && data.length ? { init, data } : rejectWithValue(null);
  }
);

export const nextFM = createAsyncThunk<CurrentTrack, void, { state: RootState }>(
  prefix('nextFM'),
  async (_, { getState, dispatch, rejectWithValue }) => {
    const state = getState();
    const { currentTrack } = state;
    const { fm, current } = currentTrack;
    const newCurrentTrack = { ...currentTrack };
    const len = fm.length;
    if (len === current + 1) {
      const [err] = await to(dispatch(setFM(false)));
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

type ActionParams = number | { id: number; isAlbum?: boolean };

export const fetchAndSetCurrentTrack = createAsyncThunk<void, ActionParams>(
  prefix('fetchAndSetCurrentTrack'),
  async (params, { rejectWithValue, dispatch }) => {
    let id: number;
    let isAlbum;
    if (typeof params === 'number') {
      id = params;
    } else {
      id = params.id;
      isAlbum = params.isAlbum;
    }

    let tracks: Track[];

    if (isAlbum) {
      const [err, res] = await to(getAlbum(id));
      if (err || !res) return rejectWithValue(null);
      tracks = res.songs;
    } else {
      const [err, res] = await to(getPlaylistDetail(id));
      if (err || !res) return rejectWithValue(null);
      tracks = res.playlist.tracks;
    }

    dispatch(setCurrentTrack({ current: 0, tracks, fm: [] }));
  }
);

const { reducer, actions } = createSlice({
  name: 'currentTrack',
  initialState,
  reducers: {
    setAutoPlay(state, action: PayloadAction<boolean>) {
      const newState = { ...state };
      newState.autoPlay = action.payload;
      return newState;
    },
    setCurrentTrack(state, action: PayloadAction<CurrentTrack>) {
      /* eslint-disable-next-line @typescript-eslint/no-unused-vars */
      const { cacheCurrent, ...restState } = state;
      const { current, tracks, fm } = action.payload;
      // 重置fm里面的歌
      fm.length = 0;
      return { ...restState, current, tracks, fm, autoPlay: true };
    },
    changeSong(state, action: PayloadAction<{ next: boolean; mode: PlayMode }>) {
      const { tracks, current } = state;
      const getRandomPlayIndex = (len: number) => Math.floor((len - 1) * Math.random());
      // 用来跳出死循环
      const matchedIndex: number[] = [];

      const getIndex = (current: number) => {
        const { mode, next } = action.payload;
        const len = tracks.length;
        let index: number;
        if (mode === PlayMode.RANDOM) {
          index = getRandomPlayIndex(len);
        } else {
          index = next ? current + 1 : current - 1;
          if (index < 0) index += len;
          index %= len;
        }

        if (!matchedIndex.includes(index)) matchedIndex.push(index);

        // 递归找寻可用歌曲
        if (tracks[index].disable && matchedIndex.length < tracks.length) index = getIndex(index);

        return index;
      };

      const index = getIndex(current);

      const newState = { ...state };
      newState.current = index;
      newState.autoPlay = true;
      return newState;
    },
    changeCurrent(state, action: PayloadAction<number>) {
      const newState = { ...state };
      newState.current = action.payload;
      newState.autoPlay = true;
      return newState;
    },
  },
  extraReducers(builder) {
    const defaultHandler = (state: CurrentTrack) => state;

    builder.addCase(setSong.fulfilled, (state, action) => {
      return { ...state, song: action.payload };
    });

    builder.addCase(setSong.rejected, (state: CurrentTrack) => {
      const newState = { ...state };
      return newState;
    });

    builder.addCase(setFM.fulfilled, (state, action) => {
      const newState = { ...state };
      const { init, data } = action.payload;
      newState.fm = data;
      // 是初始化fm，就需要缓存当前播放的索引
      if (init) newState.cacheCurrent = newState.current;
      newState.current = 0;
      newState.autoPlay = true;
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
      newState.autoPlay = true;
      return newState;
    });

    builder.addCase(insertSong.rejected, defaultHandler);

    builder.addCase(fetchAndSetCurrentTrack.fulfilled, state => {
      const newState = { ...state };
      newState.autoPlay = true;
      return newState;
    });
    builder.addCase(fetchAndSetCurrentTrack.rejected, defaultHandler);
  },
});

export const { setCurrentTrack, changeSong, changeCurrent } = actions;

export { reducer as currentTrackReducer };
