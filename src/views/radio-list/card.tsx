import { LikeOutlined, PlayCircleOutlined } from '@ant-design/icons';
import dayjs from 'dayjs';
import { FC } from 'react';

import Img from '@/components/img';
import { DJProgram } from '@/types';
import { classGenerator, formatMS, resizeImg } from '@/utils';

type CardItem = Pick<
  DJProgram,
  | 'id'
  | 'serialNum'
  | 'coverUrl'
  | 'mainSong'
  | 'name'
  | 'trackCount'
  | 'likedCount'
  | 'createTime'
  | 'duration'
>;

type Props = { item: CardItem; onItemClick?: (id: number) => void };

const Card: FC<Props> = ({ item, onItemClick }) => {
  const getClass = classGenerator('radio-list');

  return (
    <div className={getClass('item')}>
      <div className={getClass('ordinal')}>{item.serialNum}</div>
      <Img
        className={getClass('cover')}
        icon={{ hoverDisplay: true }}
        src={resizeImg(item.coverUrl, 60)}
        onClick={() => onItemClick?.(item.mainSong.id)}
        onIconClick={() => onItemClick?.(item.mainSong.id)}
      />
      <div className={getClass('name')}>{item.name}</div>
      <div className={getClass('play-count')}>
        <PlayCircleOutlined /> {item.trackCount}
      </div>
      <div className={getClass('like-count')}>
        <LikeOutlined /> {item.likedCount}
      </div>
      <div className={getClass('date')}>{dayjs(item.createTime).format('YYYY-MM-DD')}</div>
      <div className={getClass('duration')}>{formatMS(item.duration)}</div>
    </div>
  );
};

export default Card;
