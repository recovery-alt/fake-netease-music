import React from 'react';
import styles from './button.module.less';
import { PlayCircleOutlined, PlusOutlined } from '@ant-design/icons';
import classNames from 'classnames';

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  compose?: boolean;
}

const Button: React.FC<Props> = props => {
  const { compose, children, className, ...restProps } = props;

  const composeNode = (
    <>
      <div className={styles.button__left}>
        <PlayCircleOutlined />
        播放全部
      </div>
      <div className={styles.button__right}>
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
