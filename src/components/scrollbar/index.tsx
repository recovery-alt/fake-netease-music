import React, { forwardRef, useImperativeHandle, useRef } from 'react';
import styles from './scrollbar.module.less';
import { AppProps } from '@/types';
import classNames from 'classnames';

const Scrollbar = forwardRef<HTMLDivElement, AppProps>(({ children, className }, ref) => {
  return (
    <div ref={ref} className={classNames(styles.scrollbar, className)}>
      <div className={styles.scrollbar__content}>{children}</div>
    </div>
  );
});

export default Scrollbar;
