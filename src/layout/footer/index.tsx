import React, { useEffect, useState } from 'react';
import styles from './footer.module.less';
import ProgressBar from './progress-bar';
import {
  HeartOutlined,
  VerticalRightOutlined,
  PlayCircleFilled,
  VerticalLeftOutlined,
  DeleteOutlined,
  ControlOutlined,
  RetweetOutlined,
  UnorderedListOutlined,
  SoundOutlined,
} from '@ant-design/icons';
import avatar from '@/assets/img/avatar.svg';

const List: React.FC = () => {
  return (
    <footer className={styles.footer}>
      <audio controls>
        <source src="http://m7.music.126.net/20210731233401/32df22126fe104a661cf34e1d4deb898/ymusic/0fd6/4f65/43ed/a8772889f38dfcb91c04da915b301617.mp3"></source>
      </audio>
      <ProgressBar />
      <div className={styles.footer__left}>
        <img src={avatar} alt="music" />
        <div className={styles['footer__left-name']}>
          <div>老街 - 李荣浩</div>
          <div>01:30 / 04:50</div>
        </div>
      </div>
      <div className={styles.footer__mid}>
        <HeartOutlined />
        <VerticalRightOutlined className={styles['--red']} />
        <PlayCircleFilled className={`${styles['--big']} ${styles['--red']}`} />
        <VerticalLeftOutlined className={styles['--red']} />
        <DeleteOutlined />
      </div>
      <div className={styles.footer__right}>
        <ControlOutlined />
        <RetweetOutlined />
        <UnorderedListOutlined />
        <span>词</span>
        <SoundOutlined />
      </div>
    </footer>
  );
};
export default List;
