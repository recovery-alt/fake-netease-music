import { get, post } from './api';
import { Data, UserInfo, UserPlaylist } from '@/types';

export const loginCellphone = (params: Data) => post<UserInfo>('/login/cellphone', params);

export const getUserPlaylist = (uid: number) =>
  get<{ playlist: UserPlaylist[] }>('/user/playlist', { uid });
