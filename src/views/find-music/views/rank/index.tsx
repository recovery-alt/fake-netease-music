import './rank.less';

import { FC, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';

import { getPlaylistDetail, getToplist } from '@/api';
import Img from '@/components/img';
import { DynamicPage } from '@/router';
import { AppDispatch, fetchAndSetCurrentTrack, setCurrentTrack } from '@/store';
import { Toplist, Track, UserPlaylist } from '@/types';
import { classGenerator, resizeImg } from '@/utils';

import Official from './official';

const Rank: FC = () => {
  const getClass = classGenerator('rank');
  const [toplist, setToplist] = useState<Toplist[]>([]);
  const [playlistDetail, setPlaylistDetail] = useState<UserPlaylist[]>([]);
  const dispatch = useDispatch<AppDispatch>();
  const { push } = useHistory();

  function handleItemClick(tracks: Track[], current: number) {
    dispatch(setCurrentTrack({ current, tracks, fm: [] }));
  }

  async function loadPlaylistDetail() {
    const res = await getToplist();
    setToplist(res.list);
    const list = res.list.slice(0, 5);
    const playlist: UserPlaylist[] = [];
    for (const item of list) {
      const playlistDetail = await getPlaylistDetail(item.id);
      const { tracks, ...rest } = playlistDetail.playlist;
      playlist.push({ ...rest, tracks: tracks.slice(0, 5) });
    }
    setPlaylistDetail(playlist);
  }

  useEffect(() => {
    loadPlaylistDetail();
  }, []);

  return (
    <div className={getClass()}>
      <header className={getClass('header')}>官方榜</header>
      <div className={getClass('official')}>
        {playlistDetail.map(item => (
          <Official
            key={item.id}
            data={item}
            onItemClick={handleItemClick}
            onViewAll={id => push(DynamicPage.list(id))}
          />
        ))}
      </div>
      <header className={getClass('header')}>全球榜</header>
      <div className={getClass('global')}>
        {toplist.map(item => (
          <div key={item.id} className={getClass('item')}>
            <div className={getClass('img-wrapper')}>
              <Img
                className={getClass('img')}
                src={resizeImg(item.coverImgUrl)}
                icon={{ size: 'big', hoverDisplay: true }}
                onClick={() => push(DynamicPage.list(item.id))}
                onIconClick={() => dispatch(fetchAndSetCurrentTrack(item.id))}
              />
            </div>
            <div className={getClass('detail')} onClick={() => push(DynamicPage.list(item.id))}>
              {item.name}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Rank;
