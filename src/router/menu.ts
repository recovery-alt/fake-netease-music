import { FC, lazy } from 'react';

import { Data } from '@/types';

import { Page } from './page';

export type MenuConfig = { label: string; component: FC; path: string; exact?: boolean };

export const topMenuMap: Data<Array<MenuConfig>> = {
  'find-music': [
    {
      label: '个性推荐',
      component: lazy(() => import('@/views/find-music')),
      path: Page.findMusic,
      exact: true,
    },
    {
      label: '歌单',
      component: lazy(() => import('@/views/find-music/views/music-list')),
      path: Page.findMusicMusicList,
      exact: true,
    },
    {
      label: '主播电台',
      component: lazy(() => import('@/views/find-music/views/radio-host')),
      path: Page.findMusicRadioHost,
      exact: true,
    },
    {
      label: '排行榜',
      component: lazy(() => import('@/views/find-music/views/rank')),
      path: Page.findMusicRank,
    },
    {
      label: '歌手',
      component: lazy(() => import('@/views/find-music/views/singer')),
      path: Page.findMusicSinger,
    },
    {
      label: '最新音乐',
      component: lazy(() => import('@/views/find-music/views/newest')),
      path: Page.findMusicNewest,
    },
  ],
  video: [
    {
      label: '视频',
      component: lazy(() => import('@/views/video')),
      path: Page.video,
      exact: true,
    },
    {
      label: 'MV',
      component: lazy(() => import('@/views/video/views/mv')),
      path: Page.videoMV,
    },
  ],
  friend: [
    {
      label: '动态',
      component: lazy(() => import('@/views/friend')),
      path: Page.friend,
    },
  ],
  'i-tunes': [
    {
      label: 'iTunes音乐',
      component: lazy(() => import('@/views/i-tunes')),
      path: Page.iTunes,
    },
  ],
  download: [
    {
      label: '已下载单曲',
      component: lazy(() => import('@/views/download')),
      path: Page.download,
      exact: true,
    },
    {
      label: '已下载节目',
      component: lazy(() => import('@/views/download/views/program')),
      path: Page.downloadProgram,
    },
    {
      label: '正在下载',
      component: lazy(() => import('@/views/download/views/pedding')),
      path: Page.downloadPendding,
    },
  ],
  recent: [
    {
      label: '最近播放',
      component: lazy(() => import('@/views/recent')),
      path: Page.recent,
    },
  ],
  'cloud-music': [
    {
      label: '我的音乐云盘',
      component: lazy(() => import('@/views/cloud-music')),
      path: Page.cloudMusic,
    },
  ],
  radio: [
    {
      label: '我的电台',
      component: lazy(() => import('@/views/radio')),
      path: Page.radio,
    },
  ],
  collection: [
    {
      label: '专辑',
      component: lazy(() => import('@/views/collection')),
      path: Page.collection,
      exact: true,
    },
    {
      label: '歌手',
      component: lazy(() => import('@/views/collection/views/singer')),
      path: Page.collectionSinger,
    },
    {
      label: '视频',
      component: lazy(() => import('@/views/collection/views/video')),
      path: Page.collectionVideo,
    },
    {
      label: '专栏',
      component: lazy(() => import('@/views/collection/views/column')),
      path: Page.collectionColumn,
    },
  ],
  setting: [
    {
      label: '设置',
      component: lazy(() => import('@/views/setting')),
      path: Page.setting,
    },
  ],
};
