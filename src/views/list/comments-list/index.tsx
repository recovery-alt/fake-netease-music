import { FC } from 'react';

import { getCommentAlbum, getCommentPlaylist } from '@/api';
import CommentGroup from '@/components/comment-group';
import { classGenerator } from '@/utils';

import styles from './comments-list.module.less';
import WriteComment from './write-comment';

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
