import { AlbumType, AlbumArea } from '@/types';

export type User = { nickname: string; avatarUrl: string; userId: number };
export type UserInfo = { cookie: string; profile: User };

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

export type BannerType = { imageUrl: string; targetId: number };

export type Personalized = { id: number; name: string; picUrl: string };

export type DJToplist = { id: number; name: string; picUrl: string; rcmdtext: string };

export type Song = {
  id: number;
  name: string;
  duration: number;
  album: Album;
  url: string;
  artists: Array<{ id: number; name: string }>;
};

export type Lyric = { nolyric: boolean; lrc: { lyric: string } };

export type Music = {
  id: number;
  name: string;
  duration: number;
  album: Album;
  artists: Array<{ id: number; name: string }>;
};

type BeReplied = { beRepliedCommentId: number; content: string; user: User };

export type Comment = {
  content: string;
  commentId: number;
  commentCount: number;
  likedCount: number;
  liked: boolean;
  time: number;
  beReplied: BeReplied[];
  user: User;
};

export type Playlist = {
  name: string;
  id: number;
  playCount: number;
  coverImgUrl: string;
  copywriter: string;
};

export type Subcategory = { category: number; name: string; hot: boolean };
export type PlaylistCatlist = {
  id: number;
  categories: Record<string, string>;
  sub: Array<Subcategory>;
};

export type TopPlaylist = { coverImgUrl: string; id: number; name: string };

export type DJCatelist = { id: number; name: string; pic56x56Url: string };

export type DJPersonalizeRecommend = { id: number; rcmdText: string; name: string; picUrl: string };

export type DJRadio = {
  id: number;
  name: string;
  picUrl: string;
  rcmdText: string;
  lastProgramName: string;
  programCount: number;
  dj: { nickname: string };
};

export type DJToplistPay = { name: string; creatorName: string; picUrl: string };

export type Toplist = { name: string; coverImgUrl: string; id: number };

export type Track = {
  name: string;
  id: number;
  dt: number;
  al: Album;
  ar: { id: number; name: string }[];
};
export type PlaylistDetail = {
  id: number;
  name: string;
  coverImgUrl: string;
  commentCount: number;
  tracks: Track[];
};

export type Artist = {
  picUrl: string;
  name: string;
  id: number;
  albumSize: number;
  mvSize: number;
};

export type Album = {
  id: number;
  picUrl: string;
  name: string;
  artist: { name: string };
  size: number;
  artists: Artist[];
};

export type TopAlbum = { monthData: Album[]; weekData?: Album[] };

export type TopAlbumParams = { area?: AlbumArea; limit?: number; type?: AlbumType };

export type VideoCategogy = { id: number; name: string };

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

export type MVType = {
  id: number;
  artistName: string;
  cover: string;
  name: string;
  playCount: number;
};

export type MVSublist = {
  id: number;
  creator: { userId: number; useName: string }[];
  coverUrl: string;
  title: string;
  playTime: number;
};

export type ArtistListParams = {
  type?: number | string;
  area?: number | string;
  initial?: number | string;
  limit?: number;
  offset?: number;
};

export type TopPlaylistParams = { offset?: number; limit?: number; cat?: string };

export type CommentData = { total: number; comments: Comment[]; hotComments: Comment[] };

export type SearchHot = { searchWord: string; content: string; score: number; iconUrl: string };

export type Subscriber = {
  avatarUrl: string;
  nickname: string;
  userId: number;
  signature: string;
  gender: number;
};
