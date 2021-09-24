import React from 'react';
import styles from './list.module.less';
import Img from '@/components/img';
import { classGenerator } from '@/utils';

export type ListData = { id: number; imgUrl: string; col2: string; col3?: string; col4?: string };

type Props = { data: ListData[]; onItemClick?: (id: number) => void };

const List: React.FC<Props> = ({ data, onItemClick }) => {
  const getClass = classGenerator('list', styles);
  return (
    <section className={getClass()}>
      {data.map(item => (
        <div key={item.id} className={getClass('item')} onClick={() => onItemClick?.(item.id)}>
          <div className={getClass('left')}>
            <Img className={getClass('img')} src={item.imgUrl} />
            <span>{item.col2}</span>
          </div>
          <div className={getClass('right')}>
            {item.col3 && <div className={getClass('author')}>{item.col3}</div>}
            {item.col4 && <div className={getClass('section')}>{item.col4}</div>}
          </div>
        </div>
      ))}
    </section>
  );
};

export default List;
