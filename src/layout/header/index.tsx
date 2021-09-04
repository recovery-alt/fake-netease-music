import React, { useState, useEffect, KeyboardEventHandler } from 'react';
import styles from './header.module.less';
import {
  LeftOutlined,
  RightOutlined,
  SettingOutlined,
  MailOutlined,
  SkinOutlined,
  CompressOutlined,
} from '@ant-design/icons';
import { topMenuMap, MenuConfig } from '@/config';
import { Link, useLocation, useHistory } from 'react-router-dom';
import classNames from 'classnames';
import Input from '@/components/input';
import SearchList from '@/layout/search-list';

const List: React.FC = () => {
  const [active, setActive] = useState('');
  const [topMenu, setTopMenu] = useState<Array<MenuConfig>>([]);
  const { pathname } = useLocation();
  const { go, push } = useHistory();
  const [showSearch, setShowSearch] = useState(false);
  const [inputVal, setInputVal] = useState('');
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

  const handleMouseup: KeyboardEventHandler = e => {
    if (e.key === 'Enter' && inputVal) {
      console.log(inputVal);
    }
  };

  useEffect(() => {
    if (!pathname) return;
    const match = pathname.match(/(?<=\/)[\w-\d]+\b/);
    if (match?.[0]) setTopMenu(topMenuMap[match[0]] || []);
    let pathArr = pathname.split('/');
    if (pathArr.length > 3) pathArr = pathArr.slice(0, 3);

    // 前两位相等 即选中
    setActive(pathArr.join('/'));
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
              <Link to={item.path} onClick={() => setActive(item.path)}>
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
        <div className={styles['header__right-wrapper']}>
          <Input
            type="normal"
            placeholder="搜索"
            value={inputVal}
            onInput={e => setInputVal(e.currentTarget.value)}
            onFocus={() => setShowSearch(true)}
            onKeyUp={handleMouseup}
          />
          <div className={styles['header__right-icons']}>
            {buttonList.map((item, i) => (
              <item.icon key={i} onClick={item.event} />
            ))}
          </div>
        </div>
      </div>
      <SearchList visible={showSearch} setVisible={setShowSearch} keyword={inputVal} />
    </header>
  );
};
export default List;
