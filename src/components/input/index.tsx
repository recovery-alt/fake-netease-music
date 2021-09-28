import React, { FormEventHandler, forwardRef, useState } from 'react';
import styles from './input.module.less';
import { CloseOutlined, SearchOutlined } from '@ant-design/icons';
import classNames from 'classnames';
import { classGenerator } from '@/utils';

interface Props
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size' | 'prefix' | 'type'> {
  type?: 'transparent' | 'normal';
  placeholder?: string;
}

const Input = forwardRef<HTMLInputElement, Props>(
  ({ type = 'transparent', onInput, ...restProps }, ref) => {
    const getClass = classGenerator('input', styles);
    const [showClear, setShowClear] = useState(false);

    const handleInput: FormEventHandler<HTMLInputElement> = e => {
      setShowClear(!!e.currentTarget.value);
      onInput?.(e);
    };

    function handleClear() {
      // TODO: 清空输入框
    }

    return (
      <div className={classNames(styles[`--${type}`], getClass())}>
        <input {...restProps} ref={ref} type="text" onInput={handleInput} />
        <div className={getClass('icon')}>
          <SearchOutlined />
        </div>
        {showClear && <CloseOutlined className={getClass('close')} onClick={handleClear} />}
      </div>
    );
  }
);

export default Input;
