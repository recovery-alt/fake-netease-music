import './newest.less';

import classNames from 'classnames';
import { FC, useEffect, useMemo, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory, useLocation } from 'react-router-dom';

import { categoryList } from '@/config';
import { DynamicPage } from '@/router';
import { AppDispatch, setCurrentTrack } from '@/store';
import { AlbumCategory, Song } from '@/types';
import { classGenerator, transformSong2Track } from '@/utils';

import AlbumControl from './album-control';
import AlbumList from './album-list';
import SongControl from './song-control';
import SongList from './song-list';

const Newest: FC = () => {
  const getClass = classGenerator('newest');
  const [isAlbum, setIsAlbum] = useState(0);
  const [areaIndex, setAreaIndex] = useState(0);
  const currentArea = useMemo(() => categoryList[areaIndex], [areaIndex]);
  const { push } = useHistory();
  const { pathname } = useLocation();
  const dispatch = useDispatch<AppDispatch>();
  const songs = useRef<Song[]>([]);
  const [albumType, setAlbumType] = useState<AlbumCategory>('hot');

  const switchItems = [
    { path: DynamicPage.findMusicNewest(''), label: '新歌速递' },
    { path: DynamicPage.findMusicNewest('album'), label: '新碟上架' },
  ];

  function handleCollectAll() {
    // TODO: 收藏全部
  }

  function handlePlayAll() {
    if (!songs?.current) return;
    const tracks = songs.current.map(transformSong2Track);
    const currentTrack = { tracks, current: 0, fm: [] };
    dispatch(setCurrentTrack(currentTrack));
  }

  useEffect(() => {
    const index = switchItems.findIndex(item => item.path === pathname);
    if (index > -1) setIsAlbum(index);
  }, [pathname]);

  return (
    <div className={getClass()}>
      <header className={getClass('switch')}>
        {switchItems.map((item, i) => (
          <div
            key={i}
            className={classNames('newest__switch-item', { ['--active']: isAlbum === i })}
            onClick={() => {
              push(item.path);
              setIsAlbum(i);
            }}
          >
            {item.label}
          </div>
        ))}
      </header>
      <div className={getClass('control')}>
        <div>
          {categoryList.slice(0, -1).map((item, i) => (
            <span
              key={item.area}
              className={classNames('newest__category', { ['--active']: areaIndex === i })}
              onClick={() => setAreaIndex(i)}
            >
              {item.name}
            </span>
          ))}
        </div>
        {isAlbum ? (
          <AlbumControl {...{ albumType, setAlbumType }} />
        ) : (
          <SongControl onCollectAll={handleCollectAll} onPlayAll={handlePlayAll} />
        )}
      </div>
      {isAlbum ? (
        <AlbumList type={albumType} area={currentArea.albumArea} />
      ) : (
        <SongList ref={songs} type={currentArea.type} />
      )}
    </div>
  );
};

export default Newest;
