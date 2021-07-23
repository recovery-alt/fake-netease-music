import Layout from '@/layout';
import FindMusic from '@/views/find-music';
import FM from '@/views/fm';
import Video from '@/views/video';
import Friend from '@/views/friend';
import ITunes from '@/views/i-tunes';
import Download from '@/views/download';
import Recent from '@/views/recent';
import CloudMusic from '@/views/cloud-music';
import Radio from '@/views/radio';
import Collection from '@/views/collection';
import List from '@/views/list';

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
        path: '/find-music',
        exact: true,
        component: FindMusic,
      },
      {
        path: '/fm',
        component: FM,
      },
      {
        path: '/video',
        component: Video,
      },
      {
        path: '/friend',
        component: Friend,
      },
      {
        path: '/i-tunes',
        component: ITunes,
      },
      {
        path: '/download',
        component: Download,
      },
      {
        path: '/recent',
        component: Recent,
      },
      {
        path: '/cloud-music',
        component: CloudMusic,
      },
      {
        path: '/radio',
        component: Radio,
      },
      {
        path: '/collection',
        component: Collection,
      },
      {
        path: '/list',
        component: List,
      },
    ],
  },
];

export default routes;
