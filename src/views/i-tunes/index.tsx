import React from 'react';
import './i-tunes.less';
import NoData from '@/components/no-data';

const ITunes: React.FC = () => (
  <div className="i-tunes">
    <NoData title="还没有iTunes音乐" subTitle="Apple Music中购买的歌曲受版权保护无法读取播放" />
  </div>
);

export default ITunes;
