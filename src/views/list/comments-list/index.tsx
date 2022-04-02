import { FC } from 'react';
import styles from './comments-list.module.less';
import CommentGroup from '@/components/comment-group';
import { getCommentPlaylist, getCommentAlbum } from '@/api';
import WriteComment from './write-comment';
import { classGenerator } from '@/utils';

type Props = { id: number; isAlbum: boolean };

const CommentsList: FC<Props> = ({ id, isAlbum }) => {
  const getClass = classGenerator('comments-list', styles);
  return (
    <div className={getClass()}>
      <WriteComment />
      <CommentGroup id={id} api={isAlbum ? getCommentAlbum : getCommentPlaylist} />
    </div>
  );
};

export default CommentsList;
