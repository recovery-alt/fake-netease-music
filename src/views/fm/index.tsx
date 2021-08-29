import React, { useEffect, useState } from 'react';
import './fm.less';
import Cover from './components/cover';
import Lyric from '@/layout/music-detail/components/lyric';
import ButtonGroup from '@/layout/music-detail/components/button-group';
import CommentGroup from '@/layout/music-detail/components/comment-group';
import { setFM } from '@/reducer';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/store';

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
