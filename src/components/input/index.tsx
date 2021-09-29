import React, { FormEventHandler, forwardRef, useMemo, useState } from 'react';
import styles from './input.module.less';
import { CloseOutlined, SearchOutlined } from '@ant-design/icons';
import classNames from 'classnames';
import { classGenerator } from '@/utils';

interface Props
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size' | 'prefix' | 'type' | 'value'> {
  type?: 'transparent' | 'normal';
  placeholder?: string;
  defaultValue?: string;
  onClear?: () => void;
}

const Input = forwardRef<HTMLInputElement, Props>(
  ({ type = 'transparent', defaultValue = '', onInput, ...restProps }, ref) => {
    const getClass = classGenerator('input', styles);
    const [value, setValue] = useState(defaultValue);
    const showClear = useMemo(() => !!value, [value]);

    const handleInput: FormEventHandler<HTMLInputElement> = e => {
      setValue(e.currentTarget.value);
      onInput?.(e);
    };

    function handleClear() {
      setValue('');
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
