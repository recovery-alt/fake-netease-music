import React from 'react';
import styles from './list.module.less';
import Img from '@/components/img';

export type ListItem = { id: number | string; imgUrl: string; description: string; author: string };

type Props = { data: ListItem[] };

const List: React.FC<Props> = ({ data }) => {
  return (
    <section className={styles.list}>
      {data.map(item => (
        <div key={item.id} className={styles.list__item}>
          <div className={styles['list__img-wrapper']}>
            <Img className={styles.list__img} src={item.imgUrl} />
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
