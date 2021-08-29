import React from 'react';
import { createPortal } from 'react-dom';
import styles from './music-detail.module.less';
import classNames from 'classnames';
import Cover from './components/cover';
import ButtonGroup from './components/button-group';
import Lyric from './components/lyric';
import CommentGroup from './components/comment-group';
import { Music, Track } from '@/api';
import { useSelector } from 'react-redux';
import { RootState } from '@/store';
import { VerticalAlignMiddleOutlined } from '@ant-design/icons';
import Recommend from './components/recommend';

type Props = { visible: boolean; setVisible: (visible: boolean) => void };

const MusicDetail: React.FC<Props> = ({ visible, setVisible }) => {
  const currentMusic = useSelector((state: RootState) => {
    const { current, tracks, fm } = state.currentTrack;
    if (current < 0 || fm.length > 0) return;

    return transformTrack2Music(tracks[current]);
  });

  function transformTrack2Music(track: Track): Music {
    const { name, id, dt: duration, al: album, ar: artists } = track;
    return { id, name, duration, album, artists };
  }

  return createPortal(
    <>
      {visible && currentMusic && (
        <div className={styles['music-detail__shim']}>
          <VerticalAlignMiddleOutlined onClick={() => setVisible(false)} />
        </div>
      )}
      {currentMusic && (
        <div className={classNames(styles['music-detail'], { [styles['--show']]: visible })}>
          <section className={styles['music-detail__player']}>
            <div>
              <Cover img={currentMusic.album.picUrl} pause={false} />
              <ButtonGroup />
            </div>
            <Lyric music={currentMusic} />
          </section>
          <div className={styles['music-detail__info']}>
            <CommentGroup currentMusic={currentMusic} />
            <Recommend id={currentMusic.id} />
          </div>
        </div>
      )}
    </>,
    document.getElementById('music-detail')!
  );
};

export default MusicDetail;
