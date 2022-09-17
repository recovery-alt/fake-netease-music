import './singer.less';

import classNames from 'classnames';
import { FC, useReducer, useRef, useState } from 'react';
import { useHistory } from 'react-router-dom';

import { getArtistList } from '@/api';
import Img from '@/components/img';
import InfinityScroll, { SetMore } from '@/components/infinity-scroll';
import { categoryList } from '@/config';
import { DynamicPage } from '@/router';
import { Artist, Data, DataAction } from '@/types';
import { classGenerator, resizeImg } from '@/utils';

const Singer: FC = () => {
  const getClass = classGenerator('music-singer');

  const [data, dataDispatch] = useReducer(dataReducer, []);
  type Selected = Array<number | string | undefined>;
  const [selected, setSelected] = useState<Selected>([-1, -1, undefined]);
  const setMore = useRef<SetMore>(null);
  const { push } = useHistory();
  const limit = 20;
  const offset = useRef(0);

  const searchData: Array<{ label: string; key: string; list: Array<Data<string | number>> }> = [
    {
      label: '语种',
      list: categoryList,
      key: 'area',
    },
    {
      label: '分类',
      key: 'type',
      list: [
        { name: '全部', type: -1 },
        { name: '男歌手', type: 1 },
        { name: '女歌手', type: 2 },
        { name: '乐队组合', type: 3 },
      ],
    },
    { label: '筛选', key: 'initial', list: getA2Z() },
  ];

  function getA2Z() {
    const result: Array<{ name: string; initial?: string }> = [{ name: '热门' }];
    const start = 65;
    for (let i = 0; i < 26; i++) {
      const charUpper = String.fromCharCode(start + i);
      const charLower = String.fromCharCode(start + i + 32);
      result.push({ name: charUpper, initial: charLower });
    }

    return result;
  }

  function dataReducer(state: Artist[], action: DataAction<Artist>) {
    return action.type === 'add' ? [...state, ...action.payload] : action.payload;
  }

  function handleCatClick(index: number, value: number | string) {
    const newSelected = [...selected];
    newSelected[index] = value;
    setSelected(newSelected);
    offset.current = 0;
    loadArtistList();
  }

  async function loadArtistList() {
    const [area, type, initial] = selected;
    const res = await getArtistList({ area, type, initial, limit, offset: offset.current });
    const actionType = offset.current === 0 ? 'reset' : 'add';
    setMore.current?.(res.more);
    dataDispatch({ type: actionType, payload: res.artists });
    offset.current += limit;
  }

  function handleSingerClick(item: Artist) {
    push({ pathname: DynamicPage.singer(item.id), state: item.alias });
  }

  return (
    <div className={getClass()}>
      {searchData.map((item, i) => (
        <header key={item.label} className={getClass('header')}>
          <div className={getClass('label')}>{item.label}：</div>
          <div className={getClass('category')}>
            {item.list.map(val => (
              <div
                key={val.name}
                className={getClass('category-item')}
                onClick={() => handleCatClick(i, val[item.key])}
              >
                <span className={classNames({ ['--active']: val[item.key] === selected[i] })}>
                  {val.name}
                </span>
              </div>
            ))}
          </div>
        </header>
      ))}
      <div className={getClass('list')}>
        {data.map(item => (
          <div key={item.id} className={getClass('item')} onClick={() => handleSingerClick(item)}>
            <Img className={getClass('img')} src={resizeImg(item.picUrl)} />
            <div className={getClass('description')}>{item.name}</div>
          </div>
        ))}
      </div>
      <InfinityScroll ref={setMore} cb={loadArtistList} />
    </div>
  );
};

export default Singer;
