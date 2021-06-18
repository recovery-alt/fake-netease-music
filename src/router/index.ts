import Login from '@/views/login';
import Layout from '@/layout';
import PageA from '@/views/page-a';
import PageB from '@/views/page-b';

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
        path: '/page-a',
        component: PageA,
      },
      {
        path: '/page-b',
        component: PageB,
      },
    ],
  },
];

export default routes;
