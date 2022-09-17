import { FC } from 'react';

import Img from '@/components/img';
import { Track, UserPlaylist } from '@/types';
import { classGenerator, resizeImg } from '@/utils';

import styles from './official.module.less';

type Props = {
  data: UserPlaylist;
  onItemClick: (tracks: Track[], index: number) => void;
  onViewAll: (id: number) => void;
};

const Official: FC<Props> = ({ data, onItemClick, onViewAll }) => {
  const getClass = classGenerator('official', styles);

  return (
    <div className={getClass()}>
      <div className={getClass('left')}>
        <Img
          className={getClass('img')}
          src={resizeImg(data.coverImgUrl)}
          icon={{ size: 'big', hoverDisplay: true }}
          onClick={() => onItemClick(data.tracks, 0)}
          onIconClick={() => onItemClick(data.tracks, 0)}
        />
      </div>
      <div className={getClass('right')}>
        <ul>
          {data.tracks.map((item, i) => (
            <li
              key={item.id}
              className={getClass('item')}
              onClick={() => onItemClick(data.tracks, i)}
            >
              <div className={getClass('item-left')}>
                <strong>{i + 1}</strong>
                <div>
                  <span>-</span>
                </div>
                <span>{item.name}</span>
              </div>
              <div className={getClass('item-right')}>
                {item.ar.reduce((acc, val) => `${acc}/${val.name}`, '').slice(1)}
              </div>
            </li>
          ))}
        </ul>
        <div className={getClass('all')} onClick={() => onViewAll(data.id)}>
          查看全部 &gt;
        </div>
      </div>
    </div>
  );
};

export default Official;
