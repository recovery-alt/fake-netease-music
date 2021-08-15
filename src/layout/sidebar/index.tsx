import React, { useState, useEffect } from 'react';
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
import Login from '@/components/login';
import { useSelector, useDispatch } from 'react-redux';
import { AppDispatch, RootState } from '@/store';
import { local } from '@/utils';
import { UserInfo } from '@/api';
import { setUserInfoFromCache } from '@/reducer';
import json from 'json5';
import classNames from 'classnames';

const List: React.FC = () => {
  type Menu = { name: string; icon: React.FC; path: string };
  type ItemProps = { menu: Menu; i: number; plus?: number };

  const menuList: Array<Menu> = [
    { name: '发现音乐', icon: CustomerServiceOutlined, path: '/find-music' },
    { name: '私人FM', icon: TeamOutlined, path: '/fm' },
    { name: '视频', icon: PlaySquareOutlined, path: '/video' },
    { name: '朋友', icon: TeamOutlined, path: '/friend' },
    { name: 'iTunes音乐', icon: CustomerServiceOutlined, path: '/i-tunes' },
    { name: '下载管理', icon: DownloadOutlined, path: '/download' },
    { name: '最近播放', icon: FieldTimeOutlined, path: '/recent' },
    { name: '我的音乐云盘', icon: CloudOutlined, path: '/cloud-music' },
    { name: '我的电台', icon: NotificationOutlined, path: '/radio' },
    { name: '我的收藏', icon: StarOutlined, path: '/collection' },
    { name: '我喜欢的音乐', icon: HeartOutlined, path: '/list' },
  ];

  const [selected, setSelected] = useState(0);
  const history = useHistory();
  const { pathname } = useLocation();
  const [showLogin, setShowLogin] = useState(false);
  const { profile } = useSelector((state: RootState) => state.user);
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    const index = menuList.findIndex(menu => pathname.includes(menu.path));
    if (index > -1) {
      setSelected(index);
    } else {
      setSelected(0);
      history.push('/find-music');
    }

    const userInfo = local.get('userInfo');
    if (!userInfo) return;
    dispatch(setUserInfoFromCache(json.parse<UserInfo>(userInfo)));
  }, [pathname]);

  const handleMenuClick = ({ menu, i, plus = 0 }: ItemProps) => {
    setSelected(i + plus);
    history.push(menu.path);
  };

  const Item: React.FC<ItemProps> = ({ menu, i, plus = 0 }) => (
    <div
      key={i}
      className={classNames(styles.sidebar__item, { [styles['--actived']]: i + plus === selected })}
      onClick={() => handleMenuClick({ menu, i, plus })}
    >
      <menu.icon />
      <a>{menu.name}</a>
    </div>
  );

  const login = () => {
    setShowLogin(true);
  };

  return (
    <aside className={styles.sidebar}>
      <header className={styles.sidebar__header}>
        <img src={profile.avatarUrl} alt="icon" />
        <strong onClick={login}>{profile.nickname}</strong>
        <CaretRightOutlined onClick={login} />
      </header>
      <Scrollbar className={styles.sidebar__main}>
        {menuList.slice(0, 4).map((item, i) => (
          <Item key={i} menu={item} i={i} />
        ))}
        <div className={styles.sidebar__title}>我的音乐</div>
        {menuList.slice(4, 10).map((item, i) => (
          <Item key={i} menu={item} i={i} plus={4} />
        ))}
        <div className={styles.sidebar__title}>
          <div className={styles['sidebar__title-left']}>
            <CaretDownOutlined />
            <a>创建的歌单</a>
          </div>
          <PlusOutlined className={styles['sidebar__title-right']} />
        </div>
        {menuList.slice(10).map((item, i) => (
          <Item key={i} menu={item} i={i} plus={10} />
        ))}
      </Scrollbar>
      {showLogin && <Login setShowLogin={setShowLogin} />}
    </aside>
  );
};

export default List;
