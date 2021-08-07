import React, { CSSProperties } from 'react';
import styles from './card.module.less';

export type CardData = { name: string; imgUrl: string };

type Props = {
  data: CardData[];
  width?: number;
  height?: number;
  style?: CSSProperties;
};

const Card: React.FC<Props> = ({ width = 135, height = 135, data, style }) => (
  <div className={styles.card}>
    {data.map((item, i) => (
      <div key={i} className={styles.card__item} style={{ ...style, width: `${width / 10}vw` }}>
        <img
          className={styles.card__box}
          style={{ height: `${height / 10}vw` }}
          src={item.imgUrl}
          alt="card-img"
        />
        <p>{item.name}</p>
      </div>
    ))}
  </div>
);
export default Card;
