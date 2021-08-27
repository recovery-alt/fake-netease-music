import React, { useState } from 'react';
import { createPortal } from 'react-dom';
import styles from './music-detail.module.less';
import classNames from 'classnames';
import Cover from './components/cover';
import ButtonGroup from './components/button-group';
import Lyric from './components/lyric';
import CommentGroup from './components/comment-group';
import { Music, Track } from '@/api';
import Img from '@/components/img';
import avatar from '@/assets/img/avatar.svg';
import { useSelector } from 'react-redux';
import { RootState } from '@/store';

type Props = { visible: boolean };

const MusicDetail: React.FC<Props> = ({ visible }) => {
  const currentMusic = useSelector((state: RootState) => {
    const { current, tracks } = state.currentTrack;
    if (current < 0) return;

    return transformTrack2Music(tracks[current]);
  });

  function transformTrack2Music(track: Track): Music {
    const { name, id, dt: duration, al: album, ar: artists } = track;
    return { id, name, duration, album, artists };
  }

  const dom = document.getElementById('popup')!;
  return createPortal(
    <>
      {visible && <div className={styles['music-detail__shim']}></div>}
      <div className={classNames(styles['music-detail'], { [styles['--show']]: visible })}>
        <section className={styles['music-detail__player']}>
          <div>
            {currentMusic && <Cover img={currentMusic.album.picUrl} pause={false} />}
            <ButtonGroup />
          </div>
          {currentMusic && <Lyric music={currentMusic} />}
        </section>
        <div className={styles['music-detail__info']}>
          {currentMusic && <CommentGroup currentMusic={currentMusic} />}
          <div className={styles['music-detail__recommend']}>
            <h2 className="fm__title">包含这首歌的歌单</h2>
            {Array(3)
              .fill(0)
              .map((item, i) => (
                <div key={i} className={styles['music-detail__item']}>
                  <Img className={styles['music-detail__img']} src={avatar} />
                  <div className={styles['music-detail__item-info']}>
                    <div>只要能遇到你，就不怕姗姗来迟</div>
                    <div>李宗盛 林忆莲</div>
                  </div>
                </div>
              ))}
            <h2 className="fm__title">相似歌曲</h2>
            {Array(5)
              .fill(0)
              .map((item, i) => (
                <div key={i} className={styles['music-detail__item']}>
                  <Img className={styles['music-detail__img']} src={avatar} />
                  <div className={styles['music-detail__item-info']}>
                    <div>只要能遇到你，就不怕姗姗来迟</div>
                    <div>李宗盛 林忆莲</div>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
    </>,
    dom
  );
};

export default MusicDetail;
