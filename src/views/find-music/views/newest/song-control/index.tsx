import { FileAddOutlined, PlayCircleOutlined } from '@ant-design/icons';
import { FC } from 'react';

import { classGenerator } from '@/utils';

import styles from './song-control.module.less';

type Props = { onPlayAll: () => void; onCollectAll: () => void };

const SongControl: FC<Props> = ({ onPlayAll, onCollectAll }) => {
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
