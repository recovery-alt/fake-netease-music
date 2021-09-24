import React, { useEffect } from 'react';
import './fm.less';
import Cover from './cover';
import Lyric from '@/layout/music-detail/lyric';
import ButtonGroup from '@/layout/music-detail/button-group';
import CommentGroup from '@/components/comment-group';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState, setFM, nextFM } from '@/store';
import {
  HeartOutlined,
  DeleteOutlined,
  VerticalLeftOutlined,
  MoreOutlined,
} from '@ant-design/icons';
import { getCommentMusic } from '@/api';
import WriteComment from '@/layout/music-detail/write-comment';
import { classGenerator } from '@/utils';

const FM: React.FC = () => {
  const getClass = classGenerator('fm');
  const dispatch = useDispatch<AppDispatch>();
  const [currentMusic, preMusic] = useSelector((state: RootState) => {
    const { fm, current } = state.currentTrack;
    if (!fm[current]) return [];
    return [fm[current], fm[current + 1]];
  });

  const data = [
    { icon: HeartOutlined },
    { icon: DeleteOutlined },
    {
      icon: VerticalLeftOutlined,
      event: () => {
        dispatch(nextFM());
      },
    },
    { icon: MoreOutlined },
  ];

  useEffect(() => {
    if (!currentMusic) dispatch(setFM(true));
  }, []);

  return (
    <div className="fm">
      <section className={getClass('player')}>
        <div className={getClass('cover-wrapper')}>
          <Cover current={currentMusic} next={preMusic} />
          <ButtonGroup data={data} />
        </div>
        <Lyric music={currentMusic} />
      </section>
      <CommentGroup id={currentMusic?.id} api={getCommentMusic}>
        <WriteComment />
      </CommentGroup>
    </div>
  );
};

export default FM;
