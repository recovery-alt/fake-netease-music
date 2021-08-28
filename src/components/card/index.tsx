import React from 'react';
import styles from './card.module.less';
import Img from '@/components/img';
import classNames from 'classnames';

export type CardData = { id: number; name: string; imgUrl: string };

type Props = {
  data: CardData[];
  type?: 'square' | 'rectangle';
};

const Card: React.FC<Props> = ({ type = 'square', data }) => (
  <div className={styles.card}>
    {data.map(item => (
      <div key={item.id} className={classNames(styles.card__item, styles[`--${type}`])}>
        <Img className={styles.card__img} src={item.imgUrl} />
        <p>{item.name}</p>
      </div>
    ))}
  </div>
);
export default Card;
