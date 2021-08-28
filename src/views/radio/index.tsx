import React, { useEffect, useState } from 'react';
import './radio.less';
import { getDJSublist } from '@/api';
import List, { ListData } from '@/components/list';

const Radio: React.FC = () => {
  const [total, setTotal] = useState(0);
  const [data, setData] = useState<ListData[]>([]);

  useEffect(() => {
    (async () => {
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
    })();
  }, []);

  return (
    <div className="radio">
      <header className="radio__header">
        <strong>我订阅的电台</strong>
        <span>（{total}）</span>
      </header>
      <List data={data} />
    </div>
  );
};

export default Radio;
