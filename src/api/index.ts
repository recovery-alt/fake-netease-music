import {
  Album,
  AlbumDetailDynamic,
  Artist,
  ArtistDesc,
  ArtistListParams,
  BannerType,
  CommentData,
  Data,
  DJCatelist,
  DJDetail,
  DJPersonalizeRecommend,
  DJProgram,
  DJRadio,
  DJSubscriber,
  DJToplist,
  DJToplistPay,
  Lyric,
  Music,
  MV,
  MVDetail,
  MVDetailInfo,
  MVSublist,
  Personalized,
  PlaylistCatlist,
  PlaylistDetail,
  PlaylistHighqualityTags,
  PlaylistSubscriberParams,
  SearchHot,
  SearchParams,
  SearchResult,
  SearchSuggest,
  Song,
  Subscribers,
  TopAlbum,
  TopAlbumParams,
  Toplist,
  TopPlaylist,
  TopPlaylistParams,
  Track,
  UserCloud,
  UserDetail,
  UserPlaylist,
  UserProfile,
  VideoCategogy,
  VideoDetail,
  VideoList,
  VideoMultiCreator,
  VideoUrl,
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

export const getMusicCategory = () => get<{ tags: UserPlaylist[] }>('/playlist/hot');

export const getAllMusicCategory = () => get<PlaylistCatlist>('/playlist/catlist');

export const getTopPlaylist = ({ offset, limit, cat }: TopPlaylistParams) =>
  get<{ total: number; playlists: TopPlaylist[] }>('/top/playlist', { cat, offset, limit });

export const getDJCatelist = () => get<{ categories: DJCatelist[] }>('/dj/catelist');

export const getDJPersonalizeRecommend = (limit = 5) =>
  get<{ data: DJPersonalizeRecommend[] }>('/dj/personalize/recommend', { limit });

export const getDJPaygift = (offset = 0, limit = 4) =>
  get<{ data: { hasMore: boolean; list: DJRadio[] } }>('/dj/paygift', { offset, limit });

export const getUserAudio = (uid: number) => get<{ djRadios: DJRadio[] }>('/user/audio', { uid });

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

export const getVideoGroup = (id?: number | string, offset = 0) =>
  get<VideoList>('/video/group', { id, offset });

export const getMVFirst = (area: string | number, limit = 6) =>
  get<{ data: MV[] }>('/mv/first', { area, limit });

export const getMVAll = (limit = 6) => get<{ data: MV[] }>('/mv/all', { limit });
export const getMVExclusiveRcmd = (limit = 6) =>
  get<{ data: MV[] }>('/mv/exclusive/rcmd', { limit });

export const getTopMV = (area: string | number, limit = 10) =>
  get<{ data: MV[] }>('/top/mv', { area, limit });

export const getDJSublist = () => get<{ count: number; djRadios: DJRadio[] }>('/dj/sublist');

export const getAlbumSublist = () => get<{ data: Album[] }>('/album/sublist');

export const getArtistSublist = () => get<{ data: Artist[] }>('/artist/sublist');

export const getMVSublist = () => get<{ count: number; data: MVSublist[] }>('/mv/sublist');

export const getSimiPlaylist = (id: number) =>
  get<{ playlists: UserPlaylist[] }>('/simi/playlist', { id });

export const getSimiSong = (id: number) => get<{ songs: Music[] }>('/simi/song', { id });

export const getSongDetail = (ids: string | number) =>
  get<{ songs: Track[] }>('/song/detail', { ids });

export const getSearchHotDetail = () => get<{ data: SearchHot[] }>('/search/hot/detail');

export const getPlaylistSubscribers = ({ id, offset, limit = 20 }: PlaylistSubscriberParams) =>
  get<Subscribers>('/playlist/subscribers', { id, offset, limit });

export const getSearchSuggest = (keywords: string) =>
  get<{ result: SearchSuggest }>('/search/suggest', { keywords });

export const getSearch = <T>(params: SearchParams) => get<T>('/search', params);

export const getSearchMultimatch = (keywords: string) =>
  get<SearchResult<SearchSuggest>>('/search/multimatch', { keywords });

export const getArtistDetail = (id: number) =>
  get<{ data: { user: UserProfile; artist: Artist } }>('/artist/detail', { id });

export const getArtistTopSong = (id: number) => get<{ songs: Track[] }>('/artist/top/song', { id });

export const getArtistAlbum = (id: number) => get<{ hotAlbums: Album[] }>('/artist/album', { id });

export const getArtistDesc = (id: number) => get<ArtistDesc>('/artist/desc', { id });

export const getAlbum = (id: number) => get<{ album: Album; songs: Track[] }>('/album', { id });

export const getArtistMV = (id: number) => get<{ mvs: MV[] }>('/artist/mv', { id });

export const getSimiArtist = (id: number) => get<{ artists: Artist[] }>('/simi/artist', { id });

export const getAlbumDetailDynamic = (id: number) =>
  get<AlbumDetailDynamic>('/album/detail/dynamic', { id });

export const getCommentAlbum = (id: number | string, offset = 0) =>
  get<CommentData>('/comment/album', { id, offset });

export const getUserDetail = (uid: number) => get<UserDetail>('/user/detail', { uid });

export const getRecommendSongs = () => get<{ data: { dailySongs: Track[] } }>('/recommend/songs');

export const getCommentVideo = (id: string | number, offset = 0) =>
  get<CommentData>('/comment/video', { id, offset });

export const getVideoDetail = (id: string) => get<{ data: VideoDetail }>('/video/detail', { id });

export const getVideoUrl = (id: string) => get<VideoUrl>('/video/url', { id });

export const getRelatedAllvideo = (id: string) =>
  get<{ data: VideoMultiCreator[] }>('/related/allvideo', { id });

export const getVideoGroupList = () => get<{ data: VideoCategogy[] }>('/video/group/list');

export const getVideoTimelineAll = (offset = 0) =>
  get<VideoList>('/video/timeline/all', { offset });

export const getDJDetail = (rid: number) => get<{ data: DJDetail }>('/dj/detail', { rid });

export const getDJProgram = (rid: number) => get<{ programs: DJProgram[] }>('/dj/program', { rid });

export const getDJSubscriber = (id: number, time: number) =>
  get<DJSubscriber>('/dj/subscriber', { id, time });

export const getCommentDJ = (id: number | string) => get<CommentData>('/comment/dj', { id });

export const getMVUrl = (id: number) => get<{ data: { url: string } }>('/mv/url', { id });

export const getMVDetail = (mvid: number) => get<{ data: MVDetail }>('/mv/detail', { mvid });

export const getMVDetailInfo = (mvid: number) => get<MVDetailInfo>('/mv/detail/info', { mvid });

export const getCommentMV = (id: string | number, offset = 0) =>
  get<CommentData>('/comment/mv', { id, offset });

export const getUserCloud = (offset: number, limit: number) =>
  get<UserCloud>('/user/cloud', { offset, limit });

export const getPlaylistHighqualityTags = () =>
  get<{ tags: PlaylistHighqualityTags[] }>('/playlist/highquality/tags');

export const getTopPlaylistHighquality = (cat: string, limit = 1, before?: number) =>
  get<{ lasttime: number; playlists: UserPlaylist[] }>('/top/playlist/highquality', {
    cat,
    limit,
    before,
  });

export const getDJRadioHot = (cateId: number, offset: number, limit: number) =>
  get<{ hasMore: boolean; djRadios: DJRadio[] }>('/dj/radio/hot', { cateId, offset, limit });
