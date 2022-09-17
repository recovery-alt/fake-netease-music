import './zone.less';

import { FC, useEffect, useMemo, useReducer, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useHistory } from 'react-router-dom';

import { getDJCatelist, getDJRadioHot } from '@/api';
import Img from '@/components/img';
import InfinityScroll, { SetMore } from '@/components/infinity-scroll';
import { DynamicPage } from '@/router';
import { DataAction, DJCatelist, DJRadio } from '@/types';
import { classGenerator } from '@/utils';

const Zone: FC = () => {
  const getClass = classGenerator('zone');
  const params = useParams<{ type: string }>();
  const type = useMemo(() => Number(params.type), [params.type]);
  const [djCatelist, setDJCatelist] = useState<DJCatelist[]>([]);
  const [djRadioHot, setDJRadioHot] = useReducer(djRadioHotReducer, []);
  const title = useMemo(() => djCatelist.find(item => item.id === type)?.name, [djCatelist, type]);
  const offset = useRef(0);
  const setMore = useRef<SetMore>(null);
  const limit = 20;
  const { push } = useHistory();

  async function loadDJRadioHot() {
    const res = await getDJRadioHot(type, offset.current, limit);
    const ActionType = offset.current === 0 ? 'reset' : 'add';
    setDJRadioHot({ type: ActionType, payload: res.djRadios });
    offset.current += limit;
    setMore.current?.(res.hasMore);
  }

  async function loadDJCatelist() {
    const res = await getDJCatelist();
    setDJCatelist(res.categories);
  }

  function djRadioHotReducer(state: DJRadio[], action: DataAction<DJRadio>) {
    const { type, payload } = action;
    return type === 'reset' ? payload : [...state, ...payload];
  }

  useEffect(() => {
    loadDJCatelist();
  }, []);

  return (
    <div className={getClass()}>
      <h2 className={getClass('title')}>{title}</h2>
      <section className={getClass('cards')}>
        {djRadioHot.map(item => (
          <div key={item.id} className={getClass('card')}>
            <Img
              className={getClass('img')}
              src={item.picUrl}
              onClick={() => push(DynamicPage.radioList(item.id))}
            />
            <div className={getClass('right')}>
              <h3>{item.name}</h3>
              <div>{item.desc}</div>
              <small>
                节目:{item.programCount}，订阅:{item.subCount}
              </small>
            </div>
          </div>
        ))}
      </section>
      <InfinityScroll ref={setMore} cb={loadDJRadioHot} />
    </div>
  );
};

export default Zone;
