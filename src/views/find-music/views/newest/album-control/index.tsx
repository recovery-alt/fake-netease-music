import React, { useState, useEffect, forwardRef, useImperativeHandle } from 'react';
import classNames from 'classnames';
import { AlbumType } from '@/types';
import styles from './album-control.module.less';

type Props = { albumType: AlbumType; setAlbumType: (albumType: AlbumType) => void };

const AlbumControl: React.FC<Props> = ({ albumType, setAlbumType }) => {
  const albumOptions: { text: string; type: AlbumType }[] = [
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
