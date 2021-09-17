import React from 'react';
import styles from './header.module.less';
import Button from '@/components/button';
import Input from '@/components/input';

const Header: React.FC = () => (
  <header className={styles.header}>
    <div className={styles.header__left}>
      <Button compose />
      <div className={styles['header__directory']}>打开目录</div>
    </div>
    <Input />
  </header>
);

export default Header;
