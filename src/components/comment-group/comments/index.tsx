import { CommentOutlined, ExportOutlined, LikeOutlined } from '@ant-design/icons';
import dayjs from 'dayjs';
import { FC } from 'react';
import { useHistory } from 'react-router-dom';

import avatar from '@/assets/img/avatar.svg';
import Img from '@/components/img';
import { DynamicPage } from '@/router';
import { Comment } from '@/types';
import { classGenerator, resizeImg } from '@/utils';

import styles from './comments.module.less';

type Props = { comment: Comment };

const Comments: FC<Props> = ({ comment }) => {
  const getClass = classGenerator('comments', styles);
  const { push } = useHistory();
  const data = [
    { icon: LikeOutlined, value: comment.likedCount },
    { icon: ExportOutlined },
    { icon: CommentOutlined },
  ];

  function toUserPage() {
    push(DynamicPage.user(comment.user.userId));
  }

  return (
    <div className={getClass()}>
      <div className={getClass('left')}>
        <Img
          className={getClass('img')}
          src={resizeImg(comment?.user.avatarUrl || avatar, 30)}
          onClick={toUserPage}
        />
      </div>
      <div className={getClass('right')}>
        <p>
          <a onClick={toUserPage}>{comment.user.nickname}：</a>
          {comment.content}
        </p>
        {comment.beReplied?.length > 0 && (
          <p className={styles['--mentioned']}>
            {comment.beReplied.map(replied => (
              <span key={replied.beRepliedCommentId}>
                <a onClick={() => push(DynamicPage.user(replied.user.userId))}>
                  @{replied.user.nickname}：
                </a>
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
