import React from 'react';
import Header from '../../header';
import './column.less';
import NoData from '@/components/no-data';
import { classGenerator } from '@/utils';

const Column: React.FC = () => {
  const getClass = classGenerator('column');

  return (
    <div className={getClass()}>
      <Header title="收藏的专栏" count={0} />
      <NoData title="暂无收藏专栏" />
    </div>
  );
};

export default Column;
