import React from 'react';
import classNames from 'classnames';
import { AlbumCategory } from '@/types';
import styles from './album-control.module.less';

type Props = { albumType: AlbumCategory; setAlbumType: (albumType: AlbumCategory) => void };

const AlbumControl: React.FC<Props> = ({ albumType, setAlbumType }) => {
  const albumOptions: { text: string; type: AlbumCategory }[] = [
    { text: '推荐', type: 'hot' },
    { text: '全部', type: 'new' },
  ];

  return (
    <div className={styles['album-control']}>
      {albumOptions.map(item => (
        <div key={item.text} className={styles['album-control__item']}>
          <span
            className={classNames({ [styles['--active']]: albumType === item.type })}
            onClick={() => setAlbumType(item.type)}
          >
            {item.text}
          </span>
        </div>
      ))}
    </div>
  );
};

export default AlbumControl;
