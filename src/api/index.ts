import {
  Album,
  Artist,
  BannerType,
  Data,
  DJCatelist,
  DJPersonalizeRecommend,
  DJRadio,
  DJToplist,
  DJToplistPay,
  Lyric,
  Music,
  MVSublist,
  MV,
  Personalized,
  Playlist,
  PlaylistCatlist,
  Song,
  TopAlbumParams,
  Toplist,
  TopPlaylist,
  VideoCategogy,
  VideoSingleCreator,
  Track,
  ArtistListParams,
  TopPlaylistParams,
  CommentData,
  TopAlbum,
  SearchHot,
  Subscriber,
  PlaylistSubscriberParams,
  SearchSuggest,
  SearchParams,
  SearchResult,
  PlaylistDetail,
  ArtistDesc,
} from '@/types';
import { get } from './api';

export * from './login';

export const getBanner = () => get<{ banners: BannerType[] }>('/banner');
export const getDJBanner = () =>
  get<{ data: { targetId: number; pic: string; url: string }[] }>('/dj/banner');

export const getPersonalized = (params: Data) => get<Personalized[]>('/personalized', params);

export const getPPList = (params: Data) =>
  get<Personalized[]>('/personalized/privatecontent/list', params);

export const getPersonalizedMV = () => get<Personalized[]>('/personalized/mv');

export const getAlbumNewest = () => get<{ albums: Album[] }>('/album/newest');

export const getDJToplist = (limit = 6) => get<{ toplist: DJToplist[] }>('/dj/toplist', { limit });

export const getSongUrl = (id: number) => get<{ data: Song[] }>('/song/url', { id });

export const getLyric = (id: number | string) => get<Lyric>('/lyric', { id });

export const getPersonalFM = () => get<{ data: Array<Music> }>('/personal_fm');

export const getCommentMusic = (id: number | string, offset = 0) =>
  get<CommentData>('/comment/music', { id, offset });

export const getCommentPlaylist = (id: number | string, offset = 0) =>
  get<CommentData>('/comment/playlist', { id, offset });

export const getMusicCategory = () => get<{ tags: Playlist[] }>('/playlist/hot');

export const getAllMusicCategory = () => get<PlaylistCatlist>('/playlist/catlist');

export const getTopPlaylist = ({ offset, limit, cat }: TopPlaylistParams) =>
  get<{ total: number; playlists: TopPlaylist[] }>('/top/playlist', { cat, offset, limit });

export const getDJCatelist = () => get<{ categories: DJCatelist[] }>('/dj/catelist');

export const getDJPersonalizeRecommend = (limit = 5) =>
  get<{ data: DJPersonalizeRecommend[] }>('/dj/personalize/recommend', { limit });

export const getDJPaygift = (limit = 4) =>
  get<{ data: { list: DJRadio[] } }>('/dj/paygift', { limit });

export const getDJToplistPay = (limit = 5) =>
  get<{ data: { list: DJToplistPay[] } }>('/dj/toplist/pay', { limit });

export const getDJRecommendType = (type: number) =>
  get<{ djRadios: DJRadio[] }>('/dj/recommend/type', { type });

export const getToplist = () => get<{ list: Toplist[] }>('/toplist');

export const getToplistDetail = () => get('/toplist/detail');

export const getPlaylistDetail = (id: number) => get<PlaylistDetail>('/playlist/detail', { id });

export const getArtistList = (params?: ArtistListParams) =>
  get<{ more: boolean; artists: Artist[] }>('/artist/list', params);

export const getTopSong = (type: number) => get<{ data: Song[] }>('/top/song', { type });

export const getTopAlbum = (params: TopAlbumParams) => get<TopAlbum>('/top/album', params);

export const getVideoCategoryList = () => get<{ data: VideoCategogy[] }>('/video/category/list');

export const getVideoGroup = (id: number, offset = 0) =>
  get<{ datas: { data: VideoSingleCreator }[] }>('/video/group', { id, offset });

export const getMVFirst = (area: string, limit = 6) =>
  get<{ data: MV[] }>('/mv/first', { area, limit });

export const getMVAll = (limit = 6) => get<{ data: MV[] }>('/mv/all', { limit });
export const getMVExclusiveRcmd = (limit = 6) =>
  get<{ data: MV[] }>('/mv/exclusive/rcmd', { limit });

export const getTopMV = (limit = 10) => get<{ data: MV[] }>('/top/mv', { limit });

export const getDJSublist = () => get<{ count: number; djRadios: DJRadio[] }>('/dj/sublist');

export const getAlbumSublist = () => get<{ data: Album[] }>('/album/sublist');

export const getArtistSublist = () => get<{ data: Artist[] }>('/artist/sublist');

export const getMVSublist = () => get<{ data: MVSublist[] }>('/mv/sublist');

export const getSimiPlaylist = (id: number) =>
  get<{ playlists: Playlist[] }>('/simi/playlist', { id });

export const getSimiSong = (id: number) => get<{ songs: Music[] }>('/simi/song', { id });

export const getTopPlaylistHighquality = (cat: string, limit = 1) =>
  get<{ playlists: Playlist[] }>('/top/playlist/highquality', { cat, limit });

export const getSongDetail = (ids: string | number) =>
  get<{ songs: Track[] }>('/song/detail', { ids });

export const getSearchHotDetail = () => get<{ data: SearchHot[] }>('/search/hot/detail');

export const getPlaylistSubscribers = ({ id, offset, limit = 20 }: PlaylistSubscriberParams) =>
  get<{ subscribers: Subscriber[]; total: number }>('/playlist/subscribers', { id, offset, limit });

export const getSearchSuggest = (keywords: string) =>
  get<{ result: SearchSuggest }>('/search/suggest', { keywords });

export const getSearch = <T>(params: SearchParams) => get<T>('/search', params);

export const getSearchMultimatch = (keywords: string) =>
  get<SearchResult<SearchSuggest>>('/search/multimatch', { keywords });

export const getArtistDetail = (id: number) =>
  get<{ data: { artist: Artist } }>('/artist/detail', { id });

export const getArtistTopSong = (id: number) => get<{ songs: Track[] }>('/artist/top/song', { id });

export const getArtistAlbum = (id: number) => get<{ hotAlbums: Album[] }>('/artist/album', { id });

export const getArtistDesc = (id: number) => get<ArtistDesc>('/artist/desc', { id });

export const getAlbum = (id: number) => get<{ songs: Track[] }>('/album', { id });

export const getArtistMV = (id: number) => get<{ mvs: MV[] }>('/artist/mv', { id });

export const getSimiArtist = (id: number) => get<{ artists: Artist[] }>('/simi/artist', { id });
