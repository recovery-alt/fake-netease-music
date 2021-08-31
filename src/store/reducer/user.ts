import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { loginCellphone } from '@/api';
import { UserInfo } from '@/types';
import avatar from '@/assets/img/avatar.svg';
import { to } from '@/utils';
import { message } from 'antd';

const prefix = (name?: string) => ('userInfo' + name ? `/${name}` : '');

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

const { reducer, actions } = createSlice({
  name: prefix(),
  initialState: { cookie: '', profile: { avatarUrl: avatar, nickname: '未登录', userId: 0 } },
  reducers: {
    setUserInfoFromCache(state, action: PayloadAction<UserInfo>) {
      return { ...state, ...action.payload };
    },
  },
  extraReducers(builder) {
    builder.addCase(setUserInfo.fulfilled, (state, action) => {
      return { ...state, ...action.payload };
    });
    builder.addCase(setUserInfo.rejected, state => {
      message.error('登录失败，请稍后重试～');
      return state;
    });
  },
});

export const { setUserInfoFromCache } = actions;
export { reducer as userReducer };
