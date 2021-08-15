import { get, post } from './api';
import { Data } from '@/types';

export type User = { nickname: string; avatarUrl: string; userId: number };
export type UserInfo = { cookie: string; profile: User };
export const loginCellphone = (params: Data) => post<UserInfo>('/login/cellphone', params);

export type UserPlaylist = { id: number; name: string; creator: { userId: number } };
export const getUserPlaylist = (uid: number) =>
  get<{ playlist: UserPlaylist[] }>('/user/playlist', { uid });
