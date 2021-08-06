import { Data } from '@/types';
import { get, post } from './api';

export type Banners = { banners: Array<{ imageUrl: string }> };
export const getBanner = () => get<Banners>('/banner');

export type PersonalizedList = Array<{ name: string; picUrl: string }>;
export const getPersonalized = (params: Data) => get<PersonalizedList>('/personalized', params);

export const getPersonalizedPrivatecontent = (params: Data) =>
  get<PersonalizedList>('/personalized/privatecontent/list', params);

export const getPersonalizedMV = () => get<PersonalizedList>('/personalized/mv');

export type AlbumNewest = {
  albums: Array<{ picUrl: string; name: string; artist: { name: string } }>;
};
export const getAlbumNewest = () => get<AlbumNewest>('/album/newest');

export type DJToplist = { toplist: Array<{ name: string; picUrl: string; rcmdtext: string }> };
export const getDJToplist = (params: Data) => get<DJToplist>('/dj/toplist', params);

export type UserInfo = { cookie: string; profile: { nickname: string; avatarUrl: string } };
export const postLogin = (params: Data) => post<UserInfo>('/login/cellphone', params);

export const song = (id: string) => get<any>('/song/url', { id });
