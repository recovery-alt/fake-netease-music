import React from 'react';
import './i-tunes.less';
import noMusic from '@/assets/img/no-music.svg';

const ITunes: React.FC = () => (
  <div className="i-tunes">
    <div className="i-tunes__no-data">
      <img src={noMusic} alt="no-music" />
      <h3>还没有iTunes音乐</h3>
      <div>Apple Music中购买的歌曲受版权保护无法读取播放</div>
    </div>
  </div>
);

export default ITunes;
