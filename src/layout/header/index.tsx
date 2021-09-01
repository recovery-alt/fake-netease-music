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
import { Link, useLocation, useHistory } from 'react-router-dom';
import classNames from 'classnames';

const List: React.FC = () => {
  const [active, setActived] = useState('');
  const [topMenu, setTopMenu] = useState<Array<MenuConfig>>([]);
  const { pathname } = useLocation();
  const { go, push } = useHistory();

  const buttonList = [
    {
      icon: SettingOutlined,
      event: () => {
        push('/setting');
      },
    },
    { icon: MailOutlined },
    { icon: SkinOutlined },
    { icon: CompressOutlined },
  ];

  useEffect(() => {
    if (!pathname) return;
    const match = pathname.match(/(?<=\/)[\w-\d]+\b/);
    if (match?.[0]) setTopMenu(topMenuMap[match[0]] || []);
    let pathArr = pathname.split('/');
    if (pathArr.length > 3) pathArr = pathArr.slice(0, 3);

    // 前两位相等 即选中
    setActived(pathArr.join('/'));
  }, [pathname]);

  function handleHistoryChange(next = false) {
    go(next ? 1 : -1);
  }

  return (
    <header className={styles.header}>
      <div className={styles.header__left}>
        <LeftOutlined
          className={styles['header__left-icon']}
          onClick={() => handleHistoryChange()}
        />
        <RightOutlined
          className={styles['header__left-icon']}
          onClick={() => handleHistoryChange(true)}
        />
      </div>
      <div className={styles.header__right}>
        <ul className={styles['header__right-menu']}>
          {topMenu.map(item => (
            <li
              key={item.path}
              className={classNames({ [styles['--active']]: item.path === active })}
            >
              <Link to={item.path} onClick={() => setActived(item.path)}>
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
            {buttonList.map((item, i) => (
              <item.icon key={i} onClick={item.event} />
            ))}
          </div>
        </div>
      </div>
    </header>
  );
};
export default List;
