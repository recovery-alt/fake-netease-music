import React from 'react';
import styles from './album-detail.module.less';

type Props = { description: string };

const AlbumDetail: React.FC<Props> = ({ description }) => (
  <div className={styles['album-detail']}>
    <header className={styles['album-detail__title']}>专辑介绍</header>
    <p>{description}</p>
  </div>
);

export default AlbumDetail;
