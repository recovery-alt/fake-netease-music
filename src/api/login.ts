import { get, post } from './api';
import { Data } from '@/types';

export type User = { nickname: string; avatarUrl: string };
export type UserInfo = { cookie: string; profile: User };
export const loginCellphone = (params: Data) => post<UserInfo>('/login/cellphone', params);

export type UserSubcount = any;
export const getUserSubcount = () => get('/user/subcount');
