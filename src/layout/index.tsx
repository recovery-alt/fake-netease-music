import React from 'react';
import type { RouteConfig } from '@/router';
import { Switch, Route, Redirect } from 'react-router-dom';
import './layout.less';
import Sidebar from './sidebar';
import Header from './header';
import Footer from './footer';

type Props = { routes?: Array<RouteConfig> };

const Layout: React.FC<Props> = ({ routes }) => (
  <>
    <Header />
    <section className="container">
      <Sidebar />
      <main className="main">
        <Switch>
          {routes &&
            routes.map(route => (
              <Route path={route.path} key={route.path}>
                <route.component />
              </Route>
            ))}
          <Redirect to={routes![0].path} />
        </Switch>
      </main>
    </section>
    <Footer />
  </>
);

export default Layout;
