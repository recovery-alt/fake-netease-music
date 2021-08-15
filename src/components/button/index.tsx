import React from 'react';
import styles from './button.module.less';
import { PlayCircleFilled, PlusOutlined } from '@ant-design/icons';

const Button: React.FC = () => (
  <div className={styles.button}>
    <div className={styles.button__left}>
      <PlayCircleFilled />
      播放全部
    </div>
    <div className={styles.button__right}>
      <PlusOutlined />
    </div>
  </div>
);

export default Button;
