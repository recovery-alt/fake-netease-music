import React, { useEffect, useState } from 'react';
import './fm.less';
import Cover from './components/cover';
import Lyric from '@/layout/music-detail/components/lyric';
import ButtonGroup from '@/layout/music-detail/components/button-group';
import CommentGroup from '@/layout/music-detail/components/comment-group';
import { getPersonalFM, Music } from '@/api';

const FM: React.FC = () => {
  const [musicList, setMusicList] = useState<Music[]>([]);
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    getPersonalFM().then(res => {
      setMusicList(res.data);
    });
  }, []);

  return (
    <div className="fm">
      <section className="fm__player">
        <div className="fm__cover-wrapper">
          <Cover musicList={musicList} />
          <ButtonGroup />
        </div>
        <Lyric music={musicList[current]} />
      </section>
      <CommentGroup currentMusic={musicList[current]} />
    </div>
  );
};

export default FM;
