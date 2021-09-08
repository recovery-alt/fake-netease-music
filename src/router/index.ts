import Layout from '@/layout';
import { topMenuMap } from '@/config';
import React, { lazy } from 'react';

export type RouteConfig = {
  path: string;
  component: React.FC<any>;
  exact?: boolean;
  routes?: Array<RouteConfig>;
};

const routes: Array<RouteConfig> = [
  {
    path: '/',
    exact: true,
    component: Layout,
    routes: [
      {
        path: '/fm',
        component: lazy(() => import('@/views/fm')),
      },
      {
        path: '/list/:id?',
        component: lazy(() => import('@/views/list')),
      },
      {
        path: '/singer/:id?',
        component: lazy(() => import('@/views/singer')),
      },
      {
        path: '/search-result',
        component: lazy(() => import('@/views/search-result')),
      },
      {
        component: lazy(() => import('@/views/find-music/views/newest')),
        path: '/find-music/newest/:type?',
      },
      ...Object.values(topMenuMap).flat(),
    ],
  },
];

export default routes;
