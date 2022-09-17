import { FC, useState } from 'react';

import Table, { Column } from '@/components/table';
import { Data } from '@/types';

import Header from '../../header';

const Program: FC = () => {
  const columns: Column[] = [
    { key: 'ordinal' },
    { key: 'title', title: '节目标题' },
    { key: 'artist', title: '主播' },
    { key: 'album', title: '电台' },
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

export default Program;
