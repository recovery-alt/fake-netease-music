import { createReducer, createAction, createAsyncThunk } from '@reduxjs/toolkit';
import { UserInfo } from '@/api';
import avatarUrl from '@/assets/img/avatar.svg';
import { postLogin } from '@/api';
import { to } from '@/utils';

export const setUserInfo = createAsyncThunk<UserInfo, { phone: string; password: string }>(
  'userInfo/set',
  async ({ phone, password }, { rejectWithValue }) => {
    const [err, res] = await to(postLogin({ phone, password }));
    if (err || !res) return rejectWithValue(null);
    const { code, ...rest } = res;

    if (code === 200) {
      debugger;
      return rest;
    } else {
      return rejectWithValue(null);
    }
  }
);

export const userReducer = createReducer<UserInfo>(
  { cookie: '', profile: { avatarUrl, nickname: '未登录' } },
  builder => {
    builder.addCase(setUserInfo.fulfilled, (state, action) => {
      return { ...state, ...action.payload };
    });
  }
);
