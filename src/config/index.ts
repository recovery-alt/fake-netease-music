import { Data, AlbumArea } from '@/types';
import { lazy } from 'react';

export type MenuConfig = { label: string; component: React.FC; path: string; exact?: boolean };

export const topMenuMap: Data<Array<MenuConfig>> = {
  'find-music': [
    {
      label: '个性推荐',
      component: lazy(() => import('@/views/find-music')),
      path: '/find-music',
      exact: true,
    },
    {
      label: '歌单',
      component: lazy(() => import('@/views/find-music/views/music-list')),
      path: '/find-music/music-list',
    },
    {
      label: '主播电台',
      component: lazy(() => import('@/views/find-music/views/radio-host')),
      path: '/find-music/radio-host',
    },
    {
      label: '排行榜',
      component: lazy(() => import('@/views/find-music/views/rank')),
      path: '/find-music/rank',
    },
    {
      label: '歌手',
      component: lazy(() => import('@/views/find-music/views/singer')),
      path: '/find-music/singer',
    },
    {
      label: '最新音乐',
      component: lazy(() => import('@/views/find-music/views/newest')),
      path: '/find-music/newest',
    },
  ],
  video: [
    {
      label: '视频',
      component: lazy(() => import('@/views/video')),
      path: '/video',
      exact: true,
    },
    {
      label: 'MV',
      component: lazy(() => import('@/views/video/views/mv')),
      path: '/video/mv',
    },
  ],
  friend: [
    {
      label: '动态',
      component: lazy(() => import('@/views/friend')),
      path: '/friend',
    },
  ],
  'i-tunes': [
    {
      label: 'iTunes音乐',
      component: lazy(() => import('@/views/i-tunes')),
      path: '/i-tunes',
    },
  ],
  download: [
    {
      label: '已下载单曲',
      component: lazy(() => import('@/views/download')),
      path: '/download',
      exact: true,
    },
    {
      label: '已下载节目',
      component: lazy(() => import('@/views/download/views/program')),
      path: '/download/program',
    },
    {
      label: '正在下载',
      component: lazy(() => import('@/views/download/views/pedding')),
      path: '/download/pendding',
    },
  ],
  recent: [
    {
      label: '最近播放',
      component: lazy(() => import('@/views/recent')),
      path: '/recent',
    },
  ],
  'cloud-music': [
    {
      label: '我的音乐云盘',
      component: lazy(() => import('@/views/cloud-music')),
      path: '/cloud-music',
    },
  ],
  radio: [
    {
      label: '我的电台',
      component: lazy(() => import('@/views/radio')),
      path: '/radio',
    },
  ],
  collection: [
    {
      label: '专辑',
      component: lazy(() => import('@/views/collection')),
      path: '/collection',
      exact: true,
    },
    {
      label: '歌手',
      component: lazy(() => import('@/views/collection/views/singer')),
      path: '/collection/singer',
    },
    {
      label: '视频',
      component: lazy(() => import('@/views/collection/views/video')),
      path: '/collection/video',
    },
    {
      label: '专栏',
      component: lazy(() => import('@/views/collection/views/column')),
      path: '/collection/column',
    },
  ],
  setting: [
    {
      label: '设置',
      component: lazy(() => import('@/views/setting')),
      path: '/setting',
    },
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
