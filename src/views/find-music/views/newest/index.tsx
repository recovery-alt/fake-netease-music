import React, { useState, useEffect, useMemo } from 'react';
import './newest.less';
import classNames from 'classnames';
import { categoryList } from '@/config';
import { PlayCircleOutlined, FileAddOutlined } from '@ant-design/icons';
import SongList from './components/song-list';
import AlbumList from './components/album-list';
import { getTopSong, Song } from '@/api';
import { AlbumType } from '@/types';

const Newest: React.FC = () => {
  const [isAlbum, setIsAlbum] = useState(0);
  const [areaIndex, setAreaIndex] = useState(0);
  const [songs, setSongs] = useState<Song[]>([]);
  const [albumType, setAlbumType] = useState<AlbumType>('hot');
  const songList = [
    { name: '播放全部', icon: PlayCircleOutlined },
    { name: '收藏全部', icon: FileAddOutlined },
  ];
  const albumOptions: { text: string; type: AlbumType }[] = [
    { text: '推荐', type: 'hot' },
    { text: '全部', type: 'new' },
  ];

  const currentArea = useMemo(() => categoryList[areaIndex], [areaIndex]);

  useEffect(() => {
    (async () => {
      const res = await getTopSong(currentArea.type);
      setSongs(res.data);
    })();
  }, [areaIndex]);

  const SongControl = (
    <div className="newest__song-wrapper">
      {songList.map(item => (
        <div key={item.name} className="newest__song">
          <item.icon />
          {item.name}
        </div>
      ))}
    </div>
  );

  const AlbumControl = (
    <div className="newest__album-wrapper">
      {albumOptions.map(item => (
        <div key={item.text} className="newest__album">
          <span
            className={classNames({ ['--active']: albumType === item.type })}
            onClick={() => setAlbumType(item.type)}
          >
            {item.text}
          </span>
        </div>
      ))}
    </div>
  );

  return (
    <div className="newest">
      <header className="newest__switch">
        {['新歌速递', '新碟上架'].map((item, i) => (
          <div
            key={item}
            className={classNames('newest__switch-item', { ['--active']: isAlbum === i })}
            onClick={() => setIsAlbum(i)}
          >
            {item}
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
        {isAlbum ? AlbumControl : SongControl}
      </div>
      {isAlbum ? <AlbumList /> : <SongList data={songs} />}
    </div>
  );
};

export default Newest;
