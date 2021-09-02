import { getTopAlbum } from '@/api';
import React, { useEffect, useState } from 'react';
import styles from './album-list.module.less';
import { TopAlbumParams, Album } from '@/types';
import Img from '@/components/img';
import { resizeImg } from '@/utils';

type Props = TopAlbumParams;

const AlbumList: React.FC<Props> = ({ type }) => {
  const [data, setData] = useState<Album[]>([]);

  useEffect(() => {
    (async () => {
      const res = await getTopAlbum({ area: 'ALL', type, limit: 20 });
      setData(res.monthData);
    })();
  }, []);

  return (
    <div className={styles['album-list']}>
      <div className={styles['album-list__left']}>
        <h2>本周新碟</h2>
      </div>
      <div className={styles['album-list__right']}>
        {data.map(item => (
          <div key={item.id} className={styles['album-list__item']}>
            <div className={styles['album-list__img-wrapper']}>
              <Img className={styles['album-list__img']} src={resizeImg(item.picUrl, 100)} />
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
