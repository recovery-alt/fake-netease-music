import React from 'react';
import styles from './similar.module.less';
import Img from '@/components/img';

const Similar: React.FC = () => (
  <div className={styles.similar}>
    {Array(30)
      .fill(0)
      .map((item, i) => (
        <div key={i} className={styles.similar__item}>
          <Img src="" className={styles.similar__img} />
          <div className={styles.similar__description}>林俊杰</div>
        </div>
      ))}
  </div>
);

export default Similar;
