import {
  CaretDownOutlined,
  CaretRightOutlined,
  CloudOutlined,
  CustomerServiceOutlined,
  DownloadOutlined,
  FieldTimeOutlined,
  HeartOutlined,
  NotificationOutlined,
  PlaySquareOutlined,
  PlusOutlined,
  StarOutlined,
  TeamOutlined,
} from '@ant-design/icons';
import classNames from 'classnames';
import json from 'json5';
import { FC, useEffect, useReducer, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useLocation } from 'react-router-dom';

import Scrollbar from '@/components/scrollbar';
import { DynamicPage, Page } from '@/router';
import { AppDispatch, RootState, setUserInfoFromCache, setUserPlaylist } from '@/store';
import { UserInfo } from '@/types';
import { classGenerator, local, resizeImg, toHttps } from '@/utils';

import Login from '../login';
import styles from './sidebar.module.less';

type Menu = { name: string; icon: FC; path: string; loginShow?: boolean };
type MenuItem = { title?: string; menus: Menu[] };
type ItemProps = { menu: Menu; index: [number, number]; plus?: number };

const List: FC = () => {
  const getClass = classGenerator('sidebar', styles);
  const [selected, setSelected] = useState<number[]>();
  const { push } = useHistory();
  const { pathname } = useLocation();
  const [showLogin, setShowLogin] = useState(false);
  const { profile, cookie } = useSelector((state: RootState) => state.user);
  const playlist = useSelector((state: RootState) => state.userPlaylist.playlist);
  const dispatch = useDispatch<AppDispatch>();
  const initMenuList = [
    {
      menus: [
        { name: '发现音乐', icon: CustomerServiceOutlined, path: Page.findMusic },
        { name: '私人FM', icon: TeamOutlined, path: Page.fm },
        { name: '视频', icon: PlaySquareOutlined, path: Page.video, loginShow: true },
        { name: '朋友', icon: TeamOutlined, path: Page.friend },
      ],
    },
    {
      title: '我的音乐',
      menus: [
        { name: 'iTunes音乐', icon: CustomerServiceOutlined, path: Page.iTunes },
        { name: '下载管理', icon: DownloadOutlined, path: Page.download },
        { name: '最近播放', icon: FieldTimeOutlined, path: Page.recent },
        { name: '我的音乐云盘', icon: CloudOutlined, path: Page.cloudMusic, loginShow: true },
        { name: '我的电台', icon: NotificationOutlined, path: Page.radio, loginShow: true },
        { name: '我的收藏', icon: StarOutlined, path: Page.collection, loginShow: true },
      ],
    },
    {
      title: '创建的歌单',
      menus: [{ name: '我喜欢的音乐', icon: HeartOutlined, path: DynamicPage.list('') }],
    },
  ];
  const [menuList, menuListDispatch] = useReducer(menuListReducer, initMenuList);

  const Item: FC<ItemProps> = ({ menu, index }) => {
    const active = judgeSelected(selected, index);
    return (
      <div
        key={menu.path}
        className={classNames(getClass('item'), {
          [styles['--active']]: active,
        })}
        onClick={() => handleMenuClick({ menu, index })}
      >
        <menu.icon />
        <a>{menu.name}</a>
      </div>
    );
  };

  function menuListReducer(state: MenuItem[], payload: MenuItem[]) {
    const newState = state.slice(0, 2);
    return [...newState, ...payload];
  }

  function handleMenuClick({ menu, index }: ItemProps) {
    setSelected(index);
    push(menu.path);
  }

  function login() {
    setShowLogin(true);
  }

  function recoverLoginFromCache() {
    const userInfoStr = local.get('userInfo');
    if (!userInfoStr) return;
    const userInfo = json.parse<UserInfo>(userInfoStr);
    dispatch(setUserInfoFromCache(userInfo));
    const { userId } = userInfo.profile;
    dispatch(setUserPlaylist(userId));
  }

  function findIndex() {
    for (let i = 0, len = menuList.length; i < len; i++) {
      const { menus } = menuList[i];
      for (let j = 0, len = menus.length; j < len; j++) {
        const menu = menus[j];
        if (pathname.includes(menu.path)) return [i, j];
      }
    }
  }

  function judgeSelected(a?: number[], b?: number[]) {
    if (!a || !b) return false;
    if (a.length !== a.length) return false;

    for (let i = 0, len = a.length; i < len; i++) {
      if (a[i] !== b[i]) return false;
    }

    return true;
  }

  function renderTitle(item: MenuItem, i: number) {
    if (!item.title) return;
    return (
      <div className={getClass('title')}>
        {i < 2 ? (
          item.title
        ) : (
          <>
            <div className={getClass('title-left')}>
              <CaretDownOutlined />
              <strong>{item.title}</strong>
            </div>
            {item.title === '创建的歌单' && <PlusOutlined className={getClass('title-right')} />}
          </>
        )}
      </div>
    );
  }

  function handleAvatarClick() {
    cookie ? push({ pathname: DynamicPage.user(profile.userId), state: true }) : setShowLogin(true);
  }

  useEffect(() => {
    const index = findIndex();
    setSelected(index);
  }, [pathname]);

  useEffect(() => {
    recoverLoginFromCache();
  }, []);

  useEffect(() => {
    const payload: MenuItem[] = [
      { title: '创建的歌单', menus: [] },
      { title: '收藏的歌单', menus: [] },
    ];
    if (!playlist || playlist.length === 0) return;
    playlist.forEach(item => {
      const { name, id, userId } = item;
      const path = DynamicPage.list(id);
      const menu = { name, path, icon: CustomerServiceOutlined };
      const index = userId === profile.userId ? 0 : 1;
      payload[index].menus.push(menu);
    });
    menuListDispatch(payload);
  }, [playlist]);

  return (
    <aside className={getClass()}>
      <header className={getClass('header')}>
        <img
          src={toHttps(resizeImg(profile.avatarUrl, 100))}
          alt="icon"
          onClick={handleAvatarClick}
        />
        <strong onClick={login}>{profile.nickname}</strong>
        <CaretRightOutlined onClick={login} />
      </header>
      <Scrollbar className={getClass('main')}>
        {menuList.map((item, i) => {
          return (
            <div key={i}>
              {renderTitle(item, i)}
              {item.menus.map((menu, j) =>
                cookie || !menu.loginShow ? <Item key={j} menu={menu} index={[i, j]} /> : null
              )}
            </div>
          );
        })}
      </Scrollbar>
      {showLogin && <Login setShowLogin={setShowLogin} />}
    </aside>
  );
};

export default List;
