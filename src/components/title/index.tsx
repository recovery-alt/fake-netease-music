import { RightOutlined } from '@ant-design/icons';
import classNames from 'classnames';
import { FC, HtmlHTMLAttributes } from 'react';

import { classGenerator } from '@/utils';

import styles from './title.module.less';

interface Props extends HtmlHTMLAttributes<HTMLElement> {
  name: string;
  welt?: boolean;
}

const Title: FC<Props> = ({ name, welt = false, className, ...restProps }: Props) => {
  const getClass = classGenerator('title', styles);
  const mergedClassName = classNames(className, getClass(), { [styles['--welt']]: welt });

  return (
    <header className={mergedClassName} {...restProps}>
      {name}
      <RightOutlined />
    </header>
  );
};

export default Title;
