import React from 'react';
import styles from './cover.module.less';
import img from '@/assets/img/avatar.svg';
import { PlayCircleFilled } from '@ant-design/icons';

const Cover: React.FC = () => (
  <>
    <div className={styles.cover}>
      <img className={styles['cover__pre-img']} src={img} alt="pre-cover" />
      <div className={styles['cover__img']}>
        <img src={img} alt="cover" />
        <PlayCircleFilled />
      </div>
    </div>
  </>
);

export default Cover;
