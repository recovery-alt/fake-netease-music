import { useState, useEffect } from 'react';
import { getCommentMusicById, Music } from '@/api';
import { Comment } from '@/api';

export const useMusicComment = (current: Music) => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [hotComments, setHotComments] = useState<Comment[]>([]);
  const [total, setTotal] = useState(0);

  function getMusicComment(id: string | number, current = 1, pageSize = 20) {
    const offset = (current - 1) * pageSize;
    getCommentMusicById(id, offset).then(res => {
      setComments(res.comments);
      res.hotComments && setHotComments(res.hotComments);
      setTotal(res.total);
    });
  }

  useEffect(() => {
    current?.id && getMusicComment(current.id);
  }, [current]);

  return { comments, hotComments, total, getMusicComment };
};
