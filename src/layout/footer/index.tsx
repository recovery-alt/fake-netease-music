import React, { useRef, useEffect } from 'react';
import styles from './footer.module.less';
import {
  HeartOutlined,
  StepBackwardOutlined,
  StepForwardOutlined,
  DeleteOutlined,
  ControlOutlined,
  UnorderedListOutlined,
  SoundOutlined,
} from '@ant-design/icons';
import classNames from 'classnames';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, changeSong, setSong, nextFM, setCurrentTime, setShowDetail } from '@/store';
import { formatMS } from '@/utils';
import { useCurrentTime, useMusicList, usePause, usePlayMode, useLyric, useVolume } from './hooks';
import { Tooltip, Slider } from 'antd';
import { PlayMode } from '@/enum';
import MusicDetail from '../music-detail';
import MusicList from '../music-list';
import { Music } from '@/types';
import { useHistory } from 'react-router-dom';

const List: React.FC = () => {
  const audioRef = useRef<HTMLAudioElement>(null);
  const progressRef = useRef<HTMLProgressElement>(null);
  const dispatch = useDispatch();
  const { push } = useHistory();
  const showDetail = useSelector((state: RootState) => state.controller.showDetail);
  const { listButtonRef, showList, setShowList } = useMusicList();
  const isFMMode = useSelector((state: RootState) => state.currentTrack.fm.length);
  const { lyricActived, setLyricActived } = useLyric();

  const currentTrack = useSelector((state: RootState) => {
    const { current, tracks, fm } = state.currentTrack;
    if (current < 0) return;
    if (!isFMMode) return tracks[current];
    if (fm[current]) return transformMusic2Track(fm[current]);
  });

  const isLastSong = useSelector((state: RootState) => {
    const { current, tracks } = state.currentTrack;
    return current + 1 === tracks.length;
  });

  const song = useSelector((state: RootState) => state.currentTrack.song);
  const { PlayIcon, pause, handlePause } = usePause(audioRef, currentTrack);
  const { currentTime, handleTimeUpdate, handleProgressClick } = useCurrentTime(
    audioRef,
    progressRef,
    currentTrack?.dt
  );

  const { playMode, handleIconClick, currentPlayMode } = usePlayMode();

  const { volume, handleSliderChange, handleVolumeChange } = useVolume(audioRef);

  function transformMusic2Track(music: Music) {
    const { id, name, duration: dt, album: al, artists: ar } = music;
    return { id, name, dt, al, ar };
  }

  function handlePlayEnded() {
    if (isFMMode) {
      dispatch(nextFM());
      return;
    }

    if (!currentTrack) return;
    if (playMode === PlayMode.SOLO) return;
    if (playMode === PlayMode.IN_TURN && isLastSong) {
      dispatch(setCurrentTime(0));
    } else {
      dispatch(changeSong({ mode: playMode, next: true }));
    }
  }

  function handleCurrentSongChange(next: boolean) {
    if (!isFMMode && currentTrack) {
      dispatch(changeSong({ mode: playMode, next }));
      return;
    }

    if (next) dispatch(nextFM());
  }

  function handleCoverClick() {
    if (isFMMode) push('/fm');

    dispatch(setShowDetail(!showDetail));
  }

  useEffect(() => {
    if (!currentTrack?.id) return;
    dispatch(setSong(currentTrack.id));
  }, [currentTrack?.id]);

  return (
    <footer className={styles.footer}>
      {currentTrack?.dt && (
        <progress
          ref={progressRef}
          className={styles['footer__progress-bar']}
          value={currentTime}
          max={currentTrack.dt}
          onClick={handleProgressClick}
        />
      )}
      <div className={styles.footer__left}>
        {currentTrack && song && (
          <>
            <audio
              ref={audioRef}
              src={song.url}
              controls
              loop={playMode === PlayMode.SOLO}
              autoPlay
              onTimeUpdate={handleTimeUpdate}
              onPlay={() => handlePause(false)}
              onPause={() => handlePause(true)}
              onEnded={handlePlayEnded}
              onVolumeChange={handleVolumeChange}
            />
            <img src={currentTrack.al.picUrl} alt="music" onClick={handleCoverClick} />
            <div className={styles['footer__left-name']}>
              <div>
                {currentTrack.name} -{' '}
                {currentTrack.ar.reduce((acc, val) => `${acc}/${val.name}`, '').slice(1)}
              </div>
              <div>
                {formatMS(currentTime)} / {formatMS(currentTrack.dt)}
              </div>
            </div>
          </>
        )}
      </div>
      <div className={styles.footer__mid}>
        <HeartOutlined />
        <StepBackwardOutlined
          className={classNames(styles['--medium'], styles['--red'], {
            [styles['--disable']]: isFMMode,
          })}
          onClick={() => handleCurrentSongChange(false)}
        />
        <PlayIcon
          className={classNames(styles['--big'], styles['--red'])}
          onClick={() => handlePause(!pause)}
        />
        <StepForwardOutlined
          className={classNames(styles['--medium'], styles['--red'])}
          onClick={() => handleCurrentSongChange(true)}
        />
        <DeleteOutlined />
      </div>
      <div className={styles.footer__right}>
        {!isFMMode && <ControlOutlined />}
        <Tooltip title={currentPlayMode.tip}>
          <currentPlayMode.icon onClick={handleIconClick} />
        </Tooltip>
        {!isFMMode && currentTrack && (
          <UnorderedListOutlined ref={listButtonRef} onClick={() => setShowList(!showList)} />
        )}
        <span
          className={classNames(styles['footer__lyric'], { [styles['--active']]: lyricActived })}
          onClick={() => setLyricActived(!lyricActived)}
        >
          词
        </span>
        {currentTrack && (
          <Tooltip
            title={() => (
              <div className={styles['footer__volume']}>
                <Slider vertical value={volume} onChange={handleSliderChange} />
              </div>
            )}
          >
            <SoundOutlined />
          </Tooltip>
        )}
      </div>
      <MusicDetail visible={showDetail} />
      <MusicList visible={showList} setVisible={setShowList} target={listButtonRef.current} />
    </footer>
  );
};
export default List;
