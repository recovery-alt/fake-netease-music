import { Data } from '@/types';
import { get, post } from './api';

export type User = { nickname: string; avatarUrl: string };

export type BannerType = { imageUrl: string };
export const getBanner = () => get<{ banners: BannerType[] }>('/banner');
export const getDJBanner = () => get<{ data: { pic: string; url: string }[] }>('/dj/banner');

export type PersonalizedList = Array<{ name: string; picUrl: string }>;
export const getPersonalized = (params: Data) => get<PersonalizedList>('/personalized', params);

export const getPPList = (params: Data) =>
  get<PersonalizedList>('/personalized/privatecontent/list', params);

export const getPersonalizedMV = () => get<PersonalizedList>('/personalized/mv');

export type AlbumNewest = { picUrl: string; name: string; artist: { name: string } };
export const getAlbumNewest = () => get<{ albums: AlbumNewest[] }>('/album/newest');

export type DJToplist = { name: string; picUrl: string; rcmdtext: string };
export const getDJToplist = (limit = 6) => get<{ toplist: DJToplist[] }>('/dj/toplist', { limit });

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

export type DJCatelist = { id: number; name: string; pic56x56Url: string };
export const getDJCatelist = () => get<{ categories: DJCatelist[] }>('/dj/catelist');

export type DJPersonalizeRecommend = { rcmdText: string; name: string; picUrl: string };
export const getDJPersonalizeRecommend = (limit = 5) =>
  get<{ data: DJPersonalizeRecommend[] }>('/dj/personalize/recommend', { limit });

export type DJRadio = { name: string; picUrl: string; rcmdText: string; lastProgramName: string };
export const getDJPaygift = (limit = 4) =>
  get<{ data: { list: DJRadio[] } }>('/dj/paygift', { limit });

export type DJToplistPay = { name: string; creatorName: string; picUrl: string };
export const getDJToplistPay = (limit = 5) =>
  get<{ data: { list: DJToplistPay[] } }>('/dj/toplist/pay', { limit });

export const getDJRecommendType = (type: number) =>
  get<{ djRadios: DJRadio[] }>('/dj/recommend/type', { type });
