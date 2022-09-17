import './pay-excellent.less';

import { FC, useReducer, useRef } from 'react';
import { useHistory } from 'react-router-dom';

import { getDJPaygift } from '@/api';
import Img from '@/components/img';
import InfinityScroll, { SetMore } from '@/components/infinity-scroll';
import { DynamicPage } from '@/router';
import { DataAction, DJRadio } from '@/types';
import { classGenerator, resizeImg } from '@/utils';

const PayExcellent: FC = () => {
  const getClass = classGenerator('pay-excellent');
  const [djPaygift, setDJPaygift] = useReducer(djPaygiftReducer, []);
  const offset = useRef(0);
  const limit = 10;
  const setMore = useRef<SetMore>(null);
  const { push } = useHistory();

  async function loadDJPaygift() {
    const res = await getDJPaygift(offset.current, limit);
    const type = offset.current === 0 ? 'reset' : 'add';
    setDJPaygift({ type, payload: res.data.list });
    setMore.current?.(res.data.hasMore);
    offset.current += limit;
  }

  function djPaygiftReducer(state: DJRadio[], action: DataAction<DJRadio>) {
    const { type, payload } = action;
    return type === 'reset' ? payload : [...state, ...payload];
  }

  return (
    <>
      <div className={getClass()}>
        {djPaygift.map(item => (
          <div key={item.id} className={getClass('item')}>
            <Img
              className={getClass('img')}
              src={resizeImg(item.picUrl, 150)}
              onClick={() => push(DynamicPage.radioList(item.id, 'pay'))}
            />
            <div className={getClass('right')}>
              <h3>{item.name}</h3>
              <p>{item.rcmdText}</p>
              <small>{item.lastProgramName}</small>
              <div>¥ {item.originalPrice / 100}</div>
            </div>
          </div>
        ))}
      </div>
      <InfinityScroll ref={setMore} cb={loadDJPaygift} />
    </>
  );
};

export default PayExcellent;
