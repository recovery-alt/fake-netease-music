import React from 'react';
import styles from './button-group.module.less';
import {
  HeartOutlined,
  DeleteOutlined,
  VerticalLeftOutlined,
  MoreOutlined,
} from '@ant-design/icons';

const data = [
  { icon: HeartOutlined },
  { icon: DeleteOutlined },
  { icon: VerticalLeftOutlined },
  { icon: MoreOutlined },
];

const ButtonGroup: React.FC = () => (
  <ul className={styles['button-group']}>
    {data.map((item, i) => (
      <li key={i} className={styles['button-group__item']}>
        <item.icon />
      </li>
    ))}
  </ul>
);

export default ButtonGroup;
