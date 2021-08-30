import React from 'react';
import notFound from './not-found.svg';
import styles from './not-found.module.less';

const NotFound: React.FC = () => (
  <div className={styles['not-found']}>
    <img src={notFound} alt="404" />
  </div>
);

export default NotFound;
