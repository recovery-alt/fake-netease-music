import Layout from '@/layout';
import { topMenuMap, MenuConfig } from './menu';
import { lazy } from 'react';
import { Page, DynamicPage } from './page';
import { FC } from 'react';

export type RouteConfig = {
  path: string;
  component: FC<any>;
  exact?: boolean;
  routes?: Array<RouteConfig>;
};

const routes: Array<RouteConfig> = [
  {
    path: Page.home,
    exact: true,
    component: Layout,
    routes: [
      {
        path: Page.fm,
        component: lazy(() => import('@/views/fm')),
      },
      {
        path: DynamicPage.list(),
        component: lazy(() => import('@/views/list')),
      },
      {
        path: DynamicPage.singer(),
        component: lazy(() => import('@/views/singer')),
      },
      {
        path: Page.searchResult,
        component: lazy(() => import('@/views/search-result')),
      },
      {
        path: DynamicPage.user(),
        component: lazy(() => import('@/views/user')),
      },
      {
        path: Page.dailyRecommend,
        component: lazy(() => import('@/views/daily-recommend')),
      },
      {
        path: DynamicPage.findMusicNewest(),
        component: lazy(() => import('@/views/find-music/views/newest')),
      },
      {
        path: DynamicPage.radioList(),
        component: lazy(() => import('@/views/radio-list')),
      },
      {
        path: DynamicPage.excellentList(),
        component: lazy(() => import('@/views/find-music/views/music-list/excellent')),
      },
      {
        path: DynamicPage.radioZone(),
        component: lazy(() => import('@/views/find-music/views/radio-host/zone')),
      },
      {
        path: Page.findMusicRadioHostPay,
        component: lazy(() => import('@/views/find-music/views/radio-host/pay-excellent')),
      },
      ...Object.values(topMenuMap).flat(),
    ],
  },
  {
    path: DynamicPage.playVideo(),
    component: lazy(() => import('@/views/play-video')),
  },
];

export default routes;

export { Page, DynamicPage, topMenuMap };

export type { MenuConfig };
