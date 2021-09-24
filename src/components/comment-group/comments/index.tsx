import React from 'react';
import styles from './comments.module.less';
import avatar from '@/assets/img/avatar.svg';
import { LikeOutlined, ExportOutlined, CommentOutlined } from '@ant-design/icons';
import { Comment } from '@/types';
import dayjs from 'dayjs';
import Img from '@/components/img';
import { classGenerator, resizeImg } from '@/utils';

type Props = { comment: Comment };

const Comments: React.FC<Props> = ({ comment }) => {
  const getClass = classGenerator('comments', styles);
  const data = [
    { icon: LikeOutlined, value: comment.likedCount },
    { icon: ExportOutlined },
    { icon: CommentOutlined },
  ];
  return (
    <div className={getClass()}>
      <div className={getClass('left')}>
        <Img className={getClass('img')} src={resizeImg(comment?.user.avatarUrl || avatar, 100)} />
      </div>
      <div className={getClass('right')}>
        <p>
          <a>{comment.user.nickname}：</a>
          {comment.content}
        </p>
        {comment.beReplied?.length > 0 && (
          <p className={styles['--mentioned']}>
            {comment.beReplied.map(replied => (
              <span key={replied.beRepliedCommentId}>
                <a>@{replied.user.nickname}：</a>
                {replied.content}
              </span>
            ))}
          </p>
        )}
        <div className={getClass('info')}>
          <span>{dayjs(comment.time).format('YYYY年M月D日 HH:mm')}</span>
          <div className={getClass('icons')}>
            {data.map((item, i) => (
              <div key={i} className={getClass('icon')}>
                <item.icon />
                {item.value && item.value > 0 ? <strong>{item.value}</strong> : null}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Comments;
