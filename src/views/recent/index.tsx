import './recent.less';

import { FC } from 'react';

import Button from '@/components/button';
import Table, { Column } from '@/components/table';
import { Data } from '@/types';
import { classGenerator } from '@/utils';

const Recent: FC = () => {
  const getClass = classGenerator('recent');
  const columns: Column[] = [
    { key: 'ordinal', title: '' },
    { key: 'title', title: '音乐标题' },
    { key: 'artist', title: '歌手' },
    { key: 'time', title: '播放时间' },
  ];
  const data: Data<string | number>[] = [];

  return (
    <div>
      <header className={getClass('header')}>
        <div className={getClass('total')}>共100首</div>
        <div className={getClass('control')}>
          <Button compose />
          <span className={getClass('control-clear')}>清空列表</span>
        </div>
      </header>
      <Table columns={columns} data={data} />
    </div>
  );
};

export default Recent;
