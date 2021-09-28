import React, { useEffect, useMemo, useState } from 'react';
import './cloud-music.less';
import Button from '@/components/button';
import Input from '@/components/input';
import Table, { Column } from '@/components/table';
import { UserCloudData } from '@/types';
import { classGenerator } from '@/utils';
import { getUserCloud } from '@/api';

const CloudMusic: React.FC = () => {
  const getClass = classGenerator('cloud-music');
  const [data, setData] = useState<UserCloudData[]>([]);
  const [count, setCount] = useState(0);
  const [maxSize, setMaxSize] = useState(0);
  const [size, setSize] = useState(0);
  const percent = useMemo(() => (maxSize === 0 ? 0 : (size * 100) / maxSize), [size, maxSize]);
  const columns: Column[] = [
    { key: 'ordinal' },
    { key: 'title', title: '音乐标题' },
    { key: 'artist', title: '歌手' },
    { key: 'album', title: '专辑' },
    { key: 'format', title: '格式' },
    { key: 'size', title: '大小' },
    { key: 'time', title: '上传时间' },
  ];

  async function loadUserCloud() {
    const res = await getUserCloud();
    const { data, maxSize, size, count } = res;
    setData(data);
    setMaxSize(transUnit(maxSize));
    setSize(transUnit(size));
    setCount(count);
  }

  function transUnit(raw: string) {
    try {
      let bigInt = BigInt(raw);
      const n1024 = BigInt(1024);
      bigInt *= BigInt(10);
      bigInt /= n1024 ** BigInt(3);
      return Number(bigInt) / 10;
    } catch (error) {
      console.error(error);
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
          <Input placeholder="搜索云盘音乐" />
        </div>
      </header>
      <Table columns={columns} data={data} />
    </div>
  );
};

export default CloudMusic;
