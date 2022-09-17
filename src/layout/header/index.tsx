import {
  CompressOutlined,
  LeftOutlined,
  MailOutlined,
  RightOutlined,
  SettingOutlined,
  SkinOutlined,
} from '@ant-design/icons';
import classNames from 'classnames';
import { stringify } from 'qs';
import { FC, KeyboardEventHandler, useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useHistory, useLocation } from 'react-router-dom';

import Input from '@/components/input';
import SearchList from '@/layout/search-list';
import { MenuConfig, Page, topMenuMap } from '@/router';
import { AppDispatch, RootState, setKeywords } from '@/store';
import { classGenerator } from '@/utils';

import styles from './header.module.less';

const List: FC = () => {
  const getClass = classGenerator('header', styles);
  const [active, setActive] = useState('');
  const [topMenu, setTopMenu] = useState<Array<MenuConfig>>([]);
  const { pathname } = useLocation();
  const { go, push } = useHistory();
  const [showSearch, setShowSearch] = useState(false);
  const keywords = useSelector((state: RootState) => state.controller.keywords);
  const inputRef = useRef<HTMLInputElement>(null);
  const dispatch = useDispatch<AppDispatch>();
  const buttonList = [
    {
      icon: SettingOutlined,
      event: () => {
        push(Page.setting);
      },
    },
    { icon: MailOutlined },
    { icon: SkinOutlined },
    { icon: CompressOutlined },
  ];

  const handleMouseup: KeyboardEventHandler = e => {
    if (e.key === 'Enter' && keywords) {
      setShowSearch(false);
      const query = stringify({ keywords });
      push(`${Page.searchResult}?${query}`);
    }
  };

  function setValue(value: string) {
    dispatch(setKeywords(value));
  }

  function handleHistoryChange(next = false) {
    go(next ? 1 : -1);
  }

  useEffect(() => {
    if (!pathname) return;
    const match = pathname.match(/home\/([\w-\d]+)\b/);
    if (match?.[1]) setTopMenu(topMenuMap[match[1]] || []);
    let pathArr = pathname.split('/');
    if (pathArr.length > 4) pathArr = pathArr.slice(0, 4);

    // 前两位相等 即选中
    setActive(pathArr.join('/'));
  }, [pathname]);

  return (
    <header className={getClass()}>
      <div data-tauri-drag-region className={getClass('left')}>
        <LeftOutlined className={getClass('left-icon')} onClick={() => handleHistoryChange()} />
        <RightOutlined
          className={getClass('left-icon')}
          onClick={() => handleHistoryChange(true)}
        />
      </div>
      <div data-tauri-drag-region className={getClass('right')}>
        <ul className={getClass('right-menu')}>
          {pathname.includes('/home') &&
            topMenu.map(item => (
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
        <div className={getClass('right-wrapper')}>
          <Input
            ref={inputRef}
            type="normal"
            placeholder="搜索"
            value={keywords}
            setValue={setValue}
            onFocus={() => setShowSearch(true)}
            onKeyUp={handleMouseup}
          />
          <div className={getClass('right-icons')}>
            {buttonList.map((item, i) => (
              <item.icon key={i} onClick={item.event} />
            ))}
          </div>
        </div>
      </div>
      <SearchList visible={showSearch} setVisible={setShowSearch} inputRef={inputRef.current} />
    </header>
  );
};
export default List;
