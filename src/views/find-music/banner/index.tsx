import React, { useState } from 'react';
import styles from './banner.module.less';
import { LeftOutlined, RightOutlined } from '@ant-design/icons';
import type { Banners } from '@/api';

type Props = {
  data: Banners['banners'];
};

const Banner: React.FC<Props> = ({ data }) => {
  const [current, setCurrent] = useState<number>(0);

  const getPosition = (index: number) => {
    return index === current - 1
      ? styles['--left']
      : index === (current + 1) % data.length
      ? styles['--right']
      : index === current
      ? ''
      : styles['--hidden'];
  };

  return (
    <div className={styles.banner}>
      {data.map((item, i) => (
        <img
          src={item.imageUrl}
          key={item.imageUrl}
          alt="banner"
          className={`${styles.banner__item} ${getPosition(i)}`}
        />
      ))}
      <div className={styles['banner__dot-wrapper']}>
        {data.map((item, i) => (
          <div
            key={item.imageUrl}
            onClick={() => setCurrent(i)}
            className={`${styles['banner__dot']} ${i === current ? styles['--actived'] : ''}`}
          ></div>
        ))}
      </div>
      <LeftOutlined className={`${styles['banner__array']} ${styles['--left']}`} />
      <RightOutlined className={`${styles['banner__array']} ${styles['--right']}`} />
    </div>
  );
};
export default Banner;
