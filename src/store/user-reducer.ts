import { createReducer } from '@reduxjs/toolkit';
import { UserInfo } from '@/api';

export default createReducer<UserInfo>(
  { cookie: '', profile: { nickname: '', avatarUrl: '' } },
  builder => {
    console.log(builder);
  }
);
