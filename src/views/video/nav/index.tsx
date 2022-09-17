import classNames from 'classnames';
import { FC, useEffect, useState } from 'react';

import { classGenerator } from '@/utils';

import styles from './nav.module.less';

export type NavItem = { id: number | string; name: string };

type Props = { id: number | string; data: NavItem[]; onNavClick?: (id: number | string) => void };

const Nav: FC<Props> = ({ id, data, onNavClick }) => {
  const getClass = classGenerator('nav', styles);
  const [active, setActive] = useState<number>();

  function handleItemClick(index: number, id: number | string) {
    setActive(index);
    onNavClick?.(id);
  }

  useEffect(() => {
    const index = data.findIndex(item => item.id === id);
    index > -1 && setActive(index);
  }, [id]);

  return (
    <div className={getClass()}>
      {data.map((item, i) => (
        <div key={item.id} className={getClass('item')} onClick={() => handleItemClick(i, item.id)}>
          <span className={classNames({ [styles['--active']]: i === active })}>{item.name}</span>
        </div>
      ))}
    </div>
  );
};

export default Nav;
