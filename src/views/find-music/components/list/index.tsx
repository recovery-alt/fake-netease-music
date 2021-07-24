import React from 'react';
import styles from './list.module.less';
import { PlayCircleFilled } from '@ant-design/icons';
import type { AlbumNewest, DJToplist } from '@/api';

type Props = {
  size?: 'small' | 'large';
  data: AlbumNewest['albums'] | DJToplist['toplist'];
};

const List: React.FC<Props> = ({ data, size = 'small' }) => {
  const len = data.length;
  const newData = [data.slice(0, len / 2), data.slice(len / 2, len)];

  return (
    <div className={styles.list}>
      {newData.map((val, i) => (
        <div key={i} className={styles.list__col}>
          {val.map((item, j) => (
            <div key={j} className={styles.list__item}>
              <div className={styles[`--${size}`] + ' ' + styles.list__img}>
                <img src={item.picUrl} alt="music" />
                {size === 'small' && <PlayCircleFilled />}
              </div>
              {size === 'small' && <strong>{(i * len) / 2 + j + 1}</strong>}
              <div className={styles.list__name}>
                <div>{item.name}</div>
                {size === 'small' ? (
                  <div>{(item as AlbumNewest['albums'][number]).artist.name}</div>
                ) : (
                  <div style={{ color: '#939494' }}>
                    {(item as DJToplist['toplist'][number]).rcmdtext}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default List;
