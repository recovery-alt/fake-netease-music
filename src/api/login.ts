import { get, post } from './api';
import { Data } from '@/types';

export type User = { nickname: string; avatarUrl: string; userId: number };
export type UserInfo = { cookie: string; profile: User };
export const loginCellphone = (params: Data) => post<UserInfo>('/login/cellphone', params);

export type UserPlaylist = {
  id: number;
  name: string;
  userId: number;
  createTime: number;
  subscribedCount: number;
  coverImgUrl: string;
  playCount: number;
  trackCount: number;
  description: string;
  tags: string[];
};
export const getUserPlaylist = (uid: number) =>
  get<{ playlist: UserPlaylist[] }>('/user/playlist', { uid });
