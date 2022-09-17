import './column.less';

import { FC } from 'react';

import NoData from '@/components/no-data';
import { classGenerator } from '@/utils';

import Header from '../../header';

const Column: FC = () => {
  const getClass = classGenerator('column');

  return (
    <div className={getClass()}>
      <Header title="收藏的专栏" count={0} />
      <NoData title="暂无收藏专栏" />
    </div>
  );
};

export default Column;
