import React, { useState, useEffect } from 'react';
import styles from './sidebar.module.less';
import avatar from '@/assets/img/avatar.svg';
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
} from '@ant-design/icons';
import { useHistory, useLocation } from 'react-router-dom';
import Scrollbar from '@/components/scrollbar';
import Login from '@/components/login';
import { useStore } from 'react-redux';
import { RootState } from '@/store';

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
    { name: '我喜欢的音乐', icon: HeartOutlined, path: '/list' },
  ];

  const [selected, setSelected] = useState(0);
  const history = useHistory();
  const { pathname } = useLocation();
  const [showLogin, setShowLogin] = useState(false);
  const store = useStore<RootState>().getState();

  useEffect(() => {
    const index = menuList.findIndex(menu => pathname.includes(menu.path));
    if (index > -1) {
      setSelected(index);
    } else {
      setSelected(0);
      history.push('/find-music');
    }
  }, [pathname]);

  const handleMenuClick = ({ menu, i, plus = 0 }: ItemProps) => {
    setSelected(i + plus);
    history.push(menu.path);
  };

  const Item: React.FC<ItemProps> = ({ menu, i, plus = 0 }) => (
    <div
      key={i}
      className={`${styles.sidebar__item} ${i + plus === selected ? styles['--actived'] : ''}`}
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
        <img src={store.user.profile.avatarUrl || avatar} alt="icon" />
        <strong onClick={login}>{store.user.profile.nickname || '未登录'}</strong>
        <CaretRightOutlined onClick={login} />
      </header>
      <Scrollbar className={styles.sidebar__main}>
        {menuList.slice(0, 4).map((item, i) => (
          <Item key={i} menu={item} i={i} />
        ))}
        <div className={styles.sidebar__title}>我的音乐</div>
        {menuList.slice(4, 7).map((item, i) => (
          <Item key={i} menu={item} i={i} plus={4} />
        ))}
        <div className={styles.sidebar__title}>
          <div className={styles['sidebar__title-left']}>
            <CaretDownOutlined />
            <a>创建的歌单</a>
          </div>
          <PlusOutlined className={styles['sidebar__title-right']} />
        </div>
        {menuList.slice(7).map((item, i) => (
          <Item key={i} menu={item} i={i} plus={7} />
        ))}
      </Scrollbar>
      {showLogin && <Login setShowLogin={setShowLogin} />}
    </aside>
  );
};

export default List;
