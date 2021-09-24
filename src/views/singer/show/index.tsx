import React from 'react';
import styles from './show.module.less';
import Img from '@/components/img';
import { classGenerator } from '@/utils';

const Show: React.FC = () => {
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
