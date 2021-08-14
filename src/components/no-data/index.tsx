import React from 'react';
import noMusic from '@/assets/img/no-music.svg';
import styles from './no-data.module.less';

type Props = { title?: string; subTitle?: string };

const NoData: React.FC<Props> = ({ title, subTitle }) => (
  <div className={styles['no-data__wrapper']}>
    <div className={styles['no-data']}>
      <img src={noMusic} alt="no-music" />
      {title && <h3>{title}</h3>}
      {subTitle && <div>{subTitle}</div>}
    </div>
  </div>
);

export default NoData;
