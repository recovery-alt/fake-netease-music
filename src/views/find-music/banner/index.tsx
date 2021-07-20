import React from 'react';
import styles from './banner.module.less';
import { LeftOutlined, RightOutlined } from '@ant-design/icons';

const Banner: React.FC = () => (
  <div className={styles['banner']}>
    <div
      className={styles['banner__item']}
      style={{ transform: 'translateX(150px) scale(0.8)' }}
    ></div>
    <div className={styles['banner__item']}></div>
    <div
      className={styles['banner__item']}
      style={{ transform: 'translateX(-150px) scale(0.8)' }}
    ></div>
    <div className={styles['banner__dot-wrapper']}>
      <div className={`${styles['banner__dot']} ${styles['--actived']}`}></div>
      <div className={styles['banner__dot']}></div>
      <div className={styles['banner__dot']}></div>
      <div className={styles['banner__dot']}></div>
      <div className={styles['banner__dot']}></div>
    </div>
    <LeftOutlined className={`${styles['banner__array']} ${styles['--left']}`} />
    <RightOutlined className={styles['banner__array --right']} />
  </div>
);

export default Banner;
