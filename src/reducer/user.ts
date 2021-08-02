import { createReducer, createAction } from '@reduxjs/toolkit';
import { UserInfo } from '@/api';

export const setUserInfo = createAction<UserInfo>('userInfo/set');

export const userReducer = createReducer<UserInfo>(
  { cookie: '', profile: { nickname: '', avatarUrl: '' } },
  builder => {
    builder.addCase(setUserInfo, (state, action) => {
      return { ...state, ...action.payload };
    });
  }
);
