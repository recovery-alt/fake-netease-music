import React, { useEffect, useState } from 'react';
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
    const { data, maxSize: maxSizeStr, size: sizeStr, code } = res;
    setData(data);
    const maxSize = transUnit(maxSizeStr);
    const size = transUnit(sizeStr);
  }

  function transUnit(raw: string) {
    let bigInt = BigInt(raw);
    const n1024 = BigInt(1024);
    bigInt /= n1024 ** BigInt(3);
    return;
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
            <div></div>
          </div>
          <span className={getClass('capacity-ratio')}>4.8G/60G</span>
          <span className={getClass('capacity-description')}>歌曲永久保存，随时随地多端畅听</span>
        </div>
        <div className={getClass('control')}>
          <Button compose />
          <Input />
        </div>
      </header>
      <Table columns={columns} data={data} />
    </div>
  );
};

export default CloudMusic;
