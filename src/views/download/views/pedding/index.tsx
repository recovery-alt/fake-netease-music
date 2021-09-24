import React, { useState } from 'react';
import './pedding.less';
import { DownloadOutlined, PauseOutlined, DeleteOutlined } from '@ant-design/icons';
import Table, { Column } from '@/components/table';
import { Data } from '@/types';
import Button from '@/components/button';
import { classGenerator } from '@/utils';

const Pedding: React.FC = () => {
  const getClass = classGenerator('pedding');
  const columns: Column[] = [
    { key: 'title', title: '音乐标题' },
    { key: 'progress', title: '进度' },
  ];
  const [data] = useState<Data<number | string>[]>([]);
  return (
    <div>
      <header className={getClass('header')}>
        <Button className={getClass('button')}>
          <DownloadOutlined />
          全部开始
        </Button>
        <Button className={getClass('button')}>
          <PauseOutlined />
          全部暂停
        </Button>
        <Button className={getClass('button')}>
          <DeleteOutlined />
          清空全部
        </Button>
        <div className={getClass('directory')}>打开目录</div>
      </header>
      <Table columns={columns} data={data} />
    </div>
  );
};

export default Pedding;
