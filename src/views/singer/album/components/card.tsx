import React from 'react';
import styles from '../album.module.less';
import Img from '@/components/img';

const Card: React.FC = () => {
  return (
    <div className={styles.card}>
      {Array(31)
        .fill(0)
        .map((item, i) => (
          <div className={styles.card__item}>
            <Img src="" className={styles.card__img} />
            <div className={styles.card__description}>
              <div className={styles.card__title}>变废为宝</div>
              <div className={styles.card__subtitle}>2021-12-31</div>
            </div>
          </div>
        ))}
    </div>
  );
};

export default Card;
