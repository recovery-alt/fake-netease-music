import { Track } from '@/types';
import React, { Suspense, lazy } from 'react';
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
  data: DataType[];
};

const MusicPresent: React.FC<Props> = props => {
  const { type, ...rest } = props;
  const Component = lazy(() => import(/* @vite-ignore */ `./components/${type}`));

  return (
    <div className={styles['music-present']}>
      <Suspense fallback="加载中...">
        <Component {...rest} />
      </Suspense>
    </div>
  );
};

export default MusicPresent;
