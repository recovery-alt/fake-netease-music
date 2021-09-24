import React from 'react';
import styles from './card.module.less';
import Img, { IconOptions } from '@/components/img';
import classNames from 'classnames';
import { classGenerator, resizeImg } from '@/utils';

export type CardData = { id: number; name: string; imgUrl: string };

type Props = {
  data: CardData[];
  type?: 'square' | 'rectangle';
  icon?: IconOptions;
  onItemClick?: (id: number) => void;
  onItemIconClick?: (id: number) => void;
};

const Card: React.FC<Props> = ({ type = 'square', data, icon, onItemClick, onItemIconClick }) => {
  const getClass = classGenerator('card', styles);
  return (
    <div className={getClass()}>
      {data.map(item => (
        <div key={item.id} className={classNames(getClass('item'), styles[`--${type}`])}>
          <Img
            className={getClass('img')}
            src={type === 'rectangle' ? item.imgUrl : resizeImg(item.imgUrl)}
            icon={icon}
            onClick={() => onItemClick?.(item.id)}
            onIconClick={() => onItemIconClick?.(item.id)}
          />
          <p>{item.name}</p>
        </div>
      ))}
    </div>
  );
};
export default Card;
