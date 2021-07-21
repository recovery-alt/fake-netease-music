import React from 'react';
import styles from './list.module.less';
import { PlayCircleFilled } from '@ant-design/icons';
import type { AlbumNewest } from '@/api';

type Props = {
  data: AlbumNewest['albums'];
};

const List: React.FC<Props> = ({ data }) => {
  const len = data.length;
  const newData = [data.slice(0, len / 2), data.slice(len / 2, len)];
  return (
    <div className={styles.list}>
      {newData.map((val, i) => (
        <div key={i} className={styles.list__col}>
          {val.map((item, j) => (
            <div key={j} className={`${styles.list__item} ${j === 2 ? styles['--actived'] : ''}`}>
              <div className={styles.list__img}>
                <img src={item.picUrl} alt="music" />
                <PlayCircleFilled />
              </div>
              <strong>{(i * len) / 2 + j + 1}</strong>
              <div className={styles.list__name}>
                <div>{item.name}</div>
                <div>{item.artist.name}</div>
              </div>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default List;
