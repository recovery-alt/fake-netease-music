import React from 'react';
import { PlayCircleFilled, PlaySquareOutlined } from '@ant-design/icons';
import styles from './list.module.less';
import { Song } from '@/api';
import { formatMS } from '@/utils';
import Img from '@/components/img';

type Props = { data: Song[] };

const SongList: React.FC<Props> = ({ data }) => (
  <div className={styles['song-list']}>
    {data.map((item, i) => (
      <div key={item.id} className={styles['song-list__item']}>
        <div className={styles['song-list__left']}>
          <div className={styles['song-list__ordinal']}>{i + 1}</div>
          <div className={styles['song-list__img-wrapper']}>
            <Img className={styles['song-list__img']} src={item.album.picUrl} />
            <PlayCircleFilled />
          </div>
          <div className={styles['song-list__song']}>
            <p>{item.name}</p>
            <small>SQ</small>
            <PlaySquareOutlined />
          </div>
        </div>
        <div className={styles['song-list__right']}>
          <div className={styles['song-list__author']}>
            {item.album.artists.reduce((acc, val) => `${acc}/${val.name}`, '').slice(1)}
          </div>
          <div className={styles['song-list__album']}>{item.album.name}</div>
          <div className={styles['song-list__duration']}>{formatMS(item.duration)}</div>
        </div>
      </div>
    ))}
  </div>
);

export default SongList;
