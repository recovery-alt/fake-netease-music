import { Data } from '@/types';
import { get } from './api';
import { User } from './login';
import { AlbumType, AlbumArea } from '@/types';

export * from './login';

export type BannerType = { imageUrl: string };
export const getBanner = () => get<{ banners: BannerType[] }>('/banner');
export const getDJBanner = () => get<{ data: { pic: string; url: string }[] }>('/dj/banner');

export type Personalized = { id: number; name: string; picUrl: string };
export const getPersonalized = (params: Data) => get<Personalized[]>('/personalized', params);

export const getPPList = (params: Data) =>
  get<Personalized[]>('/personalized/privatecontent/list', params);

export const getPersonalizedMV = () => get<Personalized[]>('/personalized/mv');

export const getAlbumNewest = () => get<{ albums: Album[] }>('/album/newest');

export type DJToplist = { id: number; name: string; picUrl: string; rcmdtext: string };
export const getDJToplist = (limit = 6) => get<{ toplist: DJToplist[] }>('/dj/toplist', { limit });

export type Song = {
  id: number;
  name: string;
  duration: number;
  album: Album;
  url: string;
};
export const getSongUrl = (id: number) => get<{ data: Song[] }>('/song/url', { id });

export type Lyric = { lrc: { lyric: string } };
export const getLyric = (id: number | string) => get<Lyric>('/lyric', { id });

export type Music = {
  id: number;
  name: string;
  duration: number;
  album: Album;
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

export type Playlist = { name: string; id: number; playCount: number; coverImgUrl: string };
export const getMusicCategory = () => get<{ tags: Playlist[] }>('/playlist/hot');

export type Subcategory = { category: number; name: string; hot: boolean };
export type PlaylistCatlist = {
  id: number;
  categories: Record<string, string>;
  sub: Array<Subcategory>;
};
export const getAllMusicCategory = () => get<PlaylistCatlist>('/playlist/catlist');

export type TopPlaylist = { coverImgUrl: string; id: number; name: string };
export const getTopPlaylist = (params: { offset?: number; limit?: number }) =>
  get<{ total: number; playlists: TopPlaylist[] }>('/top/playlist', params);

export type DJCatelist = { id: number; name: string; pic56x56Url: string };
export const getDJCatelist = () => get<{ categories: DJCatelist[] }>('/dj/catelist');

export type DJPersonalizeRecommend = { id: number; rcmdText: string; name: string; picUrl: string };
export const getDJPersonalizeRecommend = (limit = 5) =>
  get<{ data: DJPersonalizeRecommend[] }>('/dj/personalize/recommend', { limit });

export type DJRadio = {
  id: number;
  name: string;
  picUrl: string;
  rcmdText: string;
  lastProgramName: string;
  programCount: number;
  dj: { nickname: string };
};
export const getDJPaygift = (limit = 4) =>
  get<{ data: { list: DJRadio[] } }>('/dj/paygift', { limit });

export type DJToplistPay = { name: string; creatorName: string; picUrl: string };
export const getDJToplistPay = (limit = 5) =>
  get<{ data: { list: DJToplistPay[] } }>('/dj/toplist/pay', { limit });

export const getDJRecommendType = (type: number) =>
  get<{ djRadios: DJRadio[] }>('/dj/recommend/type', { type });

export type Toplist = { name: string; coverImgUrl: string; id: number };
export const getToplist = () => get<{ list: Toplist[] }>('/toplist');

export const getToplistDetail = () => get('/toplist/detail');

export type Track = {
  name: string;
  id: number;
  dt: number;
  al: Album;
  ar: { id: number; name: string }[];
};
export type PlaylistDetail = { id: number; name: string; coverImgUrl: string; tracks: Track[] };
export const getPlaylistDetail = (id: number) =>
  get<{ playlist: PlaylistDetail }>('/playlist/detail', { id });

export type Artist = {
  picUrl: string;
  name: string;
  id: number;
  albumSize: number;
  mvSize: number;
};
export const getArtistList = (params?: {
  type?: number;
  area?: number;
  initial?: string;
  limit?: number;
  offset?: number;
}) => get<{ artists: Artist[] }>('/artist/list', params);

export const getTopSong = (type: number) => get<{ data: Song[] }>('/top/song', { type });

export type Album = {
  id: number;
  picUrl: string;
  name: string;
  artist: { name: string };
  size: number;
  artists: Artist[];
};
export type TopAlbumParams = { area?: AlbumArea; limit?: number; type?: AlbumType };
export const getTopAlbum = (params: TopAlbumParams) =>
  get<{ monthData: Album[] }>('/top/album', params);

export type VideoCategogy = { id: number; name: string };
export const getVideoCategoryList = () => get<{ data: VideoCategogy[] }>('/video/category/list');

export type VideoType = {
  data: {
    coverUrl: string;
    durationms: number;
    playTime: number;
    previewUrl: string;
    title: string;
    vid: string;
    creator: {
      nickname: string;
    };
  };
};
export const getVideoGroup = (id: number, offset = 0) =>
  get<{ datas: VideoType[] }>('/video/group', { id, offset });

export type MVType = {
  id: number;
  artistName: string;
  cover: string;
  name: string;
  playCount: number;
};
export const getMVFirst = (area: string, limit = 6) =>
  get<{ data: MVType[] }>('/mv/first', { area, limit });

export const getMVAll = (limit = 6) => get<{ data: MVType[] }>('/mv/all', { limit });
export const getMVExclusiveRcmd = (limit = 6) =>
  get<{ data: MVType[] }>('/mv/exclusive/rcmd', { limit });

export const getTopMV = (limit = 10) => get<{ data: MVType[] }>('/top/mv', { limit });

export const getDJSublist = () => get<{ count: number; djRadios: DJRadio[] }>('/dj/sublist');

export const getAlbumSublist = () => get<{ data: Album[] }>('/album/sublist');

export const getArtistSublist = () => get<{ data: Artist[] }>('/artist/sublist');

export type MVSublist = {
  id: number;
  creator: { userId: number; useName: string }[];
  coverUrl: string;
  title: string;
  playTime: number;
};
export const getMVSublist = () => get<{ data: MVSublist[] }>('/mv/sublist');

export const getSimiPlaylist = (id: number) =>
  get<{ playlists: Playlist[] }>('/simi/playlist', { id });

export const getSimiSong = (id: number) => get<{ songs: Music[] }>('/simi/song', { id });
