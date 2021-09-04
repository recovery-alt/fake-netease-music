import React, { useState, useEffect } from 'react';
import Comments from './comments';
import { Pagination } from 'antd';
import styles from './comment-group.module.less';
import { Comment, CommentData } from '@/types';

type Data = CommentData & {
  code: number;
};

type Props = {
  id?: number;
  children?: React.ReactNode;
  api: (id: number | string, offset?: number) => Promise<Data>;
};

const CommentGroup: React.FC<Props> = ({ id, children, api }) => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [hotComments, setHotComments] = useState<Comment[]>([]);
  const [total, setTotal] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);

  async function loadData(id?: number, current = 1, pageSize = 20) {
    if (!id) return;
    const offset = (current - 1) * pageSize;
    const res = await api(id, offset);
    setComments(res.comments);
    res.hotComments && setHotComments(res.hotComments);
    setTotal(res.total);
  }

  useEffect(() => {
    id && loadData(id);
  }, [id]);

  return (
    <div className={styles['comment-group']}>
      {total > 0 ? (
        <>
          {children}
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
                loadData(id, page, pageSize);
              }}
            />
          </footer>
        </>
      ) : (
        <div className={styles['comment-group__empty']}>还没有评论，快来抢沙发～</div>
      )}
    </div>
  );
};

export default CommentGroup;
