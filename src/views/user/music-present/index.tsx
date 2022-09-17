import { FC } from 'react';
import { lazy, Suspense } from 'react';

import { Track } from '@/types';
import { classGenerator } from '@/utils';

import styles from './music-present.module.less';

export type PageMode = 'card' | 'list' | 'overview';

export type DataType = {
  id: number;
  picUrl: string;
  name: string;
  size: number;
  description: string;
  publishTime: number;
  songs: Track[];
};

export type Props = {
  type: PageMode;
  id: number;
  isAlbum?: boolean;
  myself?: boolean;
  data: DataType[];
};

const MusicPresent: FC<Props> = props => {
  const getClass = classGenerator('music-present', styles);
  const { type, ...rest } = props;
  const strategy = {
    card: lazy(() => import('./components/card')),
    list: lazy(() => import('./components/list')),
    overview: lazy(() => import('./components/overview')),
  };
  const Component = strategy[type];

  return (
    <div className={getClass()}>
      <Suspense fallback="加载中...">
        <Component {...rest} />
      </Suspense>
    </div>
  );
};

export default MusicPresent;
