import React from 'react';
import classNames from 'classnames';
import styles from './nav.module.less';

export type NavItem = { id: number | string; name: string };

type Props = { data: NavItem[] };

const Nav: React.FC<Props> = ({ data }) => {
  return (
    <div className={styles.nav}>
      {data.map((item, i) => (
        <div key={i} className={styles.nav__item}>
          <span className={classNames({ [styles['--active']]: i === 0 })}>{item.name}</span>
        </div>
      ))}
    </div>
  );
};

export default Nav;
