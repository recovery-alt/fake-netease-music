import React from 'react';
import styles from './list.module.less';

export type ListItem = { imgUrl: string; description: string; author: string };

type Props = { data: ListItem[] };

const List: React.FC<Props> = ({ data }) => {
  return (
    <section className={styles.list}>
      {data.map((item, i) => (
        <div key={i} className={styles.list__item}>
          <div className={styles.list__img}>
            <img src={item.imgUrl} alt="cover" />
          </div>
          <div className={styles.list__description}>
            <h3>{item.description}</h3>
            <h4>by {item.author}</h4>
          </div>
        </div>
      ))}
    </section>
  );
};

export default List;
