import React, { lazy } from 'react';
import styles from './album.module.less';

type Props = { type?: 'card' | 'list' | 'overview' };

const Album: React.FC<Props> = ({ type = 'overview' }) => {
  const Component = lazy(() => import(`./components/${type}`));

  return (
    <div className={styles.album}>
      <Component />
    </div>
  );
};

export default Album;
