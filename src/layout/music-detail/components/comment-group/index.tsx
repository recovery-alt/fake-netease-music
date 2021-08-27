import React, { useState } from 'react';
import WriteComment from './components/write-comment';
import Comments from './components/comments';
import { Pagination } from 'antd';
import styles from './comment-group.module.less';
import { useMusicComment } from './hook';
import { Music } from '@/api';

type Props = { currentMusic: Music };

const CommentGroup: React.FC<Props> = ({ currentMusic }) => {
  const { comments, hotComments, total, loadCommentMusic } = useMusicComment(currentMusic);
  const [currentPage, setCurrentPage] = useState(1);
  return (
    <div className={styles['comment-group']}>
      <WriteComment />
      <h2 className={styles['comment-group__title']}>精彩评论</h2>
      {hotComments.map((comment, i) => (
        <Comments key={i} comment={comment} />
      ))}
      <h2 className={styles['comment-group__title']}>最新评论（{total}）</h2>
      {comments.map((comment, i) => (
        <Comments key={i} comment={comment} />
      ))}
      <footer className={styles['comment-group__footer']}>
        <Pagination
          total={total}
          showSizeChanger={false}
          current={currentPage}
          onChange={(page, pageSize) => {
            setCurrentPage(page);
            loadCommentMusic(currentMusic?.id, page, pageSize);
          }}
        />
      </footer>
    </div>
  );
};

export default CommentGroup;
