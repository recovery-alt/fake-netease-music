import React, { useEffect, useState } from 'react';
import classNames from 'classnames';
import styles from './nav.module.less';

export type NavItem = { id: number | string; name: string };

type Props = { id: number | string; data: NavItem[]; onNavClick?: (id: number | string) => void };

const Nav: React.FC<Props> = ({ id, data, onNavClick }) => {
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
    <div className={styles.nav}>
      {data.map((item, i) => (
        <div key={item.id} className={styles.nav__item} onClick={() => handleItemClick(i, item.id)}>
          <span className={classNames({ [styles['--active']]: i === active })}>{item.name}</span>
        </div>
      ))}
    </div>
  );
};

export default Nav;
