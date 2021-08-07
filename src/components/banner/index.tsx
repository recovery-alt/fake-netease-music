import React, { useState } from 'react';
import styles from './banner.module.less';
import { LeftOutlined, RightOutlined } from '@ant-design/icons';
import type { BannerType } from '@/api';

type Props = {
  data: BannerType[];
};

const Banner: React.FC<Props> = ({ data }) => {
  const [current, setCurrent] = useState<number>(0);
  const len = data.length;

  const handleArrayClick = (plus = false) => {
    const cur = plus ? current + 1 : current - 1;
    setCurrent(cur < 0 ? cur + len : cur % len);
  };

  const getState = (index: number) => {
    return index === current - 1 || (current === 0 && index === len - 1)
      ? styles['--left']
      : index === (current + 1) % len
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
          className={`${styles.banner__item} ${getState(i)}`}
        />
      ))}
      <div className={styles['banner__dot-wrapper']}>
        {data.map((item, i) => (
          <div
            key={item.imageUrl}
            onMouseMove={() => setCurrent(i)}
            className={`${styles['banner__dot']} ${i === current ? styles['--actived'] : ''}`}
          ></div>
        ))}
      </div>
      <LeftOutlined
        className={`${styles['banner__array']} ${styles['--left']}`}
        onClick={() => handleArrayClick()}
      />
      <RightOutlined
        className={`${styles['banner__array']} ${styles['--right']}`}
        onClick={() => handleArrayClick(true)}
      />
    </div>
  );
};
export default Banner;
