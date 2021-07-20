import React from 'react';
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

const List: React.FC = () => (
  <header className={styles.header}>
    <div className={styles.header__left}>
      <LeftOutlined className={styles['header__left-icon']} />
      <RightOutlined className={styles['header__left-icon']} />
    </div>
    <div className={styles.header__right}>
      <ul className={styles['header__right-menu']}>
        {['个性推荐', '歌单', '主播电台', '排行榜', '歌手', '最新音乐'].map((item, i) => (
          <li className={i === 0 ? styles['--actived'] : ''} key={item}>
            {item}
          </li>
        ))}
      </ul>
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
  </header>
);
export default List;
