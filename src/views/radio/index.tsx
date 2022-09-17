import './radio.less';

import { FC, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';

import { getDJSublist } from '@/api';
import List, { ListData } from '@/components/list';
import { DynamicPage } from '@/router';
import { classGenerator } from '@/utils';

const Radio: FC = () => {
  const getClass = classGenerator('radio');
  const [total, setTotal] = useState(0);
  const [data, setData] = useState<ListData[]>([]);
  const { push } = useHistory();

  function handleItemClick(id: number) {
    push(DynamicPage.radioList(id));
  }

  async function loadData() {
    const res = await getDJSublist();
    setTotal(res.count);
    const result = res.djRadios.map(item => {
      const { id, dj, picUrl: imgUrl, programCount, name: col2 } = item;
      const { nickname } = dj;
      const col3 = `by ${nickname}`;
      const col4 = `节目${programCount}`;
      return { id, col2, imgUrl, col3, col4 };
    });

    setData(result);
  }

  useEffect(() => {
    loadData();
  }, []);

  return (
    <div className={getClass()}>
      <header className={getClass('header')}>
        <strong>我订阅的电台</strong>
        <span>（{total}）</span>
      </header>
      <List data={data} onItemClick={handleItemClick} />
    </div>
  );
};

export default Radio;
