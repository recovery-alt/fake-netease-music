import React from 'react';
import { PlayCircleOutlined, FileAddOutlined } from '@ant-design/icons';
import styles from './song-control.module.less';

const SongControl: React.FC = () => {
  const songList = [
    { name: '播放全部', icon: PlayCircleOutlined },
    { name: '收藏全部', icon: FileAddOutlined },
  ];

  return (
    <div className={styles['song-control']}>
      {songList.map(item => (
        <div key={item.name} className={styles['song-control__item']}>
          <item.icon />
          {item.name}
        </div>
      ))}
    </div>
  );
};

export default SongControl;
