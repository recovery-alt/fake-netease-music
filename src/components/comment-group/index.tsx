import { Pagination } from 'antd';
import { FC, ReactNode, useEffect, useState } from 'react';

import { clearRequests } from '@/api/api';
import { Comment, CommentData } from '@/types';
import { classGenerator } from '@/utils';

import styles from './comment-group.module.less';
import Comments from './comments';

type Data = CommentData & {
  code: number;
};

type Props = {
  id?: number | string;
  functionChildren?: (count: number) => ReactNode;
  api: (id: number | string, offset?: number) => Promise<Data>;
};

const CommentGroup: FC<Props> = ({ id, functionChildren, api }) => {
  const getClass = classGenerator('comment-group', styles);
  const [comments, setComments] = useState<Comment[]>([]);
  const [hotComments, setHotComments] = useState<Comment[]>([]);
  const [total, setTotal] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);

  async function loadData(id?: number | string, current = 1, pageSize = 20) {
    if (!id) return;
    const offset = (current - 1) * pageSize;
    const res = await api(id, offset);
    setComments(res.comments);
    res.hotComments && setHotComments(res.hotComments);
    setTotal(res.total);
  }

  useEffect(() => {
    id && loadData(id);
    return clearRequests;
  }, [id]);

  return (
    <div className={getClass()}>
      {total > 0 ? (
        <>
          {functionChildren?.(total)}
          {hotComments.length > 0 && (
            <>
              <h2 className={getClass('title')}>精彩评论</h2>
              {hotComments.map(comment => (
                <Comments key={comment.commentId} comment={comment} />
              ))}
            </>
          )}
          {comments.length > 0 && (
            <>
              <h2 className={getClass('title')}>最新评论（{total}）</h2>
              {comments.map(comment => (
                <Comments key={comment.commentId} comment={comment} />
              ))}
            </>
          )}

          {total > 20 && (
            <footer className={getClass('footer')}>
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
          )}
        </>
      ) : (
        <div className={getClass('empty')}>还没有评论，快来抢沙发～</div>
      )}
    </div>
  );
};

export default CommentGroup;
