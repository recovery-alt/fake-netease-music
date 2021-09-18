import React, { useEffect, useState, useMemo } from 'react';
import styles from './album-list.module.less';
import { TopAlbumParams, TopAlbum } from '@/types';
import Img from '@/components/img';
import { resizeImg } from '@/utils';
import { fetchAndSetCurrentTrack } from '@/store';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { getTopAlbum } from '@/api';
import { DynamicPage } from '@/router';

const AlbumList: React.FC<TopAlbumParams> = ({ type, area }) => {
  const [data, setData] = useState<TopAlbum>();
  const dispatch = useDispatch();
  const { push } = useHistory();
  const albums = useMemo(() => data?.weekData || data?.monthData, [data]);
  const isWeek = useMemo(() => !!data?.weekData?.length, [data]);

  useEffect(() => {
    (async () => {
      const res = await getTopAlbum({ area, type, limit: 20 });
      setData(res);
    })();
  }, [area, type]);

  return (
    <div className={styles['album-list']}>
      <div className={styles['album-list__left']}>
        <h2>本{isWeek ? '周' : '月'}新碟</h2>
      </div>
      <div className={styles['album-list__right']}>
        {albums?.map(item => (
          <div key={item.id} className={styles['album-list__item']}>
            <div className={styles['album-list__img-wrapper']}>
              <Img
                className={styles['album-list__img']}
                src={resizeImg(item.picUrl, 100)}
                icon={{ size: 'large', hoverDisplay: true }}
                onClick={() => push(DynamicPage.list(item.id))}
                onIconClick={() => dispatch(fetchAndSetCurrentTrack(item.id))}
              />
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
