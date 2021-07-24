import React from 'react';
import styles from './write-comment.module.less';
import { EditOutlined } from '@ant-design/icons';

const WriteComment: React.FC = () => (
  <>
    <div className={styles['write-comment__title']}>
      <strong>听友评论</strong>
      <span>（已有187条评论）</span>
    </div>
    <div className={styles['write-comment__input']}>
      <span>
        <EditOutlined />
        <span style={{ marginLeft: '5px' }}>发表评论</span>
      </span>
      <p>@</p>
    </div>
  </>
);

export default WriteComment;
