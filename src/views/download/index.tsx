import React, { useState } from 'react';
import Header from './components/header';
import Table, { Column } from '@/components/table';
import { Data } from '@/types';

const Download: React.FC = () => {
  const columns: Column[] = [
    { key: 'ordinal', title: '' },
    { key: 'title', title: '音乐标题' },
    { key: 'artist', title: '歌手' },
    { key: 'album', title: '专辑' },
    { key: 'size', title: '大小' },
    { key: 'time', title: '下载时间' },
  ];
  const [data, setData] = useState<Data<string | number>[]>([]);

  return (
    <>
      <Header />
      <Table columns={columns} data={data} />
    </>
  );
};

export default Download;
