import React from 'react';
import styles from './comments-list.module.less';
import CommentGroup from '@/components/comment-group';
import { getCommentPlaylist, getCommentAlbum } from '@/api';
import WriteComment from './write-comment';

type Props = { id: number; isAlbum: boolean };

const CommentsList: React.FC<Props> = ({ id, isAlbum }) => {
  return (
    <div className={styles['comments-list']}>
      <WriteComment />
      <CommentGroup id={id} api={isAlbum ? getCommentAlbum : getCommentPlaylist} />
    </div>
  );
};

export default CommentsList;
