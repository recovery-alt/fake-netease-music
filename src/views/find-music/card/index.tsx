import React from 'react';
import styles from './card.module.less';
import type { PersonalizedType } from '@/api';

type Props = {
  data: PersonalizedType['result'];
  rect?: boolean;
};

const Card: React.FC<Props> = ({ rect = false, data }) => (
  <div className={styles.card}>
    {data.map((item, i) => (
      <div key={i} className={`${styles.card__item} ${rect ? styles['--rect'] : ''}`}>
        <img className={styles.card__box} src={item.picUrl} alt="personalized" />
        <span>{item.name}</span>
      </div>
    ))}
  </div>
);
export default Card;
