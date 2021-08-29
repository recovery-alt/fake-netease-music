import React, { useEffect } from 'react';
import './fm.less';
import Cover from './cover';
import Lyric from '@/layout/music-detail/lyric';
import ButtonGroup from '@/layout/music-detail/button-group';
import CommentGroup from '@/layout/music-detail/comment-group';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState, setFM } from '@/store';

const FM: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [currentMusic, preMusic] = useSelector((state: RootState) => {
    const { fm, current } = state.currentTrack;
    if (!fm[current]) return [];
    return [fm[current], fm[current + 1]];
  });

  useEffect(() => {
    dispatch(setFM());
  }, []);

  return (
    <div className="fm">
      <section className="fm__player">
        <div className="fm__cover-wrapper">
          <Cover current={currentMusic} next={preMusic} />
          <ButtonGroup />
        </div>
        <Lyric music={currentMusic} />
      </section>
      <CommentGroup currentMusic={currentMusic} />
    </div>
  );
};

export default FM;
