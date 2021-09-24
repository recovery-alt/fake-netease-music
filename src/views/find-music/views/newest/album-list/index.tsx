import React, { useEffect, useState, useMemo } from 'react';
import styles from './album-list.module.less';
import { TopAlbumParams, TopAlbum } from '@/types';
import Img from '@/components/img';
import { classGenerator, resizeImg } from '@/utils';
import { fetchAndSetCurrentTrack } from '@/store';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { getTopAlbum } from '@/api';
import { DynamicPage } from '@/router';

const AlbumList: React.FC<TopAlbumParams> = ({ type, area }) => {
  const getClass = classGenerator('album-list', styles);
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
    <div className={getClass()}>
      <div className={getClass('left')}>
        <h2>本{isWeek ? '周' : '月'}新碟</h2>
      </div>
      <div className={getClass('right')}>
        {albums?.map(item => (
          <div key={item.id} className={getClass('item')}>
            <div className={getClass('img-wrapper')}>
              <Img
                className={getClass('img')}
                src={resizeImg(item.picUrl, 100)}
                icon={{ size: 'big', hoverDisplay: true }}
                onClick={() => push(DynamicPage.list(item.id))}
                onIconClick={() => dispatch(fetchAndSetCurrentTrack(item.id))}
              />
            </div>
            <div className={getClass('description')}>
              <div className={getClass('name')}>{item.name}</div>
              <div className={getClass('author')}>{item.artist.name}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AlbumList;
