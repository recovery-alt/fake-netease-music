import { LeftOutlined, RightOutlined } from '@ant-design/icons';
import classNames from 'classnames';
import { FC, useEffect, useState } from 'react';

import Img from '@/components/img';
import type { BannerType } from '@/types';
import { classGenerator } from '@/utils';

import styles from './banner.module.less';

type Props = {
  data: BannerType[];
  onBannerClick?: (id: number) => void;
};

let timer: number;
let syncCurrent = 0;

const Banner: FC<Props> = ({ data, onBannerClick }) => {
  const getClass = classGenerator('banner', styles);
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
    <div className={getClass()}>
      {data.map((item, i) => (
        <Img
          src={item.imageUrl}
          key={item.imageUrl}
          banLoading
          className={classNames(getClass('item'), getState(i))}
          onClick={() => onBannerClick?.(item.targetId)}
        />
      ))}
      <div className={getClass('dot-wrapper')}>
        {data.map((item, i) => (
          <div
            key={item.imageUrl}
            onMouseOver={() => handleMouseOver(i)}
            onMouseOut={autoPlay}
            className={classNames(getClass('dot'), { [styles['--active']]: i === current })}
          ></div>
        ))}
      </div>
      <LeftOutlined
        className={classNames(getClass('array'), styles['--left'])}
        onClick={() => handleArrayClick()}
      />
      <RightOutlined
        className={classNames(getClass('array'), styles['--right'])}
        onClick={() => handleArrayClick(true)}
      />
    </div>
  );
};
export default Banner;
