import React from 'react';
import styles from './cover.module.less';
import { PlayCircleFilled } from '@ant-design/icons';
import { Music } from '@/api';

type Props = { musicList: Array<Music> };

const Cover: React.FC<Props> = ({ musicList }) => {
  return (
    <>
      <div className={styles.cover}>
        {musicList[1]?.album?.picUrl && (
          <img
            className={styles['cover__pre-img']}
            src={musicList[1]?.album?.picUrl}
            alt="pre-cover"
          />
        )}
        {musicList[0]?.album?.picUrl && (
          <div className={styles['cover__img']}>
            <img src={musicList[0]?.album?.picUrl} alt="cover" />
            <PlayCircleFilled />
          </div>
        )}
      </div>
    </>
  );
};

export default Cover;
