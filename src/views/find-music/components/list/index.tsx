import React, { ReactNode } from 'react';
import styles from './list.module.less';
import { PlayCircleFilled } from '@ant-design/icons';
import { Data } from '@/types';
import Img from '@/components/img';
import classNames from 'classnames';

export type ListData = { name: string; imgUrl: string; extra?: Data<string> };
export type ListParams = { item: ListData; i: number; j: number; len: number };

type Props = {
  data: ListData[];
  size?: 'default' | 'medium' | 'large';
  functionChildren?: (params: ListParams) => ReactNode;
};

const List: React.FC<Props> = ({ data, functionChildren, size = 'default' }) => {
  const len = data.length;
  const newData = [data.slice(0, len / 2), data.slice(len / 2, len)];

  return (
    <div className={styles.list}>
      {newData.map((val, i) => (
        <div key={i} className={styles.list__col}>
          {val.map((item, j) => (
            <div key={j} className={styles.list__item}>
              <div className={classNames(styles['list__img-wrapper'], styles[`--${size}`])}>
                <Img className={styles.list__img} src={item.imgUrl} />
                <PlayCircleFilled />
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
