import { FC, useRef, useState } from 'react';

import Icon from '@/components/icon';
import { classGenerator, toHttps } from '@/utils';

import styles from './video.module.less';

type Props = { src?: string };

const Video: FC<Props> = ({ src }) => {
  const getClass = classGenerator('video', styles);
  const [pause, setPause] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  return (
    <div className={getClass()}>
      <video
        ref={videoRef}
        src={toHttps(src)}
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
