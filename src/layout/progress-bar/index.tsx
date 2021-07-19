import React from 'react';
import styles from './progress-bar.module.less';

export default function ProgressBar() {
  return (
    <div className={styles['progress-bar']}>
      <div className={styles['progress-bar__slider']} style={{ width: '300px' }}></div>
    </div>
  );
}
