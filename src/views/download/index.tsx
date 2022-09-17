import { FC, useState } from 'react';

import Table, { Column } from '@/components/table';
import { Data } from '@/types';

import Header from './header';

const Download: FC = () => {
  const columns: Column[] = [
    { key: 'ordinal' },
    { key: 'title', title: '音乐标题' },
    { key: 'artist', title: '歌手' },
    { key: 'album', title: '专辑' },
    { key: 'size', title: '大小' },
    { key: 'time', title: '下载时间' },
  ];
  const [data] = useState<Data<string | number>[]>([]);

  return (
    <>
      <Header />
      <Table columns={columns} data={data} />
    </>
  );
};

export default Download;
