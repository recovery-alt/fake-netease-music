import { createReducer, createAction, createAsyncThunk } from '@reduxjs/toolkit';
import { loginCellphone } from '@/api';
import { UserInfo } from '@/types';
import avatar from '@/assets/img/avatar.svg';
import { to } from '@/utils';
import { message } from 'antd';

const prefix = (name: string) => `userInfo/${name}`;

export const setUserInfo = createAsyncThunk<UserInfo, { phone: string; password: string }>(
  prefix('set'),
  async ({ phone, password }, { rejectWithValue }) => {
    const [err, res] = await to(loginCellphone({ phone, password }));
    if (err || !res) return rejectWithValue(null);
    const { code, ...rest } = res;

    if (code === 200) {
      return rest;
    } else {
      return rejectWithValue(null);
    }
  }
);

export const setUserInfoFromCache = createAction<UserInfo>(prefix('setCache'));

export const userReducer = createReducer<UserInfo>(
  { cookie: '', profile: { avatarUrl: avatar, nickname: '未登录', userId: 0 } },
  builder => {
    builder.addCase(setUserInfo.fulfilled, (state, action) => {
      return { ...state, ...action.payload };
    });
    builder.addCase(setUserInfo.rejected, state => {
      message.error('登录失败，请稍后重试～');
      return state;
    });
    builder.addCase(setUserInfoFromCache, (state, action) => {
      return { ...state, ...action.payload };
    });
  }
);
