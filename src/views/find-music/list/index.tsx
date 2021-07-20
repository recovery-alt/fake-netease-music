import React from 'react';
import styles from './list.module.less';
import avatar from '@/assets/img/avatar.svg';
import { PlayCircleFilled } from '@ant-design/icons';

type Props = {
  data: [Array<any>, Array<any>];
};

const List: React.FC<Props> = ({ data }) => (
  <div className={styles.list}>
    {data.map((item, i) => (
      <div key={i} className={styles.list__col}>
        {data[i].map((item, j) => (
          <div key={j} className={`${styles.list__item} ${j === 2 ? styles['--actived'] : ''}`}>
            <div className={styles.list__img}>
              <img src={avatar} alt="music" />
              <PlayCircleFilled />
            </div>
            <strong>{j + 1}</strong>
            <div className={styles.list__name}>
              <div>变废为宝</div>
              <div>薛之谦</div>
            </div>
          </div>
        ))}
      </div>
    ))}
  </div>
);
export default List;
