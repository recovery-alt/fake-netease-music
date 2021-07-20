import React from 'react';
import styles from './progress-bar.module.less';

const ProgressBar: React.FC = () => (
  <div className={styles['progress-bar']}>
    <div className={styles['progress-bar__slider']} style={{ width: '300px' }}></div>
  </div>
);

export default ProgressBar;
