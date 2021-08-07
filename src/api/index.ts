import { Data } from '@/types';
import { get, post } from './api';

export type User = { nickname: string; avatarUrl: string };

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

export type UserInfo = { cookie: string; profile: User };
export const postLogin = (params: Data) => post<UserInfo>('/login/cellphone', params);

export type Song = any;
export const getSongById = (id: number | string) => get<Song>('/song/url', { id });

export type Lyric = { lrc: { lyric: string } };
export const getLyricById = (id: number | string) => get<Lyric>('/lyric', { id });

export type Music = {
  id: string;
  name: string;
  album: { id: number; name: string; picUrl: string };
  artists: Array<{ name: string }>;
};
export const getPersonalFM = () => get<{ data: Array<Music> }>('/personal_fm');

type BeReplied = { beRepliedCommentId: number; content: string; user: User };

export type Comment = {
  content: string;
  commentId: number;
  likedCount: number;
  liked: boolean;
  time: number;
  beReplied: BeReplied[];
  user: User;
};
export const getCommentMusicById = (id: number | string, offset = 0) =>
  get<{ total: number; comments: Comment[]; hotComments: Comment[] }>('/comment/music', {
    id,
    offset,
  });
