import Layout from '@/layout';
import { topMenuMap } from '@/config';
import { lazy } from 'react';

export type RouteConfig = {
  path: string;
  component: React.FC<RouteConfig>;
  exact?: boolean;
  redirect?: string;
  routes?: Array<RouteConfig>;
};

const routes: Array<RouteConfig> = [
  {
    path: '/',
    exact: true,
    component: Layout,
    redirect: '/find-music',
    routes: [
      {
        path: '/fm',
        component: lazy(() => import('@/views/fm')),
      },
      {
        path: '/list/:id?',
        component: lazy(() => import('@/views/list')),
      },
      ...Object.values(topMenuMap).flat(),
    ],
  },
];

export default routes;
