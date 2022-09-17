import classNames from 'classnames';
import { FC, HTMLAttributes } from 'react';

import { classGenerator } from '@/utils';

import styles from './icon.module.less';

export type IconSize = 'small' | 'medium' | 'big' | 'large' | 'giant';

interface Props extends HTMLAttributes<HTMLSpanElement> {
  type?: 'pause' | 'play';
  size?: IconSize;
}

const Icon: FC<Props> = props => {
  const getClass = classGenerator('icon', styles);
  const { type = 'play', size, className, ...restProps } = props;
  return (
    <span
      className={classNames(styles[`--${size}`], className, getClass())}
      tabIndex={-1}
      {...restProps}
    >
      {type === 'play' ? (
        <span className={getClass('play')}></span>
      ) : (
        <span className={getClass('pause')}>| |</span>
      )}
    </span>
  );
};

export default Icon;
