import { classGenerator } from '@/utils';
import React from 'react';
import styles from './comments-list.module.less';

const WriteComment: React.FC = () => {
  const getClass = classGenerator('comments-list', styles);
  return (
    <>
      <textarea placeholder="输入评论或@朋友" className={getClass('textarea')} />
      <div className={getClass('button')}>
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
