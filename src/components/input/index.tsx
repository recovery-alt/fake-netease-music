import React, { FormEventHandler, forwardRef, useMemo, useState, MutableRefObject } from 'react';
import styles from './input.module.less';
import { CloseOutlined, SearchOutlined } from '@ant-design/icons';
import classNames from 'classnames';
import { classGenerator } from '@/utils';

interface Props
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size' | 'prefix' | 'type' | 'value'> {
  type?: 'transparent' | 'normal';
  placeholder?: string;
  value?: string;
  setValue?: (value: string) => void;
  onClear?: () => void;
}

const Input = forwardRef<HTMLInputElement, Props>(
  ({ type = 'transparent', value = '', setValue, onInput, ...restProps }, ref) => {
    const getClass = classGenerator('input', styles);
    const showClear = useMemo(() => !!value, [value]);

    const handleInput: FormEventHandler<HTMLInputElement> = e => {
      setValue?.(e.currentTarget.value);
    };

    function handleClear() {
      setValue?.('');
    }

    return (
      <div className={classNames(styles[`--${type}`], getClass())}>
        <input {...restProps} value={value} ref={ref} type="text" onInput={handleInput} />
        <div className={getClass('icon')}>
          <SearchOutlined />
        </div>
        {showClear && <CloseOutlined className={getClass('close')} onClick={handleClear} />}
      </div>
    );
  }
);

export default Input;
