import { PlayCircleOutlined, PlusOutlined } from '@ant-design/icons';
import classNames from 'classnames';
import { ButtonHTMLAttributes, FC } from 'react';

import { classGenerator } from '@/utils';

import styles from './button.module.less';

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  compose?: boolean;
}

const Button: FC<Props> = props => {
  const getClass = classGenerator('button', styles);
  const { compose, children, className, ...restProps } = props;

  const composeNode = (
    <>
      <div className={getClass('left')}>
        <PlayCircleOutlined />
        播放全部
      </div>
      <div className={getClass('right')}>
        <PlusOutlined />
      </div>
    </>
  );

  return (
    <button
      className={classNames(
        styles.button,
        compose ? styles['--compose'] : styles['--normal'],
        className
      )}
      {...restProps}
    >
      {compose ? composeNode : children}
    </button>
  );
};

export default Button;
