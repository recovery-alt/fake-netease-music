import { FC, useEffect, useReducer, useRef } from 'react';

import { getDJSubscriber } from '@/api';
import { clearRequests } from '@/api/api';
import Img from '@/components/img';
import InfinityScroll, { SetMore } from '@/components/infinity-scroll';
import type { Subscriber as SubscriberType } from '@/types';
import { classGenerator, resizeImg } from '@/utils';
import styles from '@/views/list/collector/collector.module.less';

type Props = { id: number };

const Subscriber: FC<Props> = ({ id }) => {
  type Action = { type?: 'reset' | 'add'; payload: SubscriberType[] };
  const getClass = classGenerator('collector', styles);
  const [subscribers, subscribersDispatch] = useReducer(subscribersReducer, []);
  const setMore = useRef<SetMore>(null);
  let time = -1;

  async function loadSubscribers() {
    if (!id) return;
    const res = await getDJSubscriber(id, time);
    const type = time === -1 ? 'reset' : 'add';
    subscribersDispatch({ type, payload: res.subscribers });
    setMore.current?.(res.hasMore);
    time = res.time;
  }

  function subscribersReducer(state: SubscriberType[], { type = 'reset', payload }: Action) {
    return type === 'reset' ? payload : [...state, ...payload];
  }

  useEffect(() => {
    loadSubscribers();

    return clearRequests;
  }, [id]);

  return (
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
      <InfinityScroll ref={setMore} cb={loadSubscribers} />
    </>
  );
};

export default Subscriber;
