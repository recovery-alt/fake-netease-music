import { SearchType } from '@/enum';

import { Data } from '.';

export type UserProfile = {
  nickname: string;
  avatarUrl: string;
  userId: number;
  description: string;
  follows?: number;
  followeds?: number;
  gender?: number;
  eventCount?: number;
  signature?: string;
  artistId?: number;
};

export type Identify = {
  imageDesc: string;
  imageUrl: string;
};

export type UserInfo = { cookie: string; profile: UserProfile };

export type UserDetail = { level: number; profile: UserProfile; identify?: Identify };

export type UserPlaylist = {
  id: number;
  name: string;
  userId: number;
  createTime: number;
  subscribedCount: number;
  coverImgUrl: string;
  playCount: number;
  shareCount: number;
  trackCount: number;
  description: string;
  commentCount: number;
  copywriter: string;
  creator: UserProfile;
  tags: string[];
  tracks: Track[];
};

export type Privilege = { cp: number };

export type PlaylistDetail = {
  playlist: UserPlaylist;
  privileges: Privilege[];
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
  flag: number;
  alias?: string[];
  transNames?: string[];
  artists: Array<{ id: number; name: string }>;
};

export interface SongWithLyric extends Song {
  lyrics: { txt: string };
}

export type Lyric = { nolyric: boolean; lrc: { lyric: string } };

export type Music = {
  id: number;
  name: string;
  duration: number;
  album: Album;
  artists: Array<{ id: number; name: string }>;
};

type BeReplied = { beRepliedCommentId: number; content: string; user: UserProfile };

export type Comment = {
  content: string;
  commentId: number;
  commentCount: number;
  likedCount: number;
  liked: boolean;
  time: number;
  beReplied: BeReplied[];
  user: UserProfile;
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
  desc: string;
  radioFeeType: number;
  subCount: number;
  originalPrice: number;
  dj: { nickname: string };
};

export type DJFeeInfo = {
  buyed: boolean;
  discountPrice: number;
  finished: boolean;
  originalPrice: number;
  price: number;
  purchaseCount: number;
  slogan: string;
  undershelf: boolean;
};

export type DJDetail = {
  category: string;
  categoryId: number;
  commentCount: number;
  commentDatas: [];
  createTime: number;
  desc: string;
  disableShare: boolean;
  dj: UserProfile;
  feeScope: number;
  id: number;
  lastProgramCreateTime: number;
  lastProgramId: number;
  likedCount: number;
  name: string;
  original: boolean;
  picId: number;
  picUrl: string;
  playCount: number;
  privacy: boolean;
  programCount: number;
  radioFeeType: number;
  rcmdText: string;
  secondCategory: string;
  secondCategoryId: number;
  shareCount: number;
  subCount: number;
  subed: boolean;
  feeInfo?: DJFeeInfo;
};

export type DJProgram = {
  auditDisPlayStatus: number;
  auditStatus: number;
  bdAuditStatus: number;
  blurCoverUrl: string;
  buyed: boolean;
  canReward: boolean;
  categoryId: number;
  channels: string[];
  commentCount: number;
  commentThreadId: string;
  coverUrl: string;
  createEventId: number;
  createTime: number;
  description: string;
  dj: { defaultAvatar: boolean; province: number; authStatus: number; followed: boolean };
  duration: number;
  feeScope: number;
  id: number;
  isPublish: boolean;
  likedCount: number;
  listenerCount: number;
  copyrightId: number;
  mainTrackId: number;
  name: string;
  privacy: boolean;
  programFeeType: number;
  pubStatus: number;
  radio: {
    category: string;
    buyed: boolean;
    price: number;
    originalPrice: number;
  };
  reward: boolean;
  scheduledPublishTime: number;
  score: number;
  secondCategoryId: number;
  serialNum: number;
  shareCount: number;
  smallLanguageAuditStatus: number;
  subscribed: boolean;
  subscribedCount: number;
  trackCount: number;
  mainSong: Song;
};

export type DJToplistPay = {
  creatorName: string;
  id: number;
  lastRank: number;
  name: string;
  picUrl: string;
  rank: number;
  score: number;
};

export type Toplist = { name: string; coverImgUrl: string; id: number };

export type Track = {
  name: string;
  id: number;
  dt: number;
  al: Album;
  disable?: boolean;
  privilege?: Privilege;
  pc?: {
    nickname: string;
    uid: number;
    br: number;
    ar: string;
    alb: string;
    fn: string;
    cid: string;
    version: number;
    sn: string;
  };
  ar: { id: number; name: string }[];
};

export type Artist = {
  picUrl: string;
  name: string;
  id: number;
  albumSize: number;
  mvSize: number;
  musicSize: number;
  briefDesc: string;
  cover: string;
  alias?: string[];
};

export type Topic = any;

export type ArtistDesc = {
  briefDesc: string;
  count: number;
  introduction: Array<{ ti: string; txt: string }>;
  topicData: Array<Topic>;
};

export type Album = {
  id: number;
  picUrl: string;
  name: string;
  artist: { name: string; alias: string[] };
  size: number;
  description: string;
  publishTime: number;
  artists: Artist[];
  songs: Track[];
};

export type AlbumCategory = 'hot' | 'new';

export type AlbumArea = 'ALL' | 'ZH' | 'EA' | 'KR' | 'JP';

export type TopAlbum = { monthData: Album[]; weekData?: Album[] };

export type TopAlbumParams = { area?: AlbumArea; limit?: number; type?: AlbumCategory };

export type AlbumDetailDynamic = {
  commentCount: number;
  isSub: boolean;
  likedCount: number;
  onSale: boolean;
  shareCount: number;
  subCount: number;
  subTime: number;
};

export type VideoCategogy = { id: number; name: string };

export type Video = {
  type: number;
  coverUrl: string;
  durationms: number;
  playTime: number;
  previewUrl: string;
  title: string;
  vid: string;
};

export interface VideoSingleCreator extends Video {
  creator: { nickname: string };
}

export interface VideoMultiCreator extends Video {
  creator: Array<{ userName: string }>;
}

export type VideoList = { hasmore: boolean; datas: Array<{ data: VideoSingleCreator }> };

type VideoItem = { id: number; name: string };

export type VideoDetail = {
  playTime: number;
  title: string;
  vid: string;
  publishTime: number;
  praisedCount: number;
  shareCount: number;
  commentCount: number;
  subscribeCount: number;
  videoGroup: Array<VideoItem>;
  creator: UserProfile;
};

export type VideoUrl = {
  urls: Array<{ id: string; needPay: boolean; url: string }>;
};

export type MV = {
  id: number;
  artistName: string;
  cover: string;
  imgurl: string;
  name: string;
  playCount: number;
};

export type MVSublist = {
  vid: string;
  creator: { userId: number; userName: string }[];
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

export type Subscribers = { subscribers: Subscriber[]; total: number };

export type DJSubscriber = { subscribers: Subscriber[]; hasMore: boolean; time: number };

export type PlaylistSubscriberParams = { id: number; offset?: number; limit?: number };

export type Concert = {
  id: number;
  cover: string;
  title: string;
  url: string;
  time: [number, number];
};

export type Orpheus = any;

export type SuggestOrderType = 'albums' | 'artists' | 'playlists' | 'songs';

export type SimpleAlbum = { id: number; name: string; picUrl: string; artist: Artist };

export interface SearchSuggest extends Data<any> {
  albums?: SimpleAlbum[];
  artists?: Artist[];
  playlists?: UserPlaylist[];
  songs?: Song[];
  order?: SuggestOrderType[];
}

export type SearchMultimatchOrderType =
  | 'album'
  | 'artist'
  | 'playlist'
  | 'song'
  | 'concert'
  | 'orpheus';
export interface SearchMultimatch extends Data<any> {
  album?: SimpleAlbum[];
  artist?: Artist[];
  playlist?: UserPlaylist[];
  song?: Song[];
  concert?: Concert;
  orpheus?: Orpheus;
  orders?: SearchMultimatchOrderType[];
}

export type SearchParams = {
  keywords: string;
  type: SearchType;
  limit: number;
  offset: number;
};

export type SearchResult<T> = { result: T };

export type SearchSong = {
  songCount: number;
  songs: Song[];
};

export type SearchSinger = {
  artistCount: number;
  artists: Artist[];
};

export type SearchAlbum = {
  albumCount: number;
  albums: Album[];
};

export type SearchVideo = {
  videoCount: number;
  videos: VideoMultiCreator[];
};

export type SearchPlaylist = {
  playlistCount: number;
  playlists: UserPlaylist[];
};

export type SearchLyric = {
  songCount: number;
  songs: SongWithLyric[];
};

export type SearchRadio = {
  djRadioCount: number;
  djRadios: DJRadio[];
};

export type SearchUser = {
  userprofileCount: number;
  userprofiles: UserProfile[];
};

export type MVDetailInfo = {
  likedCount: number;
  shareCount: number;
  commentCount: number;
  liked: boolean;
};

export type MVDetail = {
  id: number;
  name: string;
  artistId: number;
  artistName: string;
  briefDesc: string;
  desc: string;
  cover: string;
  coverId_str: string;
  coverId: number;
  playCount: number;
  subCount: number;
  shareCount: number;
  commentCount: number;
  duration: number;
  nType: number;
  publishTime: string;
  artists: Artist[];
  commentThreadId: string;
  videoGroup: VideoItem[];
};

export type UserCloudData = {
  addTime: number;
  album: string;
  artist: string;
  bitrate: number;
  cover: number;
  coverId: string;
  fileName: string;
  fileSize: number;
  lyricId: string;
  simpleSong: Track;
  songId: number;
  songName: string;
  version: number;
};

export type UserCloud = {
  count: number;
  hasMore: boolean;
  maxSize: string;
  size: string;
  upgradeSign: number;
  data: UserCloudData[];
};

export type PlaylistHighqualityTags = {
  category: number;
  hot: boolean;
  id: number;
  name: string;
  type: number;
};
