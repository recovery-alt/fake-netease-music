import React from 'react';
import styles from './tab.module.less';
import Input from '@/components/input';
import classNames from 'classnames';

const Tab: React.FC = () => (
  <div className={styles.tab}>
    <div className={styles.tab__left}>
      {['歌曲评论', '评论(0)', '收藏者'].map((item, i) => (
        <div key={i} className={classNames(styles.tab__item, { [styles['--active']]: i === 0 })}>
          {item}
        </div>
      ))}
    </div>
    <Input />
  </div>
);

export default Tab;
