import React, { useState, useEffect, useReducer } from 'react';
import styles from './sidebar.module.less';
import {
  CustomerServiceOutlined,
  TeamOutlined,
  PlaySquareOutlined,
  DownloadOutlined,
  FieldTimeOutlined,
  CaretDownOutlined,
  PlusOutlined,
  HeartOutlined,
  CaretRightOutlined,
  CloudOutlined,
  NotificationOutlined,
  StarOutlined,
} from '@ant-design/icons';
import { useHistory, useLocation } from 'react-router-dom';
import Scrollbar from '@/components/scrollbar';
import Login from '../login';
import { useSelector, useDispatch } from 'react-redux';
import { AppDispatch, RootState, setUserInfoFromCache, setUserPlaylist } from '@/store';
import { local } from '@/utils';
import { UserInfo } from '@/types';
import json from 'json5';
import classNames from 'classnames';

const List: React.FC = () => {
  type Menu = { name: string; icon: React.FC; path: string; loginShow?: boolean };
  type MenuItem = { title?: string; menus: Menu[] };
  type ItemProps = { menu: Menu; index: [number, number]; plus?: number };
  type MenuListAction = { type: number; payload: MenuItem[] };

  const [selected, setSelected] = useState([0, 0]);
  const history = useHistory();
  const { pathname } = useLocation();
  const [showLogin, setShowLogin] = useState(false);
  const { profile, cookie } = useSelector((state: RootState) => state.user);
  const playlist = useSelector((state: RootState) => state.userPlaylist.playlist);
  const dispatch = useDispatch<AppDispatch>();

  const [menuList, menuListDispatch] = useReducer<React.Reducer<MenuItem[], MenuListAction>>(
    (state, action) => {
      const newState = state.slice(0, 2);
      return [...newState, ...action.payload];
    },
    [
      {
        menus: [
          { name: '发现音乐', icon: CustomerServiceOutlined, path: '/find-music' },
          { name: '私人FM', icon: TeamOutlined, path: '/fm' },
          { name: '视频', icon: PlaySquareOutlined, path: '/video', loginShow: true },
          { name: '朋友', icon: TeamOutlined, path: '/friend' },
        ],
      },
      {
        title: '我的音乐',
        menus: [
          { name: 'iTunes音乐', icon: CustomerServiceOutlined, path: '/i-tunes' },
          { name: '下载管理', icon: DownloadOutlined, path: '/download' },
          { name: '最近播放', icon: FieldTimeOutlined, path: '/recent' },
          { name: '我的音乐云盘', icon: CloudOutlined, path: '/cloud-music', loginShow: true },
          { name: '我的电台', icon: NotificationOutlined, path: '/radio', loginShow: true },
          { name: '我的收藏', icon: StarOutlined, path: '/collection', loginShow: true },
        ],
      },
      {
        title: '创建的歌单',
        menus: [{ name: '我喜欢的音乐', icon: HeartOutlined, path: '/list' }],
      },
    ]
  );

  useEffect(() => {
    (async () => {
      const index = findIndex();
      if (index) setSelected(index);
    })();
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
      const path = `/list/${id}`;
      const menu = { name, path, icon: CustomerServiceOutlined };
      const index = userId === profile.userId ? 0 : 1;
      payload[index].menus.push(menu);
    });
    menuListDispatch({ type: 0, payload });
  }, [playlist]);

  const handleMenuClick = ({ menu, index }: ItemProps) => {
    setSelected(index);
    history.push(menu.path);
  };

  const Item: React.FC<ItemProps> = ({ menu, index }) => {
    const active = judgeSelected(selected, index);
    return (
      <div
        key={menu.path}
        className={classNames(styles.sidebar__item, {
          [styles['--active']]: active,
        })}
        onClick={() => handleMenuClick({ menu, index })}
      >
        <menu.icon />
        <a>{menu.name}</a>
      </div>
    );
  };

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

  function judgeSelected(a: number[], b: number[]) {
    if (a.length !== a.length) return false;

    for (let i = 0, len = a.length; i < len; i++) {
      if (a[i] !== b[i]) return false;
    }

    return true;
  }

  function renderTitle(item: MenuItem, i: number) {
    if (!item.title) return;
    return (
      <div className={styles.sidebar__title}>
        {i < 2 ? (
          item.title
        ) : (
          <>
            <div className={styles['sidebar__title-left']}>
              <CaretDownOutlined />
              <strong>{item.title}</strong>
            </div>
            {item.title === '创建的歌单' && (
              <PlusOutlined className={styles['sidebar__title-right']} />
            )}
          </>
        )}
      </div>
    );
  }

  return (
    <aside className={styles.sidebar}>
      <header className={styles.sidebar__header}>
        <img src={profile.avatarUrl} alt="icon" />
        <strong onClick={login}>{profile.nickname}</strong>
        <CaretRightOutlined onClick={login} />
      </header>
      <Scrollbar className={styles.sidebar__main}>
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
