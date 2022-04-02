import { FC, HtmlHTMLAttributes } from 'react';
import { RightOutlined } from '@ant-design/icons';
import styles from './title.module.less';
import { classGenerator } from '@/utils';
import classNames from 'classnames';

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
