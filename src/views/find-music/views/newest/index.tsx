import React, { useState, useEffect, useMemo, useRef } from 'react';
import './newest.less';
import classNames from 'classnames';
import { categoryList } from '@/config';
import SongList from './song-list';
import AlbumList from './album-list';
import SongControl from './song-control';
import AlbumControl from './album-control';
import { AlbumType, Song } from '@/types';
import { useHistory, useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setCurrentTrack } from '@/store';
import { transformSong2Track } from '@/utils';

const Newest: React.FC = () => {
  const [isAlbum, setIsAlbum] = useState(0);
  const [areaIndex, setAreaIndex] = useState(0);
  const currentArea = useMemo(() => categoryList[areaIndex], [areaIndex]);
  const { push } = useHistory();
  const { pathname } = useLocation();
  const dispatch = useDispatch();
  const songs = useRef<Song[]>([]);
  const [albumType, setAlbumType] = useState<AlbumType>('hot');

  const switchItems = [
    { path: '/find-music/newest', label: '新歌速递' },
    { path: '/find-music/newest/album', label: '新碟上架' },
  ];

  function handleCollectAll() {
    // TODO
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
    <div className="newest">
      <header className="newest__switch">
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
      <div className="newest__control">
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
