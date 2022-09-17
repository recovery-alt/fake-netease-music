import classNames from 'classnames';
import { FC, ReactNode } from 'react';

import Img, { IconOptions } from '@/components/img';
import { Data } from '@/types';
import { classGenerator, resizeImg } from '@/utils';

import styles from './list.module.less';

export type ListData = { id: number; name: string; imgUrl: string; extra?: Data<string> };
export type ListParams = { item: ListData; i: number; j: number; len: number };

type Props = {
  data: ListData[];
  size?: 'default' | 'medium' | 'large';
  functionChildren?: (params: ListParams) => ReactNode;
  onItemClick?: (id: number) => void;
  icon?: IconOptions | boolean;
};

const List: FC<Props> = ({ icon, data, functionChildren, size = 'default', onItemClick }) => {
  const getClass = classGenerator('list', styles);
  const len = data.length;
  const newData = [data.slice(0, len / 2), data.slice(len / 2, len)];

  return (
    <div className={getClass()}>
      {newData.map((val, i) => (
        <div key={i} className={getClass('col')}>
          {val.map((item, j) => (
            <div key={j} className={getClass('item')} onDoubleClick={() => onItemClick?.(item.id)}>
              <div className={classNames(getClass('img-wrapper'), styles[`--${size}`])}>
                <Img
                  className={getClass('img')}
                  src={resizeImg(item.imgUrl)}
                  icon={icon}
                  onClick={() => onItemClick?.(item.id)}
                />
              </div>
              {functionChildren?.({ item, i, j, len })}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default List;
