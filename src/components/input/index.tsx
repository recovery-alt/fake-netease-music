import React from 'react';
import styles from './input.module.less';
import { SearchOutlined } from '@ant-design/icons';

const Input: React.FC = () => (
  <div className={styles.input}>
    <input type="text" placeholder="搜索下载歌曲" />
    <div className={styles.input__icon}>
      <SearchOutlined />
    </div>
  </div>
);

export default Input;
