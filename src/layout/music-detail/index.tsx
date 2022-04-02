import { FC } from 'react';
import { createPortal } from 'react-dom';
import styles from './music-detail.module.less';
import classNames from 'classnames';
import Cover from './cover';
import ButtonGroup from './button-group';
import Lyric from './lyric';
import CommentGroup from '@/components/comment-group';
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
import WriteComment from './write-comment';
import { getCommentDJ, getCommentMusic } from '@/api';
import { classGenerator } from '@/utils';
import RadioDetail from './radio-detail';

type Props = { visible: boolean };

const MusicDetail: FC<Props> = ({ visible }) => {
  const getClass = classGenerator('music-detail', styles);
  const pause = useSelector((state: RootState) => state.controller.pause);
  const dispatch = useDispatch();
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
