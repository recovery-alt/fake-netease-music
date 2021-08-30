import React from 'react';
import styles from './button-group.module.less';

type ButtonItem = { icon: React.FC; selected?: boolean; event?: () => void };

type Props = { data: Array<ButtonItem> };

const ButtonGroup: React.FC<Props> = ({ data }) => (
  <ul className={styles['button-group']}>
    {data.map((item, i) => (
      <li key={i} className={styles['button-group__item']} onClick={item.event}>
        <item.icon />
      </li>
    ))}
  </ul>
);

export default ButtonGroup;
