import { getTopAlbum } from '@/api';
import React, { useEffect, useState } from 'react';
import styles from './album-list.module.less';
import { TopAlbumParams, Album } from '@/api';

type Props = TopAlbumParams;

const AlbumList: React.FC<Props> = ({ type }) => {
  const [data, setData] = useState<Album[]>([]);

  useEffect(() => {
    (async () => {
      const res = await getTopAlbum({ area: 'ALL', type });
      setData(res.monthData);
    })();
  }, []);

  return (
    <div className={styles['album-list']}>
      <div className={styles['album-list__left']}>
        <h2>本周新碟</h2>
      </div>
      <div className={styles['album-list__right']}>
        {data.map((item, i) => (
          <div key={i} className={styles['album-list__item']}>
            <div className={styles['album-list__img']}>
              <img src={item.picUrl} alt="img" />
            </div>
            <div className={styles['album-list__description']}>
              <div className={styles['album-list__name']}>{item.name}</div>
              <div className={styles['album-list__author']}>{item.artist.name}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AlbumList;
