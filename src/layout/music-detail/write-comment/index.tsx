import React from 'react';
import styles from './write-comment.module.less';
import { EditOutlined } from '@ant-design/icons';
import { classGenerator } from '@/utils';

const WriteComment: React.FC<{ count: number }> = ({ count }) => {
  const getClass = classGenerator('write-comment', styles);
  return (
    <>
      <div className={getClass('title')}>
        <strong>听友评论</strong>
        <span>（已有{count}条评论）</span>
      </div>
      <div className={getClass('input')}>
        <span>
          <EditOutlined />
          <span style={{ marginLeft: '5px' }}>发表评论</span>
        </span>
        <p>@</p>
      </div>
    </>
  );
};

export default WriteComment;
