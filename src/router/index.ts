import Layout from '@/layout';
import FindMusic from '@/views/find-music';
import FM from '@/views/fm';

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
        path: '/',
        exact: true,
        component: FindMusic,
      },
      {
        path: '/fm',
        component: FM,
      },
    ],
  },
];

export default routes;
