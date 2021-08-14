import React from 'react';
import styles from './header.module.less';
import { PlayCircleFilled, PlusOutlined, SearchOutlined } from '@ant-design/icons';

const Header: React.FC = () => (
  <header className={styles.header}>
    <div className={styles.header__left}>
      <div className={styles.header__button}>
        <div className={styles['header__button-left']}>
          <PlayCircleFilled />
          播放全部
        </div>
        <div className={styles['header__button-right']}>
          <PlusOutlined />
        </div>
      </div>
      <div className={styles['header__directory']}>打开目录</div>
    </div>
    <div className={styles.header__right}>
      <input type="text" placeholder="搜索下载歌曲" />
      <div className={styles.header__icon}>
        <SearchOutlined />
      </div>
    </div>
  </header>
);

export default Header;
