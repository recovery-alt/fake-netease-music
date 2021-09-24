import React from 'react';
import { PlayCircleOutlined, FileAddOutlined } from '@ant-design/icons';
import styles from './song-control.module.less';
import { classGenerator } from '@/utils';

type Props = { onPlayAll: () => void; onCollectAll: () => void };

const SongControl: React.FC<Props> = ({ onPlayAll, onCollectAll }) => {
  const getClass = classGenerator('song-control', styles);
  const songList = [
    { name: '播放全部', icon: PlayCircleOutlined },
    { name: '收藏全部', icon: FileAddOutlined },
  ];

  function handleClick(index: number) {
    index === 0 ? onPlayAll() : onCollectAll();
  }

  return (
    <div className={getClass()}>
      {songList.map((item, i) => (
        <div key={item.name} className={getClass('item')} onClick={() => handleClick(i)}>
          <item.icon />
          {item.name}
        </div>
      ))}
    </div>
  );
};

export default SongControl;
