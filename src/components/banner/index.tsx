import React, { useEffect, useState } from 'react';
import styles from './banner.module.less';
import { LeftOutlined, RightOutlined } from '@ant-design/icons';
import type { BannerType } from '@/types';
import classNames from 'classnames';
import Img from '@/components/img';

type Props = {
  data: BannerType[];
  onBannerClick?: (id: number) => void;
};

let timer: number;
let syncCurrent = 0;

const Banner: React.FC<Props> = ({ data, onBannerClick }) => {
  const [current, setCurrent] = useState<number>(0);

  async function handleArrayClick(plus = false) {
    const len = data.length;
    const cur = plus ? syncCurrent + 1 : syncCurrent - 1;
    syncCurrent = cur < 0 ? cur + len : cur % len;
    setCurrent(syncCurrent);
  }

  function getState(index: number) {
    const len = data.length;
    return index === current - 1 || (current === 0 && index === len - 1)
      ? styles['--left']
      : index === (current + 1) % len
      ? styles['--right']
      : index === current
      ? ''
      : styles['--hidden'];
  }

  function autoPlay() {
    requestAnimationFrame(() => {
      timer = setInterval(() => {
        handleArrayClick(true);
      }, 5000);
    });
  }

  function handleMouseOver(index: number) {
    clearInterval(timer);
    syncCurrent = index;
    setCurrent(syncCurrent);
  }

  useEffect(() => {
    if (data.length === 0) return;
    autoPlay();

    return () => {
      clearInterval(timer);
    };
  }, [data]);

  return (
    <div className={styles.banner}>
      {data.map((item, i) => (
        <Img
          src={item.imageUrl}
          key={item.imageUrl}
          banLoading
          className={classNames(styles.banner__item, getState(i))}
          onClick={() => onBannerClick?.(item.targetId)}
        />
      ))}
      <div className={styles['banner__dot-wrapper']}>
        {data.map((item, i) => (
          <div
            key={item.imageUrl}
            onMouseOver={() => handleMouseOver(i)}
            onMouseOut={autoPlay}
            className={classNames(styles.banner__dot, { [styles['--active']]: i === current })}
          ></div>
        ))}
      </div>
      <LeftOutlined
        className={classNames(styles.banner__array, styles['--left'])}
        onClick={() => handleArrayClick()}
      />
      <RightOutlined
        className={classNames(styles.banner__array, styles['--right'])}
        onClick={() => handleArrayClick(true)}
      />
    </div>
  );
};
export default Banner;
