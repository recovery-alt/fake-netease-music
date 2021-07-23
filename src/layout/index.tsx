import React from 'react';
import type { RouteConfig } from '@/router';
import { Switch, Route } from 'react-router-dom';
import './layout.less';
import Sidebar from './sidebar';
import Header from './header';
import Footer from './footer';
import NotFound from './not-found';
import Scrollbar from '@/components/scrollbar';

type Props = { routes?: Array<RouteConfig> };

const Layout: React.FC<Props> = ({ routes }) => {
  return (
    <>
      <Header />
      <section className="container">
        <Sidebar />
        <Scrollbar className="main">
          <Switch>
            {routes && routes.map(route => <Route key={route.path} {...route} />)}
            <NotFound />
          </Switch>
        </Scrollbar>
      </section>
      <Footer />
    </>
  );
};

export default Layout;
