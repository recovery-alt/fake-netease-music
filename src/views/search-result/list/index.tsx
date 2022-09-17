import classNames from 'classnames';
import { FC } from 'react';

import Img from '@/components/img';
import { classGenerator, resizeImg } from '@/utils';

import styles from './list.module.less';

export type ListItem = { id: number; imgUrl: string; name: string; col2?: string; col3?: string };

type Props = {
  imgType?: 'circle' | 'extra' | 'normal';
  data: Array<ListItem>;
  onItemClick?: (item: ListItem) => void;
};

const List: FC<Props> = ({ imgType = 'normal', data, onItemClick }) => {
  const getClass = classGenerator('list', styles);

  return (
    <div className={getClass()}>
      {data.map((item, i) => (
        <div className={getClass('item')} key={i}>
          <div className={classNames(getClass('img-wrapper'), styles[`--${imgType}`])}>
            <Img
              src={resizeImg(item.imgUrl, 100)}
              className={getClass('img')}
              onClick={() => onItemClick?.(item)}
            />
          </div>
          <div className={getClass('name')} onClick={() => onItemClick?.(item)}>
            {item.name}
          </div>
          <div className={getClass('col2')}>{item.col2}</div>
          <div className={getClass('col3')}>{item.col3}</div>
        </div>
      ))}
    </div>
  );
};

export default List;
