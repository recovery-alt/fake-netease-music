import React, { useEffect, useState } from 'react';
import { getPlaylistSubscribers } from '@/api';
import { Subscriber } from '@/types';
import styles from './collector.module.less';
import Img from '@/components/img';
import { resizeImg } from '@/utils';
import { Pagination } from 'antd';

type Props = { id: number };

const Collector: React.FC<Props> = ({ id }) => {
  const [subscribers, setSubscribers] = useState<Subscriber[]>([]);
  const [total, setTotal] = useState(0);
  const [current, setCurrent] = useState(1);

  async function loadPlaylistSubscribers(current = 1, pageSize = 20) {
    const offset = (current - 1) * pageSize;

    const res = await getPlaylistSubscribers({ id, offset, limit: pageSize });
    setSubscribers(res.subscribers);
    setTotal(res.total);
  }

  useEffect(() => {
    if (id) loadPlaylistSubscribers();
  }, [id]);

  return subscribers.length > 0 ? (
    <>
      <div className={styles.collector}>
        {subscribers.map(item => (
          <div key={item.userId} className={styles.collector__item}>
            <Img className={styles.collector__img} src={resizeImg(item.avatarUrl, 100)} />
            <div>
              <div className={styles.collector__title}>{item.nickname}</div>
              {item.signature && <div className={styles.collector__subtitle}>{item.signature}</div>}
            </div>
          </div>
        ))}
      </div>
      <footer className={styles.collector__footer}>
        <Pagination
          {...{ current, total }}
          onChange={(page, pageSize) => {
            setCurrent(page);
            loadPlaylistSubscribers(page, pageSize);
          }}
          pageSize={100}
          showSizeChanger={false}
        />
      </footer>
    </>
  ) : (
    <div className={styles.collector__empty}>暂无收藏者</div>
  );
};

export default Collector;
