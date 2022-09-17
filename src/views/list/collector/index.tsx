import { Pagination } from 'antd';
import { FC, useEffect, useState } from 'react';

import { getPlaylistSubscribers } from '@/api';
import { clearRequests } from '@/api/api';
import Img from '@/components/img';
import { Subscriber } from '@/types';
import { classGenerator, resizeImg } from '@/utils';

import styles from './collector.module.less';

type Props = { id: number };

const Collector: FC<Props> = ({ id }) => {
  const getClass = classGenerator('collector', styles);
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
    return clearRequests;
  }, [id]);

  return subscribers.length > 0 ? (
    <>
      <div className={getClass()}>
        {subscribers.map(item => (
          <div key={item.userId} className={getClass('item')}>
            <Img className={getClass('img')} src={resizeImg(item.avatarUrl, 100)} />
            <div>
              <div className={getClass('title')}>{item.nickname}</div>
              {item.signature && <div className={getClass('subtitle')}>{item.signature}</div>}
            </div>
          </div>
        ))}
      </div>
      <footer className={getClass('footer')}>
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
    <div className={getClass('empty')}>暂无收藏者</div>
  );
};

export default Collector;
