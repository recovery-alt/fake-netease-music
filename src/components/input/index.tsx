import React, { forwardRef } from 'react';
import styles from './input.module.less';
import { SearchOutlined } from '@ant-design/icons';

interface Props
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size' | 'prefix' | 'type'> {
  type?: 'transparent' | 'normal';
  placeholder?: string;
}

const Input = forwardRef<HTMLInputElement, Props>(({ type = 'transparent', ...restProps }, ref) => {
  return (
    <div className={styles.input}>
      <input {...restProps} ref={ref} className={styles[`--${type}`]} type="text" />
      <div className={styles.input__icon}>
        <SearchOutlined />
      </div>
    </div>
  );
});

export default Input;
