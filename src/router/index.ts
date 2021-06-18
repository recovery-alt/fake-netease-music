import Login from '@/views/login1';
import Layout from '@/layout';
import PageA from '@/views/page-a';
import PageB from '@/views/page-b';

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
