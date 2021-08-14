import type { Data } from '@/types';
import { AlbumArea } from '@/types';

import FindMusic from '@/views/find-music';
import FindMusicList from '@/views/find-music/views/list';
import FindMusicNewest from '@/views/find-music/views/newest';
import FindMusicRadioHost from '@/views/find-music/views/radio-host';
import FindMusicRank from '@/views/find-music/views/rank';
import FindMusicSinger from '@/views/find-music/views/singer';

import Video from '@/views/video';
import VideoMV from '@/views/video/views/mv';

import Friend from '@/views/friend';

import ITunes from '@/views/i-tunes';

import Download from '@/views/download';
import DownloadProgram from '@/views/download/views/program';
import DownloadPedding from '@/views/download/views/pedding';

import CloudMusic from '@/views/cloud-music';

import Radio from '@/views/radio';

import Recent from '@/views/recent';

import Collection from '@/views/collection';
import CollectionSinger from '@/views/collection/views/singer';
import CollectionVideo from '@/views/collection/views/video';

import Column from '@/views/collection/views/column';

export type MenuConfig = { label: string; component: React.FC; path: string; exact?: boolean };

export const topMenuMap: Data<Array<MenuConfig>> = {
  'find-music': [
    { label: '个性推荐', component: FindMusic, path: '/find-music', exact: true },
    { label: '歌单', component: FindMusicList, path: '/find-music/list' },
    { label: '主播电台', component: FindMusicRadioHost, path: '/find-music/radio-host' },
    { label: '排行榜', component: FindMusicRank, path: '/find-music/rank' },
    { label: '歌手', component: FindMusicSinger, path: '/find-music/singer' },
    { label: '最新音乐', component: FindMusicNewest, path: '/find-music/newest' },
  ],
  video: [
    { label: '视频', component: Video, path: '/video', exact: true },
    { label: 'MV', component: VideoMV, path: '/video/mv' },
  ],
  friend: [{ label: '动态', component: Friend, path: '/friend' }],
  'i-tunes': [{ label: 'iTunes音乐', component: ITunes, path: '/i-tunes' }],
  download: [
    { label: '已下载单曲', component: Download, path: '/download', exact: true },
    { label: '已下载节目', component: DownloadProgram, path: '/download/program' },
    { label: '正在下载', component: DownloadPedding, path: '/download/pendding' },
  ],
  'cloud-music': [{ label: '我的音乐云盘', component: CloudMusic, path: '/cloud-music' }],
  radio: [{ label: '我的电台', component: Radio, path: '/radio' }],
  recent: [{ label: '最近播放', component: Recent, path: '/recent' }],
  collection: [
    { label: '专辑', component: Collection, path: '/collection', exact: true },
    { label: '歌手', component: CollectionSinger, path: '/collection/singer' },
    { label: '视频', component: CollectionVideo, path: '/collection/video' },
    { label: '专栏', component: Column, path: '/collection/column' },
  ],
};

export const categoryList: { name: string; area: number; type: number; albumArea?: AlbumArea }[] = [
  { name: '全部', area: -1, type: 0, albumArea: 'ALL' },
  { name: '华语', area: 7, type: 7, albumArea: 'ZH' },
  { name: '欧美', area: 96, type: 96, albumArea: 'EA' },
  { name: '日本', area: 8, type: 8, albumArea: 'JP' },
  { name: '韩国', area: 16, type: 16, albumArea: 'KR' },
  { name: '其他', area: 0, type: -1 },
];

export const areaCategory = ['内地', '港台', '欧美', '日本', '韩国'];
