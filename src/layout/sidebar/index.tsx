import React from 'react';
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
} from '@ant-design/icons';

const List: React.FC = () => (
  <aside className={styles.sidebar}>
    <header className={styles.sidebar__header}>
      <img src={avatar} alt="icon" />
      <span>未登录</span>
    </header>
    {[
      { name: '发现音乐', icon: CustomerServiceOutlined },
      { name: '私人FM', icon: TeamOutlined },
      { name: '视频', icon: PlaySquareOutlined },
      { name: '朋友', icon: TeamOutlined },
    ].map((item, i) => (
      <div key={i} className={`${styles.sidebar__item} ${i === 0 ? styles['--actived'] : ''}`}>
        <item.icon />
        <a>{item.name}</a>
      </div>
    ))}
    <div className={styles.sidebar__title}>我的音乐</div>
    {[
      { name: 'iTunes音乐', icon: CustomerServiceOutlined },
      { name: '下载管理', icon: DownloadOutlined },
      { name: '最近播放', icon: FieldTimeOutlined },
    ].map((item, i) => (
      <div key={i} className={`${styles.sidebar__item} ${i === 0 ? styles['--actived'] : ''}`}>
        <item.icon />
        <a>{item.name}</a>
      </div>
    ))}
    <div className={styles.sidebar__title}>
      <div className={styles['sidebar__title-left']}>
        <CaretDownOutlined />
        <a>创建的歌单</a>
      </div>
      <PlusOutlined className={styles['sidebar__title-right']} />
    </div>
    {[{ name: '我喜欢的音乐', icon: HeartOutlined }].map((item, i) => (
      <div key={i} className={`${styles.sidebar__item} ${i === 1 ? styles['--actived'] : ''}`}>
        <item.icon />
        <a>{item.name}</a>
      </div>
    ))}
  </aside>
);
export default List;
