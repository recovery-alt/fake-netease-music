import React from 'react';
import styles from './Home.module.less';

export default function Home() {
  return (
    <div className={styles.container}>
      <div className={styles.menu}></div>
      <div className={styles.home}>Home</div>
    </div>
  );
}
