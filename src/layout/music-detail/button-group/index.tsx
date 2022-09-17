import { FC } from 'react';

import { classGenerator } from '@/utils';

import styles from './button-group.module.less';

type ButtonItem = { icon: FC; selected?: boolean; event?: () => void };

type Props = { data: Array<ButtonItem> };

const ButtonGroup: FC<Props> = ({ data }) => {
  const getClass = classGenerator('button-group', styles);
  return (
    <ul className={getClass()}>
      {data.map((item, i) => (
        <li key={i} className={getClass('item')} onClick={item.event}>
          <item.icon />
        </li>
      ))}
    </ul>
  );
};

export default ButtonGroup;
