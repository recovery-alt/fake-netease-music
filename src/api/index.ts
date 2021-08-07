import { Data } from '@/types';
import { get, post } from './api';

export type User = { nickname: string; avatarUrl: string };

export type BannerType = { imageUrl: string };
export const getBanner = () => get<{ banners: BannerType[] }>('/banner');
export const getDJBanner = () => get<{ data: BannerType[] }>('/dj/banner');

export type PersonalizedList = Array<{ name: string; picUrl: string }>;
export const getPersonalized = (params: Data) => get<PersonalizedList>('/personalized', params);

export const getPPList = (params: Data) =>
  get<PersonalizedList>('/personalized/privatecontent/list', params);

export const getPersonalizedMV = () => get<PersonalizedList>('/personalized/mv');

export type AlbumNewest = {
  albums: Array<{ picUrl: string; name: string; artist: { name: string } }>;
};
export const getAlbumNewest = () => get<AlbumNewest>('/album/newest');

export type DJToplist = { toplist: Array<{ name: string; picUrl: string; rcmdtext: string }> };
export const getDJToplist = (params: Data) => get<DJToplist>('/dj/toplist', params);

export type UserInfo = { cookie: string; profile: User };
export const loginCellphone = (params: Data) => post<UserInfo>('/login/cellphone', params);

export type Song = any;
export const getSongUrl = (id: number | string) => get<Song>('/song/url', { id });

export type Lyric = { lrc: { lyric: string } };
export const getLyric = (id: number | string) => get<Lyric>('/lyric', { id });

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
export const getCommentMusic = (id: number | string, offset = 0) =>
  get<{ total: number; comments: Comment[]; hotComments: Comment[] }>('/comment/music', {
    id,
    offset,
  });

export type Playlist = { name: string; id: number };
export const getMusicCategory = () => get<{ tags: Playlist[] }>('/playlist/hot');

export type Subcategory = { category: number; name: string; hot: boolean };
export type PlaylistCatlist = {
  categories: Record<string, string>;
  sub: Array<Subcategory>;
};
export const getAllMusicCategory = () => get<PlaylistCatlist>('/playlist/catlist');

export type TopPlaylist = { coverImgUrl: string; id: number; name: string };
export const getTopPlaylist = (params: { offset?: number; limit?: number }) =>
  get<{ total: number; playlists: TopPlaylist[] }>('/top/playlist', params);
