import Layout from '@/layout';
import FM from '@/views/fm';
import List from '@/views/list';
import { topMenuMap } from '@/config';

export type RouteConfig = {
  path: string;
  component: React.FC;
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
        component: FM,
      },
      {
        path: '/list',
        component: List,
      },
      ...Object.values(topMenuMap).flat(),
    ],
  },
];

export default routes;
