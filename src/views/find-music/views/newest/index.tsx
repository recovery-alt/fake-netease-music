import React, { useState, useEffect } from 'react';
import './newest.less';
import classNames from 'classnames';
import { categoryList } from '@/config';
import { PlayCircleOutlined, FileAddOutlined } from '@ant-design/icons';
import List from './components/list';
import { getTopSong, Song } from '@/api';

const Newest: React.FC = () => {
  const [isAlbum, setIsAlbum] = useState(0);
  const [type, setType] = useState(0);
  const [songs, setSongs] = useState<Song[]>([]);
  const playList = [
    { name: '播放全部', icon: PlayCircleOutlined },
    { name: '收藏全部', icon: FileAddOutlined },
  ];

  useEffect(() => {
    (async () => {
      const res = await getTopSong(type);
      setSongs(res.data);
    })();
  }, [type]);

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
          {categoryList.slice(0, -1).map(item => (
            <span
              key={item.area}
              className={classNames('newest__category', { ['--active']: type === item.type })}
            >
              {item.name}
            </span>
          ))}
        </div>
        <div className="newest__play-wrapper">
          {playList.map(item => (
            <div key={item.name} className="newest__play">
              <item.icon />
              {item.name}
            </div>
          ))}
        </div>
      </div>
      <List data={songs} />
    </div>
  );
};

export default Newest;
