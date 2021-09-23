export enum Page {
  root = '/',
  home = '/home',
  fm = '/home/fm',
  searchResult = '/home/search-result',
  dailyRecommend = '/home/daily-recommend',
  findMusic = '/home/find-music',
  findMusicMusicList = '/home/find-music/music-list',
  findMusicRadioHost = '/home/find-music/radio-host',
  findMusicRank = '/home/find-music/rank',
  findMusicSinger = '/home/find-music/singer',
  findMusicNewest = '/home/find-music/newest',
  video = '/home/video',
  videoMV = '/home/video/mv',
  friend = '/home/friend',
  iTunes = '/home/i-tunes',
  download = `/home/download`,
  downloadProgram = '/home/download/program',
  downloadPendding = '/home/download/pendding',
  recent = '/home/recent',
  cloudMusic = '/home/cloud-music',
  radio = '/home/radio',
  collection = '/home/collection',
  collectionSinger = '/home/collection/singer',
  collectionVideo = '/home/collection/video',
  collectionColumn = '/home/collection/column',
  setting = '/home/setting',
}

const wrapperSlash = (val?: string | number) => (val ? `/${val}` : '');

const handleSuffix = (name: string, id?: string | number, suffix = 'id') => {
  const prefix = `/${name}`;
  if (id === undefined) return `${prefix}/:${suffix}?`;

  return prefix + wrapperSlash(id);
};

export const DynamicPage = {
  list(id?: string | number, type?: 'album') {
    const prefix = '/home/list';
    if (id === undefined) return `${prefix}/:id?/:type?`;

    return `${prefix}${wrapperSlash(id)}${wrapperSlash(type)}`;
  },
  singer: (id?: string | number) => handleSuffix('home/singer', id),
  user: (id?: string | number) => handleSuffix('home/user', id),
  findMusicNewest: (type?: string) => handleSuffix('home/find-music/newest', type, 'type'),
  playVideo: (id?: string | number) => handleSuffix('play-video', id),
  radioList: (id?: string | number) => handleSuffix('home/radio-list', id),
};
