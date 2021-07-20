import React from 'react';
import styles from './card.module.less';

type Props = {
  data: Array<any>;
  rect?: boolean;
};

const Card: React.FC<Props> = ({ rect = false, data }) => (
  <div className={styles.card}>
    {data.map((item, i) => (
      <div key={i} className={`${styles.card__item} ${rect ? styles['--rect'] : ''}`}>
        <div className={styles.card__box}></div>
        <span>一段描述信息</span>
      </div>
    ))}
  </div>
);
export default Card;
