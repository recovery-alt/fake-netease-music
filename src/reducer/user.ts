import { createReducer, createAction, createAsyncThunk } from '@reduxjs/toolkit';
import { UserInfo } from '@/api';
import avatarUrl from '@/assets/img/avatar.svg';
import { postLogin } from '@/api';
import { to } from '@/utils';

export const setUserInfo = createAsyncThunk<UserInfo, { email: string; password: string }>(
  'userInfo/set',
  async ({ email, password }, { rejectWithValue }) => {
    const [err, res] = await to(postLogin({ email, password }));
    const { code, ...rest } = res;
    return !err && code === 200 ? rest : rejectWithValue(null);
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
