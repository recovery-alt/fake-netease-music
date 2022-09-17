import './fm.less';

import {
  DeleteOutlined,
  HeartOutlined,
  MoreOutlined,
  VerticalLeftOutlined,
} from '@ant-design/icons';
import { FC, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { getCommentMusic } from '@/api';
import CommentGroup from '@/components/comment-group';
import ButtonGroup from '@/layout/music-detail/button-group';
import Lyric from '@/layout/music-detail/lyric';
import WriteComment from '@/layout/music-detail/write-comment';
import { AppDispatch, nextFM, RootState, setFM } from '@/store';
import { classGenerator } from '@/utils';

import Cover from './cover';

const FM: FC = () => {
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
      <CommentGroup
        id={currentMusic?.id}
        api={getCommentMusic}
        functionChildren={(count: number) => <WriteComment count={count} />}
      />
    </div>
  );
};

export default FM;
