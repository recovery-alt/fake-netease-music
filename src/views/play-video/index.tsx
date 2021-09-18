import './play-video.less';
import React from 'react';

const PlayVideo: React.FC = () => {
  const getClass = (name?: string) => `play-video${name ? '__' + name : ''}`;

  return <div className={getClass()}></div>;
};

export default PlayVideo;
