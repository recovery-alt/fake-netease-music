import React from 'react';
import styles from './lyric.module.less';
import Scrollbar from '@/components/scrollbar';
import { QuestionOutlined } from '@ant-design/icons';

const Lyric: React.FC = () => (
  <div className={styles.lyric}>
    <h2>
      <span>活该</span>
      <span className={styles.lyric__quality}>标准音质</span>
    </h2>
    <div className={styles.lyric__info}>
      <p>
        <span>专辑：</span>
        <a>活该</a>
      </p>
      <p>
        <span>歌手：</span>
        <a>周杰伦</a>
      </p>
    </div>
    <div style={{ borderRight: '1px solid #f2f2f2' }}>
      <Scrollbar className={styles.lyric__wrapper}>
        {Array(50)
          .fill(0)
          .map((item, i) => (
            <p key={i}>作词 : 轩东是喜是伤呢 自己去品尝 这人生何其短</p>
          ))}
      </Scrollbar>
    </div>

    <QuestionOutlined className={styles.lyric__question} />
  </div>
);

export default Lyric;
