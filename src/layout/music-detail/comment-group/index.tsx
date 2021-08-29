import React, { useState } from 'react';
import WriteComment from './write-comment';
import Comments from './comments';
import { Pagination } from 'antd';
import styles from './comment-group.module.less';
import { useMusicComment } from './hook';
import { Music } from '@/types';

type Props = { currentMusic: Music };

const CommentGroup: React.FC<Props> = ({ currentMusic }) => {
  const { comments, hotComments, total, loadCommentMusic } = useMusicComment(currentMusic);
  const [currentPage, setCurrentPage] = useState(1);
  return (
    <div className={styles['comment-group']}>
      <WriteComment />
      <h2 className={styles['comment-group__title']}>精彩评论</h2>
      {hotComments.map(comment => (
        <Comments key={comment.commentId} comment={comment} />
      ))}
      <h2 className={styles['comment-group__title']}>最新评论（{total}）</h2>
      {comments.map(comment => (
        <Comments key={comment.commentId} comment={comment} />
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
