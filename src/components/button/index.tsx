import React from 'react';
import styles from './button.module.less';
import { PlayCircleOutlined, PlusOutlined } from '@ant-design/icons';

const Button: React.FC = () => (
  <div className={styles.button}>
    <div className={styles.button__left}>
      <PlayCircleOutlined />
      播放全部
    </div>
    <div className={styles.button__right}>
      <PlusOutlined />
    </div>
  </div>
);

export default Button;
