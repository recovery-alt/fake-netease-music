import React from 'react';
import styles from './list.module.less';

export type ListData = { imgUrl: string; col2: string; col3?: string; col4?: string };

type Props = { data: ListData[] };

const List: React.FC<Props> = ({ data }) => {
  return (
    <section className={styles.list}>
      {data.map((item, i) => (
        <div key={i} className={styles.list__item}>
          <div className={styles.list__left}>
            <img src={item.imgUrl} alt="cover" />
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
