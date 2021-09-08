import React from 'react';
import styles from './show.module.less';
import Img from '@/components/img';

const Show: React.FC = () => (
  <div className={styles.show}>
    {Array(10)
      .fill(0)
      .map((item, i) => (
        <div key={i} className={styles.show__item}>
          <Img src="" className={styles.show__img} />
          <div className={styles.show__description}>
            <div>会不会演出</div>
            <div>8月12号</div>
            <div>¥122</div>
          </div>
        </div>
      ))}
  </div>
);

export default Show;
