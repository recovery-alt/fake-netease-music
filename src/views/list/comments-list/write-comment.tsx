import React from 'react';
import styles from './comments-list.module.less';

const WriteComment: React.FC = () => {
  return (
    <>
      <textarea placeholder="输入评论或@朋友" className={styles['comments-list__textarea']} />
      <div className={styles['comments-list__button']}>
        <div>
          <span>@</span>
          <span>#</span>
        </div>
        <button>评论</button>
      </div>
    </>
  );
};

export default WriteComment;
