import React from 'react';
import type { RouteConfig } from '@/router';
import { Switch, Route, BrowserRouter } from 'react-router-dom';
import './layout.less';
import Sidebar from './sidebar';
import Header from './header';
import Footer from './footer';
import NotFound from './not-found';

type Props = { routes?: Array<RouteConfig> };

const Layout: React.FC<Props> = ({ routes }) => {
  return (
    <>
      <Header />
      <section className="container">
        <Sidebar />
        <main className="main">
          <BrowserRouter>
            <Switch>
              {routes && routes.map(route => <Route key={route.path} {...route} />)}
              <Route component={NotFound} />
            </Switch>
          </BrowserRouter>
        </main>
      </section>
      <Footer />
    </>
  );
};

export default Layout;
