import React from 'react';
import './recent.less';
import Button from '@/components/button';
import Table, { Column } from '@/components/table';
import { Data } from '@/types';

const Recent: React.FC = () => {
  const columns: Column[] = [
    { key: 'ordinal', title: '' },
    { key: 'title', title: '音乐标题' },
    { key: 'artist', title: '歌手' },
    { key: 'time', title: '播放时间' },
  ];
  const data: Data<string | number>[] = [];

  return (
    <div>
      <header className="recent__header">
        <div className="recent__total">共100首</div>
        <div className="recent__control">
          <Button />
          <span className="recent__control-clear">清空列表</span>
        </div>
      </header>
      <Table columns={columns} data={data} />
    </div>
  );
};

export default Recent;
