import React from 'react';
import styles from './Home.module.less';
import { Route, Switch, Link } from 'react-router-dom';

export default function Layout({ routes }: { routes: any }) {
  return (
    <div className={styles.container}>
      <div className={styles.menu}>
        <ul>
          {routes.map((route: any) => (
            <li key={route.path}>
              <Link to={route.path}>{route.path}</Link>
            </li>
          ))}
        </ul>
      </div>
      <div className={styles.home}>
        <Switch>
          {routes.map((route: any) => (
            <Route path={route.path} key={route.path}>
              <route.component />
            </Route>
          ))}
        </Switch>
      </div>
    </div>
  );
}
