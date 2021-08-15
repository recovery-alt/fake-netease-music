import React from 'react';
import Input from '@/components/input';
import styles from './header.module.less';

type Props = { title: string; count: number; style?: React.CSSProperties };

const Header: React.FC<Props> = ({ title, count, style }) => (
  <header className={styles.header} style={style}>
    <div className={styles.header__left}>
      <strong>{title}</strong>
      {count > 0 ? <span>（{count}）</span> : null}
    </div>
    <Input />
  </header>
);

export default Header;
