import React from 'react';
import styles from './official.module.less';
import { UserPlaylist, Track } from '@/types';
import Img from '@/components/img';
import { resizeImg } from '@/utils';

type Props = {
  data: UserPlaylist;
  onItemClick: (tracks: Track[], index: number) => void;
  onViewAll: (id: number) => void;
};

const Official: React.FC<Props> = ({ data, onItemClick, onViewAll }) => {
  return (
    <div className={styles.official}>
      <div className={styles.official__left}>
        <Img
          className={styles.official__img}
          src={resizeImg(data.coverImgUrl)}
          icon={{ size: 'big', hoverDisplay: true }}
          onClick={() => onItemClick(data.tracks, 0)}
          onIconClick={() => onItemClick(data.tracks, 0)}
        />
      </div>
      <div className={styles.official__right}>
        <ul>
          {data.tracks.map((item, i) => (
            <li
              key={item.id}
              className={styles.official__item}
              onClick={() => onItemClick(data.tracks, i)}
            >
              <div className={styles['official__item-left']}>
                <strong>{i + 1}</strong>
                <div>
                  <span>-</span>
                </div>
                <span>{item.name}</span>
              </div>
              <div className={styles['official__item-right']}>
                {item.ar.reduce((acc, val) => `${acc}/${val.name}`, '').slice(1)}
              </div>
            </li>
          ))}
        </ul>
        <div className={styles.official__all} onClick={() => onViewAll(data.id)}>
          查看全部 &gt;
        </div>
      </div>
    </div>
  );
};

export default Official;
