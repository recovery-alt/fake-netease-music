import React, { forwardRef } from 'react';
import styles from './input.module.less';
import { SearchOutlined } from '@ant-design/icons';
import classNames from 'classnames';

interface Props
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size' | 'prefix' | 'type'> {
  type?: 'transparent' | 'normal';
  placeholder?: string;
}

const Input = forwardRef<HTMLInputElement, Props>(({ type = 'transparent', ...restProps }, ref) => {
  return (
    <div className={classNames(styles[`--${type}`], styles.input)}>
      <input {...restProps} ref={ref} type="text" />
      <div className={styles.input__icon}>
        <SearchOutlined />
      </div>
    </div>
  );
});

export default Input;
