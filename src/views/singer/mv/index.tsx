import React from 'react';
import styles from './mv.module.less';
import Img from '@/components/img';

const MV: React.FC = () => (
  <div className={styles.mv}>
    {Array(31)
      .fill(0)
      .map((item, i) => (
        <div key={i} className={styles.mv__item}>
          <Img src="" className={styles.mv__img} />
          <div className={styles.mv__description}>不爱我</div>
        </div>
      ))}
  </div>
);

export default MV;
