import Login from '@/views/login';
import Layout from '@/layout';
import FindMusic from '@/views/find-music';
import FM from '@/views/fm';

export type RouteConfig = {
  path: string;
  component: () => JSX.Element;
  exact?: boolean;
  routes?: Array<RouteConfig>;
};

const routes = [
  {
    path: '/login',
    component: Login,
    exact: true,
  },
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
