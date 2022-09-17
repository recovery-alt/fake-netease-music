import { FC } from 'react';

import { classGenerator } from '@/utils';

import styles from './not-found.module.less';
import notFound from './not-found.svg';

const NotFound: FC = () => {
  const getClass = classGenerator('not-found', styles);

  return (
    <div className={getClass()}>
      <img src={notFound} alt="404" />
    </div>
  );
};

export default NotFound;
