import React from 'react';
import styles from './cover.module.less';
import { PlayCircleFilled } from '@ant-design/icons';
import { Music } from '@/api';
import music from '@/assets/img/music.svg';

type Props = { musicList: Array<Music> };

const Cover: React.FC<Props> = ({ musicList }) => {
  return (
    <>
      <div className={styles.cover}>
        <img
          className={styles['cover__pre-img']}
          src={musicList[1]?.album?.picUrl || music}
          alt="pre-cover"
        />
        <div className={styles['cover__img']}>
          <img src={musicList[0]?.album?.picUrl || music} alt="cover" />
          <PlayCircleFilled />
        </div>
      </div>
    </>
  );
};

export default Cover;
