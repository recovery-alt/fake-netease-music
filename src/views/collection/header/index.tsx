import React from 'react';
import Input from '@/components/input';
import styles from './header.module.less';
import { classGenerator } from '@/utils';

type Props = { title: string; count: number; style?: React.CSSProperties };

const Header: React.FC<Props> = ({ title, count, style }) => {
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
