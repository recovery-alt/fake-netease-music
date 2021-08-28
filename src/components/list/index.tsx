import React from 'react';
import styles from './list.module.less';
import Img from '@/components/img';

export type ListData = { id: number; imgUrl: string; col2: string; col3?: string; col4?: string };

type Props = { data: ListData[] };

const List: React.FC<Props> = ({ data }) => {
  return (
    <section className={styles.list}>
      {data.map(item => (
        <div key={item.id} className={styles.list__item}>
          <div className={styles.list__left}>
            <Img className={styles.list__img} src={item.imgUrl} />
            <span>{item.col2}</span>
          </div>
          <div className={styles.list__right}>
            {item.col3 && <div className={styles.list__author}>{item.col3}</div>}
            {item.col4 && <div className={styles.list__section}>{item.col4}</div>}
          </div>
        </div>
      ))}
    </section>
  );
};

export default List;
