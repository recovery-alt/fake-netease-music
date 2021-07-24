import React from 'react';
import styles from './pagination.module.less';
import { LeftOutlined, RightOutlined } from '@ant-design/icons';

const Pagination: React.FC = () => (
  <div className={styles.pagination}>
    <div className={styles.pagination__item}>
      <LeftOutlined />
    </div>
    {Array(10)
      .fill(0)
      .map((item, i) => (
        <div key={i} className={`${styles.pagination__item} ${i === 1 ? styles['--actived'] : ''}`}>
          {i + 1}
        </div>
      ))}
    <div className={styles.pagination__item}>
      <RightOutlined />
    </div>
  </div>
);

export default Pagination;
