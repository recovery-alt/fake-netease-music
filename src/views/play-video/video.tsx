import React, { useRef, useState } from 'react';
import styles from './video.module.less';
import Icon from '@/components/icon';

type Props = { src?: string };

const Video: React.FC<Props> = ({ src }) => {
  const getClass = (name?: string) => styles[`video${name ? '__' + name : ''}`];
  const [pause, setPause] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  return (
    <div className={getClass()}>
      <video
        ref={videoRef}
        src={src}
        autoPlay
        controls
        onPause={() => setPause(true)}
        onPlay={() => setPause(false)}
      />
      {/* <div className={getClass('control')}>
        <div>00:00 / 02:59</div>
        <div className={getClass('controls')}>
          <SoundOutlined />
          <span>超清</span>
          <ArrowsAltOutlined />
        </div>
      </div> */}
      {pause && (
        <Icon
          type="play"
          size="giant"
          className={getClass('pause')}
          onClick={() => videoRef.current?.play()}
        />
      )}
      {/* <progress ref={progressRef} className={getClass('progress')} value={currentTime} max={max} /> */}
    </div>
  );
};

export default Video;
