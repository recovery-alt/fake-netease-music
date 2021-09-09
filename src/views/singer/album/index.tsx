import React, { Suspense, useMemo, lazy } from 'react';
import styles from './album.module.less';
import { Album as AlbumType } from '@/types';

export type AlbumPageMode = 'card' | 'list' | 'overview';

export type Props = { type: AlbumPageMode; id: number; albums: AlbumType[] };

const Album: React.FC<Props> = props => {
  const { type, ...rest } = props;
  const Component = lazy(() => import(/* @vite-ignore */ `./components/${type}`));

  return (
    <div className={styles.album}>
      <Suspense fallback="加载中...">
        <Component {...rest} />
      </Suspense>
    </div>
  );
};

export default Album;
