import Login from '@/views/Login';
import Layout from '@/layout1';
import PageA from '@/views/PageA';
import PageB from '@/views/PageB';

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
