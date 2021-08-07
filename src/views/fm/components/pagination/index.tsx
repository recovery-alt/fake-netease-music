import React, { useState, useEffect } from 'react';
import styles from './pagination.module.less';
import { LeftOutlined, RightOutlined } from '@ant-design/icons';

type Props = { total: number; current: number; pageSize?: number };

const Pagination: React.FC<Props> = ({ total, current, pageSize = 20 }) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const totalPage = Math.ceil(total / pageSize);
  }, [total, current, pageSize]);

  return (
    <div className={styles.pagination}>
      <div className={styles.pagination__item}>
        <LeftOutlined />
      </div>
      {Array(10)
        .fill(0)
        .map((item, i) => (
          <div
            key={i}
            className={`${styles.pagination__item} ${i === 1 ? styles['--actived'] : ''}`}
          >
            {i + 1}
          </div>
        ))}
      <div className={styles.pagination__item}>
        <RightOutlined />
      </div>
    </div>
  );
};

export default Pagination;
