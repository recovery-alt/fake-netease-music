import React, { forwardRef } from 'react';
import styles from './input.module.less';
import { SearchOutlined } from '@ant-design/icons';
import classNames from 'classnames';
import { classGenerator } from '@/utils';

interface Props
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size' | 'prefix' | 'type'> {
  type?: 'transparent' | 'normal';
  placeholder?: string;
}

const Input = forwardRef<HTMLInputElement, Props>(({ type = 'transparent', ...restProps }, ref) => {
  const getClass = classGenerator('input', styles);
  return (
    <div className={classNames(styles[`--${type}`], getClass())}>
      <input {...restProps} ref={ref} type="text" />
      <div className={getClass('icon')}>
        <SearchOutlined />
      </div>
    </div>
  );
});

export default Input;
