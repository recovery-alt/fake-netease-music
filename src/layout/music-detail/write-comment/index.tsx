import { EditOutlined } from '@ant-design/icons';
import { FC } from 'react';

import { classGenerator } from '@/utils';

import styles from './write-comment.module.less';

const WriteComment: FC<{ count: number }> = ({ count }) => {
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
