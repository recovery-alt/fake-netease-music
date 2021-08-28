import { useState, useMemo, useEffect, RefObject, MouseEventHandler } from 'react';
import { PlayCircleFilled, PauseCircleFilled } from '@ant-design/icons';
import { throttle } from 'lodash';
import {
  RetweetOutlined,
  DoubleRightOutlined,
  RollbackOutlined,
  EnterOutlined,
} from '@ant-design/icons';
import { PlayMode } from '@/enum';

export const usePause = (audio?: RefObject<HTMLAudioElement>) => {
  const [pause, setPause] = useState(false);
  const PlayIcon = useMemo(() => (pause ? PlayCircleFilled : PauseCircleFilled), [pause]);

  useEffect(() => {
    if (!audio?.current) return;
    pause ? audio.current.pause() : audio.current.play();
  }, [pause]);

  return { PlayIcon, pause, setPause };
};

export const useCurrentTime = (
  audioRef?: RefObject<HTMLAudioElement>,
  progressRef?: RefObject<HTMLProgressElement>,
  duration?: number
) => {
  const [currentTime, setCurrentTime] = useState(0);
  const getCurrentTime = () => {
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

  const handleTimeUpdate = throttle(() => {
    getCurrentTime();
  }, 60);

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

export const useMusicDetail = () => {
  const [showDetail, setShowDetail] = useState(false);

  return { showDetail, setShowDetail };
};
