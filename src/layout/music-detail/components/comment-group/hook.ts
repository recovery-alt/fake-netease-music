import { useState, useEffect } from 'react';
import { getCommentMusic, Music } from '@/api';
import { Comment } from '@/api';

export const useMusicComment = (current?: Music) => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [hotComments, setHotComments] = useState<Comment[]>([]);
  const [total, setTotal] = useState(0);

  function loadCommentMusic(id?: number, current = 1, pageSize = 20) {
    if (!id) return;
    const offset = (current - 1) * pageSize;
    getCommentMusic(id, offset).then(res => {
      setComments(res.comments);
      res.hotComments && setHotComments(res.hotComments);
      setTotal(res.total);
    });
  }

  useEffect(() => {
    current?.id && loadCommentMusic(current.id);
  }, [current?.id]);

  return { comments, hotComments, total, loadCommentMusic };
};
