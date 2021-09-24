import { classGenerator } from '@/utils';
import React from 'react';
import styles from './album-detail.module.less';

type Props = { description: string };

const AlbumDetail: React.FC<Props> = ({ description }) => {
  const getClass = classGenerator('album-detail', styles);

  return (
    <div className={getClass()}>
      <header className={getClass('title')}>专辑介绍</header>
      <p>{description}</p>
    </div>
  );
};

export default AlbumDetail;
