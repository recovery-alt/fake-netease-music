import React from 'react';
import styles from './show.module.less';
import Img from '@/components/img';

const Show: React.FC = () => (
  <div className={styles.show}>
    {[].map(() => (
      <div className={styles.show__item}>
        <Img src="" className={styles.show__img} />
        <div className={styles.show__description}>
          <div>演出</div>
          <div>8月12号</div>
          <div>¥122</div>
        </div>
      </div>
    ))}
  </div>
);

export default Show;
