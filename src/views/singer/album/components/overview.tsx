import React from 'react';
import styles from '../album.module.less';
import Img from '@/components/img';
import { PlayCircleOutlined, FileAddOutlined } from '@ant-design/icons';
import Table, { Column } from '@/components/table';

const Overview: React.FC = () => {
  const columns: Column[] = [
    { key: 'ordinal', title: '' },
    { key: 'title', title: '音乐标题' },
    { key: 'artist', title: '歌手' },
    { key: 'time', title: '播放时间' },
  ];

  return (
    <div className={styles.overview}>
      <section className={styles.overview__item}>
        <Img src="" className={styles.overview__img} />
        <div className={styles.overview__right}>
          <header className={styles.overview__header}>
            <h2>热门50首</h2>
            <div className={styles.overview__icon}>
              <PlayCircleOutlined />
              <FileAddOutlined />
            </div>
          </header>
          <div className={styles.overview__table}>
            <Table noHead columns={columns} data={[]} />
            <footer className={styles.overview__footer}>
              <div>查看全部 &gt;</div>
            </footer>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Overview;
