import React, { useEffect, useReducer, useRef, useState, Reducer } from 'react';
import './singer.less';
import classNames from 'classnames';
import { getArtistList } from '@/api';
import { Artist, Data } from '@/types';
import { categoryList } from '@/config';
import Img from '@/components/img';
import { classGenerator, resizeImg } from '@/utils';
import { useHistory } from 'react-router-dom';
import { DynamicPage } from '@/router';
import { useInfinityScroll } from '@/hooks';

const Singer: React.FC = () => {
  const getClass = classGenerator('music-singer');
  type ActionType = 'add' | 'reset';
  type Action = { type: ActionType; payload: Artist[] };
  const [data, dataDispatch] = useReducer<Reducer<Artist[], Action>>((state, action) => {
    if (action.type === 'add') return [...state, ...action.payload];
    return action.payload;
  }, []);
  type Selected = Array<number | string | undefined>;
  const [selected, setSelected] = useState<Selected>([-1, -1, undefined]);
  const footerRef = useRef<HTMLElement>(null);
  const { push } = useHistory();
  const limit = 20;
  let offset = 0;
  const { setMore, moreText } = useInfinityScroll(footerRef, loadMoreArtistList);

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

  function handleCatClick(index: number, value: number | string) {
    const newSelected = [...selected];
    newSelected[index] = value;
    setSelected(newSelected);
  }

  async function loadArtistList(actionType: ActionType) {
    const [area, type, initial] = selected;
    const res = await getArtistList({ area, type, initial, limit, offset });
    setMore(res.more);
    dataDispatch({ type: actionType, payload: res.artists });
  }

  function handleSingerClick(item: Artist) {
    push({ pathname: DynamicPage.singer(item.id), state: item.alias });
  }

  function loadMoreArtistList() {
    offset += limit;
    loadArtistList('add');
  }

  useEffect(() => {
    offset = 0;
    loadArtistList('reset');
  }, [selected]);

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
      <footer className={getClass('footer')} ref={footerRef}>
        {moreText}
      </footer>
    </div>
  );
};

export default Singer;
