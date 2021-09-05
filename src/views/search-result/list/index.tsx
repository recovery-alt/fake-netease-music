import React from 'react';
import styles from './list.module.less';
import Img from '@/components/img';
import classNames from 'classnames';
import { resizeImg } from '@/utils';

export type ListItem = { imgUrl: string; name: string; col2?: string; col3?: string };

type Props = {
  imgType?: 'circle' | 'extra' | 'normal';
  data: Array<ListItem>;
};

const List: React.FC<Props> = ({ imgType = 'normal', data }) => (
  <div className={styles.list}>
    {data.map((item, i) => (
      <div className={styles.list__item} key={i}>
        <div className={classNames(styles['list__img-wrapper'], styles[`--${imgType}`])}>
          <Img src={resizeImg(item.imgUrl, 100)} className={styles.list__img} />
        </div>
        <div className={styles.list__name}>{item.name}</div>
        <div className={styles.list__col2}>{item.col2}</div>
        <div className={styles.list__col3}>{item.col3}</div>
      </div>
    ))}
  </div>
);

export default List;
