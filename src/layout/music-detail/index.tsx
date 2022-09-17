import {
  DeleteOutlined,
  HeartOutlined,
  MoreOutlined,
  VerticalAlignMiddleOutlined,
  VerticalLeftOutlined,
} from '@ant-design/icons';
import classNames from 'classnames';
import { FC } from 'react';
import { createPortal } from 'react-dom';
import { useDispatch, useSelector } from 'react-redux';

import { getCommentDJ, getCommentMusic } from '@/api';
import CommentGroup from '@/components/comment-group';
import { AppDispatch, RootState } from '@/store';
import { setShowDetail } from '@/store';
import { Music, Track } from '@/types';
import { classGenerator } from '@/utils';

import ButtonGroup from './button-group';
import Cover from './cover';
import Lyric from './lyric';
import styles from './music-detail.module.less';
import RadioDetail from './radio-detail';
import Recommend from './recommend';
import WriteComment from './write-comment';

type Props = { visible: boolean };

const MusicDetail: FC<Props> = ({ visible }) => {
  const getClass = classGenerator('music-detail', styles);
  const pause = useSelector((state: RootState) => state.controller.pause);
  const dispatch = useDispatch<AppDispatch>();
  const isRadio = useSelector((state: RootState) => !state.currentTrack.song?.flag);
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
        <div className={getClass('shim')}>
          <VerticalAlignMiddleOutlined onClick={() => dispatch(setShowDetail(false))} />
        </div>
      )}
      {currentMusic && (
        <div className={classNames(getClass(), { [styles['--show']]: visible })}>
          <section className={getClass('player')}>
            <div>
              <Cover img={currentMusic.album.picUrl} pause={pause} />
              <ButtonGroup data={data} />
            </div>
            {isRadio ? <RadioDetail music={currentMusic} /> : <Lyric music={currentMusic} />}
          </section>
          <div className={getClass('info')}>
            <CommentGroup
              id={currentMusic?.id}
              api={isRadio ? getCommentDJ : getCommentMusic}
              functionChildren={(count: number) => <WriteComment count={count} />}
            />

            {!isRadio && <Recommend id={currentMusic?.id} />}
          </div>
        </div>
      )}
    </>,
    document.getElementById('music-detail')!
  );
};

export default MusicDetail;
