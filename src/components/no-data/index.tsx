import React from 'react';
import noMusic from '@/assets/img/no-music.svg';
import styles from './no-data.module.less';
import { classGenerator } from '@/utils';

type Props = { title?: string; subTitle?: string };

const NoData: React.FC<Props> = ({ title, subTitle }) => {
  const getClass = classGenerator('no-data', styles);
  return (
    <div className={getClass('wrapper')}>
      <div className={getClass()}>
        <img src={noMusic} alt="no-music" />
        {title && <h3>{title}</h3>}
        {subTitle && <div>{subTitle}</div>}
      </div>
    </div>
  );
};

export default NoData;
