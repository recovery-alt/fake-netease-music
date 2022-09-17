import { FC } from 'react';

import Img from '@/components/img';
import { classGenerator } from '@/utils';

import styles from './show.module.less';

const Show: FC = () => {
  const getClass = classGenerator('show', styles);
  return (
    <div className={getClass()}>
      {[].map(() => (
        <div className={getClass('item')}>
          <Img src="" className={getClass('img')} />
          <div className={getClass('description')}>
            <div>演出</div>
            <div>8月12号</div>
            <div>¥122</div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Show;
