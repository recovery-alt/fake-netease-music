import React from 'react';
import './fm.less';
import Cover from './components/cover';
import Lyric from './components/lyric';
import ButtonGroup from './components/button-group';
import WriteComment from './components/write-comment';
import Comments from './components/comments';
import Pagination from './components/pagination';
import { useDispatch } from 'react-redux';
import { setUserInfo } from '@/store/reducer/user';

const FM: React.FC = () => {
  const dispatch = useDispatch();
  return (
    <div className="fm">
      <section className="fm__player">
        <div className="fm__cover-wrapper">
          <Cover />
          <ButtonGroup />
        </div>
        <Lyric />
      </section>
      <WriteComment />
      <h2 className="fm__title">精彩评论</h2>
      {Array(5)
        .fill(0)
        .map((item, i) => (
          <Comments key={i} />
        ))}
      <h2 className="fm__title">最新评论（184）</h2>
      {Array(20)
        .fill(0)
        .map((item, i) => (
          <Comments key={i} />
        ))}
      <footer className="fm__footer">
        <Pagination />
      </footer>
    </div>
  );
};

export default FM;
