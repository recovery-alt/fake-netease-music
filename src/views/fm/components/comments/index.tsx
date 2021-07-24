import React from 'react';
import styles from './comments.module.less';
import avatar from '@/assets/img/avatar.svg';
import { LikeOutlined, ExportOutlined, CommentOutlined } from '@ant-design/icons';

const Comments: React.FC = () => {
  const data = [
    { icon: LikeOutlined, value: 59 },
    { icon: ExportOutlined },
    { icon: CommentOutlined },
  ];
  return (
    <div className={styles.comments}>
      <div className={styles.comments__left}>
        <img src={avatar} alt="avatar" />
      </div>
      <div className={styles.comments__right}>
        <p>
          <a>童先生睡觉：</a>
          可偏偏这碎银几两，能让父母安康，可护幼子成长，但这碎银几两，也断了儿时念想，让少年染上沧桑，压弯了脊梁，让世人愁断肠，偏是这碎银几两，能保老人晚年安康。
        </p>
        <p className={styles['--mentioned']}>
          <a>@童先生睡觉：</a>
          恕我直言 林志炫那是什么玩意r
        </p>
        <div className={styles.comments__info}>
          <span>7月19日 18:57</span>
          <div className={styles.comments__icons}>
            {data.map((item, i) => (
              <div key={i} className={styles['comments__icon']}>
                <item.icon />
                {item.value && <strong>{item.value}</strong>}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Comments;
