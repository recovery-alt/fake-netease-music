import React from 'react';
import styles from './cover.module.less';
import { PlayCircleFilled } from '@ant-design/icons';
import { Music } from '@/api';

type Props = { current?: Music; next?: Music };

const Cover: React.FC<Props> = ({ current, next }) => {
  return (
    <>
      <div className={styles.cover}>
        {next?.album?.picUrl && (
          <img className={styles['cover__pre-img']} src={next?.album?.picUrl} alt="pre-cover" />
        )}
        {current?.album.picUrl && (
          <div className={styles['cover__img']}>
            <img src={current?.album?.picUrl} alt="cover" />
            <PlayCircleFilled />
          </div>
        )}
      </div>
    </>
  );
};

export default Cover;
