import React from 'react';
import notFound from './not-found.svg';
import styles from './not-found.module.less';
import { classGenerator } from '@/utils';

const NotFound: React.FC = () => {
  const getClass = classGenerator('not-found', styles);

  return (
    <div className={getClass()}>
      <img src={notFound} alt="404" />
    </div>
  );
};

export default NotFound;
