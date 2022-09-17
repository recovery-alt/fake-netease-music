import {
  ControlOutlined,
  DeleteOutlined,
  HeartOutlined,
  LikeOutlined,
  ShareAltOutlined,
  SoundOutlined,
  StepBackwardOutlined,
  StepForwardOutlined,
  UnorderedListOutlined,
} from '@ant-design/icons';
import { Slider, Tooltip } from 'antd';
import classNames from 'classnames';
import { FC, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

import { clearRequests } from '@/api/api';
import { PlayMode } from '@/enum';
import { Page } from '@/router';
import {
  AppDispatch,
  changeSong,
  nextFM,
  RootState,
  setCurrentTime,
  setShowDetail,
  setSong,
} from '@/store';
import { classGenerator, formatMS, resizeImg, toHttps, transformMusic2Track } from '@/utils';

import MusicDetail from '../music-detail';
import MusicList from '../music-list';
import styles from './footer.module.less';
import { useCurrentTime, useLyric, useMusicList, usePause, usePlayMode, useVolume } from './hooks';

const List: FC = () => {
  const getClass = classGenerator('footer', styles);
  const audioRef = useRef<HTMLAudioElement>(null);
  const progressRef = useRef<HTMLProgressElement>(null);
  const dispatch = useDispatch<AppDispatch>();
  const { push } = useHistory();
  const showDetail = useSelector((state: RootState) => state.controller.showDetail);
  const autoPlay = useSelector((state: RootState) => state.currentTrack.autoPlay || false);
  const { listButtonRef, showList, setShowList } = useMusicList();
  const isFMMode = useSelector((state: RootState) => state.currentTrack.fm.length);
  const { lyricActive, setLyricActive } = useLyric();
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
    if (isFMMode) push(Page.fm);

    dispatch(setShowDetail(!showDetail));
  }

  useEffect(() => {
    if (currentTrack?.id) dispatch(setSong(currentTrack.id));
    return clearRequests;
  }, [currentTrack?.id]);

  return (
    <footer className={getClass()}>
      {currentTrack?.dt && (
        <progress
          ref={progressRef}
          className={getClass('progress-bar')}
          value={currentTime}
          max={currentTrack.dt}
          onClick={handleProgressClick}
        />
      )}
      <div className={getClass('left')}>
        {currentTrack && song && (
          <>
            <audio
              ref={audioRef}
              src={toHttps(song.url)}
              controls
              autoPlay={autoPlay}
              loop={playMode === PlayMode.SOLO}
              onTimeUpdate={handleTimeUpdate}
              onPlay={() => handlePause(false)}
              onPause={() => handlePause(true)}
              onEnded={handlePlayEnded}
              onVolumeChange={handleVolumeChange}
            />
            <img
              src={toHttps(resizeImg(currentTrack.al.picUrl, 100))}
              alt="music"
              onClick={handleCoverClick}
            />
            <div className={getClass('left-name')}>
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
      <div className={getClass('mid')}>
        {isFMMode ? <HeartOutlined /> : <LikeOutlined />}
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
        {isFMMode ? <DeleteOutlined /> : <ShareAltOutlined />}
      </div>
      <div className={getClass('right')}>
        {!isFMMode && <ControlOutlined />}
        <Tooltip title={currentPlayMode.tip}>
          <currentPlayMode.icon onClick={handleIconClick} />
        </Tooltip>
        {!isFMMode && currentTrack && (
          <UnorderedListOutlined ref={listButtonRef} onClick={() => setShowList(!showList)} />
        )}
        <span
          className={classNames(getClass('lyric'), { [styles['--active']]: lyricActive })}
          onClick={() => setLyricActive(!lyricActive)}
        >
          词
        </span>
        {currentTrack && (
          <Tooltip
            title={() => (
              <div className={getClass('volume')}>
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
