import './cloud-music.less';

import debounce from 'lodash/debounce';
import { FC, FormEventHandler, useEffect, useMemo, useReducer, useRef, useState } from 'react';

import { getUserCloud } from '@/api';
import Button from '@/components/button';
import InfinityScroll from '@/components/infinity-scroll';
import Input from '@/components/input';
import Table from '@/components/table';
import { CommonColumns } from '@/config';
import { DataAction, Track } from '@/types';
import { classGenerator } from '@/utils';

const CloudMusic: FC = () => {
  const getClass = classGenerator('cloud-music');
  // const footerRef = useRef<HTMLElement>(null);
  const [data, dataDispatch] = useReducer(dataReducer, []);
  const [, setCount] = useState(0);
  const [maxSize, setMaxSize] = useState(0);
  const [size, setSize] = useState(0);
  const [, setKeyword] = useState('');
  const percent = useMemo(() => (maxSize === 0 ? 0 : (size * 100) / maxSize), [size, maxSize]);
  let offset = 0;
  const limit = 30;
  const setMore = useRef<(hasMore: boolean) => void>(null);

  const handleInput: FormEventHandler<HTMLInputElement> = debounce(e => {
    setKeyword(e.currentTarget.value);
  }, 500);

  async function loadUserCloud() {
    const res = await getUserCloud(offset, limit);
    const { data, maxSize, size, count, hasMore } = res;
    const type = offset === 0 ? 'reset' : 'add';
    const payload = data.map(item => item.simpleSong);
    dataDispatch({ type, payload });
    setMaxSize(transUnit(maxSize));
    setSize(transUnit(size));
    setCount(count);
    setMore.current?.(hasMore);
    offset += limit;
  }

  function dataReducer(state: Track[], action: DataAction<Track>) {
    return action.type === 'add' ? [...state, ...action.payload] : action.payload;
  }

  function transUnit(raw: string) {
    try {
      let bigInt = BigInt(raw);
      const n1024 = BigInt(1024);
      bigInt *= BigInt(10);
      bigInt /= n1024 ** BigInt(3);
      return Number(bigInt) / 10;
    } catch (error) {
      throw new Error(error as string);
      return 0;
    }
  }

  useEffect(() => {
    loadUserCloud();
  }, []);

  return (
    <div>
      <header className={getClass('header')}>
        <div className={getClass('capacity')}>
          <span className={getClass('capacity-title')}>云盘容量</span>
          <div className={getClass('ruler')}>
            <div style={{ width: `${percent}%` }}></div>
          </div>
          <span className={getClass('capacity-ratio')}>
            {size}G/{maxSize}G
          </span>
          <span className={getClass('capacity-description')}>歌曲永久保存，随时随地多端畅听</span>
        </div>
        <div className={getClass('control')}>
          <Button compose />
          <Input placeholder="搜索云盘音乐" onInput={handleInput} />
        </div>
      </header>
      <Table columns={CommonColumns} data={data} />
      <InfinityScroll ref={setMore} cb={loadUserCloud} />
    </div>
  );
};

export default CloudMusic;
