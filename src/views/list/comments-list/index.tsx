import React from 'react';
import styles from './comments-list.module.less';
import CommentGroup from '@/components/comment-group';
import { getCommentPlaylist, getCommentAlbum } from '@/api';

type Props = { id: number; isAlbum: boolean };

const CommentsList: React.FC<Props> = ({ id, isAlbum }) => {
  return (
    <div className={styles['comments-list']}>
      <textarea placeholder="输入评论或@朋友" className={styles['comments-list__textarea']} />
      <div className={styles['comments-list__button']}>
        <div>
          <span>@</span>
          <span>#</span>
        </div>
        <button>评论</button>
      </div>
      <CommentGroup id={id} api={isAlbum ? getCommentAlbum : getCommentPlaylist} />
    </div>
  );
};

export default CommentsList;
