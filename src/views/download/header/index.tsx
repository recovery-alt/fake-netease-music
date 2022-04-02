import { FC } from 'react';
import styles from './header.module.less';
import Button from '@/components/button';
import Input from '@/components/input';
import { classGenerator } from '@/utils';

const Header: FC = () => {
  const getClass = classGenerator('header', styles);
  return (
    <header className={getClass()}>
      <div className={getClass('left')}>
        <Button compose />
        <div className={getClass('directory')}>打开目录</div>
      </div>
      <Input />
    </header>
  );
};

export default Header;
