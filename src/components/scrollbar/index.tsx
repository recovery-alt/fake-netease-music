import React from 'react';
import styles from './scrollbar.module.less';
import { AppProps } from '@/types';
import classNames from 'classnames';
import { classGenerator } from '@/utils';

const Scrollbar = React.forwardRef<HTMLDivElement, AppProps>(({ children, className }, ref) => {
  const getClass = classGenerator('scrollbar', styles);
  return (
    <div ref={ref} className={classNames(getClass(), className)}>
      <div className={getClass('content')}>{children}</div>
    </div>
  );
});

export default Scrollbar;
