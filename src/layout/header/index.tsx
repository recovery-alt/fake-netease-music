import React, { useState, useEffect } from 'react';
import styles from './header.module.less';
import {
  LeftOutlined,
  RightOutlined,
  SearchOutlined,
  SettingOutlined,
  MailOutlined,
  SkinOutlined,
  CompressOutlined,
} from '@ant-design/icons';
import { topMenuMap, MenuConfig } from '@/config';
import { Link, useLocation } from 'react-router-dom';

const List: React.FC = () => {
  const [actived, setActvied] = useState('');
  const [topMenu, setTopMenu] = useState<Array<MenuConfig>>([]);
  const { pathname } = useLocation();

  useEffect(() => {
    if (!pathname) return;
    const match = pathname.match(/(?<=\/)[\w-\d]+\b/);
    if (match?.[0]) setTopMenu(topMenuMap[match[0]] || []);
    setActvied(pathname);
  }, [pathname]);

  return (
    <header className={styles.header}>
      <div className={styles.header__left}>
        <LeftOutlined className={styles['header__left-icon']} />
        <RightOutlined className={styles['header__left-icon']} />
      </div>
      <div className={styles.header__right}>
        <ul className={styles['header__right-menu']}>
          {topMenu.map((item, i) => (
            <li className={item.path === actived ? styles['--actived'] : ''} key={i}>
              <Link to={item.path} onClick={() => setActvied(item.path)}>
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
        <div className={styles['header__right-wrapper']}>
          <div className={styles['header__right-search']}>
            <SearchOutlined />
            <input type="text" placeholder="搜索" />
          </div>
          <div className={styles['header__right-icons']}>
            {[SettingOutlined, MailOutlined, SkinOutlined, CompressOutlined].map((Icon, i) => (
              <Icon key={i} />
            ))}
          </div>
        </div>
      </div>
    </header>
  );
};
export default List;
