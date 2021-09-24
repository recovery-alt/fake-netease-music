import React from 'react';
import './radio-list.less';
import Img from '@/components/img';
import { classGenerator } from '@/utils';

const RadioList: React.FC = () => {
  const getClass = classGenerator('radio-list');

  return (
    <div className={getClass()}>
      <header className={getClass('header')}>
        <Img className={getClass('img')} src="" />
      </header>
    </div>
  );
};

export default RadioList;
