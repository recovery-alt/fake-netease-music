import { getTopAlbum } from '@/api';
import React, { useEffect } from 'react';
import styles from './album-list.module.less';
import { TopAlbumParams, Album } from '@/api';

type Props = { data: Album[] } & TopAlbumParams;

const AlbumList: React.FC<Props> = ({ type }) => {
  useEffect(() => {
    (async () => {
      const res = await getTopAlbum({ area: 'ALL', type });
      console.log(res);
    })();
  }, []);
  return (
    <div className={styles['album-list']}>
      <div className={styles['album-list__left']}>
        <h2>本周新碟</h2>
      </div>
      <div className={styles['album-list__right']}>
        {Array(30)
          .fill(0)
          .map((item, i) => (
            <div key={i} className={styles['album-list__item']}>
              <div className={styles['album-list__img']}>
                <img src="" alt="" />
              </div>
              <div className={styles['album-list__description']}>
                <div className={styles['album-list__name']}>值得更好的</div>
                <div className={styles['album-list__author']}>张杰</div>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default AlbumList;
