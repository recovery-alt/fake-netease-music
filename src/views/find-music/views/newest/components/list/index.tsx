import React from 'react';
import { PlayCircleFilled, PlaySquareOutlined } from '@ant-design/icons';
import styles from './list.module.less';
import { Song } from '@/api';
import dayjs from 'dayjs';

type Props = { data: Song[] };

const List: React.FC<Props> = ({ data }) => (
  <div className={styles.list}>
    {data.map((item, i) => (
      <div key={item.id} className={styles.list__item}>
        <div className={styles.list__left}>
          <div className={styles.list__ordinal}>{i + 1}</div>
          <div className={styles.list__img}>
            <img src={item.album.picUrl} alt="img" />
            <PlayCircleFilled />
          </div>
          <div className={styles.list__song}>
            <p>{item.name}</p>
            <small>SQ</small>
            <PlaySquareOutlined />
          </div>
        </div>
        <div className={styles.list__right}>
          <div className={styles.list__author}>
            {item.album.artists.reduce((acc, val) => `${acc}/${val.name}`, '').slice(1)}
          </div>
          <div className={styles.list__album}>{item.album.name}</div>
          <div className={styles.list__duration}>{dayjs(item.duration).format('mm:ss')}</div>
        </div>
      </div>
    ))}
  </div>
);

export default List;
