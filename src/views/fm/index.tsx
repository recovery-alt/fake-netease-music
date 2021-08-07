import React, { useEffect, useState } from 'react';
import './fm.less';
import Cover from './components/cover';
import Lyric from './components/lyric';
import ButtonGroup from './components/button-group';
import WriteComment from './components/write-comment';
import Comments from './components/comments';
import { getPersonalFM, Music } from '@/api';
import { useMusicComment } from './hooks';
import { Pagination } from 'antd';

const FM: React.FC = () => {
  const [musicList, setMusicList] = useState<Music[]>([]);
  const [current, setCurrent] = useState(0);
  const { comments, hotComments, total, getMusicComment } = useMusicComment(musicList[current]);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    getPersonalFM().then(res => {
      const { data } = res;
      setMusicList(data);
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
      <WriteComment />
      <h2 className="fm__title">精彩评论</h2>
      {hotComments.map(comment => (
        <Comments key={comment.commentId} comment={comment} />
      ))}
      <h2 className="fm__title">最新评论（{total}）</h2>
      {comments.map(comment => (
        <Comments key={comment.commentId} comment={comment} />
      ))}
      <footer className="fm__footer">
        <Pagination
          total={total}
          showSizeChanger={false}
          current={currentPage}
          onChange={page => {
            setCurrentPage(page);
            getMusicComment(musicList[current].id, page);
          }}
        />
      </footer>
    </div>
  );
};

export default FM;
