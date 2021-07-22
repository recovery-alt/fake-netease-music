import Layout from '@/layout';
import FindMusic from '@/views/find-music';
import FM from '@/views/fm';

export type RouteConfig = {
  path: string;
  component: React.FC;
  exact?: boolean;
  routes?: Array<RouteConfig>;
};

const routes = [
  {
    path: '/',
    component: Layout,
    routes: [
      {
        path: '/find-music',
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
