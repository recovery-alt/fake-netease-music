import React, { useMemo } from 'react';
import styles from './card.module.less';
import Img, { IconOptions } from '@/components/img';
import classNames from 'classnames';
import { resizeImg } from '@/utils';

export type CardData = { id: number; name: string; imgUrl: string };

type Props = {
  data: CardData[];
  type?: 'square' | 'rectangle';
  icon?: IconOptions;
  onItemClick?: (id: number) => void;
};

const Card: React.FC<Props> = ({ type = 'square', data, icon, onItemClick }) => {
  return (
    <div className={styles.card}>
      {data.map(item => (
        <div key={item.id} className={classNames(styles.card__item, styles[`--${type}`])}>
          <Img
            className={styles.card__img}
            src={type === 'rectangle' ? item.imgUrl : resizeImg(item.imgUrl)}
            icon={icon}
            onClick={() => onItemClick?.(item.id)}
          />
          <p>{item.name}</p>
        </div>
      ))}
    </div>
  );
};
export default Card;
