import { FC } from 'react';

import noMusic from '@/assets/img/no-music.svg';
import { classGenerator } from '@/utils';

import styles from './no-data.module.less';

type Props = { title?: string; subTitle?: string };

const NoData: FC<Props> = ({ title, subTitle }) => {
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
