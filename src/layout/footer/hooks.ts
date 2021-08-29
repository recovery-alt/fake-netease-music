import { useState, useMemo, useEffect, RefObject, MouseEventHandler, useRef } from 'react';
import { PlayCircleFilled, PauseCircleFilled } from '@ant-design/icons';
import {
  RetweetOutlined,
  DoubleRightOutlined,
  RollbackOutlined,
  EnterOutlined,
} from '@ant-design/icons';
import { PlayMode } from '@/enum';
import { Track } from '@/types';
import { useSelector, useDispatch } from 'react-redux';
import { AppDispatch, RootState, setPause } from '@/store';

export const usePause = (audio?: RefObject<HTMLAudioElement>, currentTrack?: Track) => {
  const pause = useSelector((state: RootState) => state.controller.pause);
  const dispatch = useDispatch<AppDispatch>();
  const PlayIcon = useMemo(() => (pause ? PlayCircleFilled : PauseCircleFilled), [pause]);

  function handlePause(pause: boolean) {
    if (!currentTrack) return;
    dispatch(setPause(pause));
  }

  useEffect(() => {
    if (!audio?.current) return;
    pause ? audio.current.pause() : audio.current.play();
  }, [pause]);

  return { PlayIcon, pause, handlePause };
};

export const useCurrentTime = (
  audioRef?: RefObject<HTMLAudioElement>,
  progressRef?: RefObject<HTMLProgressElement>,
  duration?: number
) => {
  const [currentTime, setCurrentTime] = useState(0);
  const handleTimeUpdate = () => {
    if (!audioRef?.current) return;
    setCurrentTime(audioRef.current.currentTime * 1000);
  };

  const handleProgressClick: MouseEventHandler<HTMLProgressElement> = e => {
    if (!progressRef?.current || !audioRef?.current || !duration) return;
    const { pageX } = e;
    const { left, width } = progressRef.current.getBoundingClientRect();

    const currentTime = (((pageX - left) / width) * duration) / 1000;
    audioRef.current.currentTime = currentTime;
    setCurrentTime(currentTime);
  };

  return { currentTime, setCurrentTime, handleTimeUpdate, handleProgressClick };
};

export const usePlayMode = () => {
  const [playMode, setPlayMode] = useState<PlayMode>(0);
  const playModeList = [
    { key: 'inTurn', tip: '顺序播放', icon: DoubleRightOutlined },
    { key: 'loop', tip: '循环播放', icon: RetweetOutlined },
    { key: 'solo', tip: '单曲循环', icon: RollbackOutlined },
    { key: 'random', tip: '随机播放', icon: EnterOutlined },
  ];

  const currentPlayMode = useMemo(() => playModeList[playMode], [playMode]);

  const handleIconClick = () => {
    const result = playMode === 3 ? 0 : playMode + 1;
    setPlayMode(result);
  };

  return { playMode, handleIconClick, currentPlayMode };
};

export const useMusicList = () => {
  const listButtonRef = useRef<HTMLElement>(null);
  const [showList, setShowList] = useState(false);

  return { listButtonRef, showList, setShowList };
};

export const useLyric = () => {
  const [lyricActived, setLyricActived] = useState(false);

  return { lyricActived, setLyricActived };
};
