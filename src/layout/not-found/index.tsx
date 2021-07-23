import React from 'react';
import notFound from './not-found.svg';
import styles from './not-found.module.less';

export default function NotFound() {
  return (
    <div className={styles['not-found']}>
      <img src={notFound} alt="404" />
    </div>
  );
}
