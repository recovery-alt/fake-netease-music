import { CSSProperties, FC } from 'react';

import Input from '@/components/input';
import { classGenerator } from '@/utils';

import styles from './header.module.less';

type Props = { title: string; count: number; style?: CSSProperties };

const Header: FC<Props> = ({ title, count, style }) => {
  const getClass = classGenerator('header', styles);
  return (
    <header className={getClass()} style={style}>
      <div className={getClass('left')}>
        <strong>{title}</strong>
        {count > 0 ? <span>（{count}）</span> : null}
      </div>
      <Input />
    </header>
  );
};

export default Header;
