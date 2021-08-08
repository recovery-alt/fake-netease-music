import { createReducer, createAction, createAsyncThunk } from '@reduxjs/toolkit';
import { getUserSubcount, UserSubcount } from '@/api';
import { to } from '@/utils';

export const setUserSubcount = createAsyncThunk(
  'userSubcount/set',
  async (value, { rejectWithValue }) => {
    const [err, res] = await to(getUserSubcount());
    if (err || !res) return rejectWithValue(null);
    const { code, ...rest } = res;

    if (code === 200) {
      return rest;
    } else {
      return rejectWithValue(null);
    }
  }
);

export const setUserSubcountFromCache = createAction<UserSubcount>('userSubcount/setCache');

export const userSubcountReducer = createReducer<UserSubcount>(null, builder => {
  builder.addCase(setUserSubcount.fulfilled, (state, action) => {
    return { ...state, ...action.payload };
  });
  builder.addCase(setUserSubcountFromCache, (state, action) => {
    return { ...state, ...action.payload };
  });
});
