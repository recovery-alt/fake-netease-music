import { FC, useEffect, useMemo, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';

import { getTopAlbum } from '@/api';
import { clearRequests } from '@/api/api';
import Img from '@/components/img';
import { DynamicPage } from '@/router';
import { AppDispatch, fetchAndSetCurrentTrack } from '@/store';
import { TopAlbum, TopAlbumParams } from '@/types';
import { classGenerator, resizeImg } from '@/utils';

import styles from './album-list.module.less';

const AlbumList: FC<TopAlbumParams> = ({ type, area }) => {
  const getClass = classGenerator('album-list', styles);
  const [data, setData] = useState<TopAlbum>();
  const dispatch = useDispatch<AppDispatch>();
  const { push } = useHistory();
  const albums = useMemo(() => data?.weekData || data?.monthData, [data]);
  const isWeek = useMemo(() => !!data?.weekData?.length, [data]);

  async function loadData() {
    const res = await getTopAlbum({ area, type, limit: 20 });
    setData(res);
  }

  useEffect(() => {
    loadData();

    return clearRequests;
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
