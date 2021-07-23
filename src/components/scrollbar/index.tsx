import React from 'react';
import styles from './scrollbar.module.less';
import { AppProps } from '@/types';

const Scrollbar: React.FC<AppProps> = ({ children, className }) => {
  return (
    <div className={`${styles.scrollbar} ${className}`}>
      <div className={styles.scrollbar__content}>{children}</div>
    </div>
  );
};

export default Scrollbar;
