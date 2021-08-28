import React, { useState } from 'react';
import './pedding.less';
import { DownloadOutlined, PauseOutlined, DeleteOutlined } from '@ant-design/icons';
import Table, { Column } from '@/components/table';
import { Data } from '@/types';

const Pedding: React.FC = () => {
  const columns: Column[] = [
    { key: 'title', title: '音乐标题' },
    { key: 'progress', title: '进度' },
  ];
  const [data] = useState<Data<number | string>[]>([]);
  return (
    <div>
      <header className="pedding__header">
        <button className="pedding__button">
          <DownloadOutlined />
          全部开始
        </button>
        <button className="pedding__button">
          <PauseOutlined />
          全部暂停
        </button>
        <button className="pedding__button">
          <DeleteOutlined />
          清空全部
        </button>
        <div className="pedding__directory">打开目录</div>
      </header>
      <Table columns={columns} data={data} />
    </div>
  );
};

export default Pedding;
