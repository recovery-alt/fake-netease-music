import classNames from 'classnames';
import { forwardRef } from 'react';

import { AppProps } from '@/types';
import { classGenerator } from '@/utils';

import styles from './scrollbar.module.less';

const Scrollbar = forwardRef<HTMLDivElement, AppProps>(({ children, className }, ref) => {
  const getClass = classGenerator('scrollbar', styles);
  return (
    <div ref={ref} className={classNames(getClass(), className)}>
      <div className={getClass('content')}>{children}</div>
    </div>
  );
});

export default Scrollbar;
