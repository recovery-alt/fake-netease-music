import React from 'react';
import { createPortal } from 'react-dom';
import styles from './music-detail.module.less';
import classNames from 'classnames';
import Cover from './cover';
import ButtonGroup from './button-group';
import Lyric from './lyric';
import CommentGroup from './comment-group';
import { Music, Track } from '@/types';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@/store';
import Recommend from './recommend';
import {
  VerticalAlignMiddleOutlined,
  HeartOutlined,
  DeleteOutlined,
  VerticalLeftOutlined,
  MoreOutlined,
} from '@ant-design/icons';
import { setShowDetail } from '@/store';

type Props = { visible: boolean };

const MusicDetail: React.FC<Props> = ({ visible }) => {
  const pause = useSelector((state: RootState) => state.controller.pause);
  const dispatch = useDispatch();
  const currentMusic = useSelector((state: RootState) => {
    const { current, tracks, fm } = state.currentTrack;
    if (current < 0 || fm.length > 0) return;
    if (tracks[current]) return transformTrack2Music(tracks[current]);
  });
  const data = [
    { icon: HeartOutlined },
    { icon: DeleteOutlined },
    { icon: VerticalLeftOutlined },
    { icon: MoreOutlined },
  ];

  function transformTrack2Music(track: Track): Music {
    const { name, id, dt: duration, al: album, ar: artists } = track;
    return { id, name, duration, album, artists };
  }

  return createPortal(
    <>
      {visible && currentMusic && (
        <div className={styles['music-detail__shim']}>
          <VerticalAlignMiddleOutlined onClick={() => dispatch(setShowDetail(false))} />
        </div>
      )}
      {currentMusic && (
        <div className={classNames(styles['music-detail'], { [styles['--show']]: visible })}>
          <section className={styles['music-detail__player']}>
            <div>
              <Cover img={currentMusic.album.picUrl} pause={pause} />
              <ButtonGroup data={data} />
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
