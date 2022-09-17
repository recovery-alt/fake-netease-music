import { FC } from 'react';

import Img from '@/components/img';
import { classGenerator } from '@/utils';

import styles from './list.module.less';

export type ListItem = { id: number | string; imgUrl: string; description: string; author: string };

type Props = { data: ListItem[]; onItemClick?: (id: number | string) => void };

const List: FC<Props> = ({ data, onItemClick }) => {
  const getClass = classGenerator('list', styles);
  return (
    <section className={getClass()}>
      {data.map(item => (
        <div key={item.id} className={getClass('item')} onClick={() => onItemClick?.(item.id)}>
          <div className={getClass('img-wrapper')}>
            <Img
              className={getClass('img')}
              src={item.imgUrl}
              icon={{ size: 'big', hoverDisplay: true }}
            />
          </div>
          <div className={getClass('description')}>
            <h3>{item.description}</h3>
            <h4>by {item.author}</h4>
          </div>
        </div>
      ))}
    </section>
  );
};

export default List;
