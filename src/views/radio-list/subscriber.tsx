import React, { useEffect, useRef, useReducer } from 'react';
import styles from '@/views/list/collector/collector.module.less';
import { classGenerator, resizeImg } from '@/utils';
import { getDJSubscriber } from '@/api';
import type { Subscriber as SubscriberType } from '@/types';
import Img from '@/components/img';
import { useInfinityScroll } from '@/hooks';

type Props = { id: number };

const Subscriber: React.FC<Props> = ({ id }) => {
  type Action = { type?: 'reset' | 'add'; payload: SubscriberType[] };
  const getClass = classGenerator('collector', styles);
  const [subscribers, subscribersDispatch] = useReducer(subscribersReducer, []);
  const ref = useRef(null);
  const { moreText, setMore } = useInfinityScroll(ref, loadSubscribers);
  let time = -1;

  async function loadSubscribers() {
    const res = await getDJSubscriber(id, time);
    const type = time === -1 ? 'reset' : 'add';
    subscribersDispatch({ type, payload: res.subscribers });
    setMore(res.hasMore);
    time = res.time;
  }

  function subscribersReducer(state: SubscriberType[], { type = 'reset', payload }: Action) {
    return type === 'reset' ? payload : [...state, ...payload];
  }

  useEffect(() => {
    if (id) loadSubscribers();
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
      <footer ref={ref} className={getClass('footer')}>
        {moreText}
      </footer>
    </>
  );
};

export default Subscriber;
