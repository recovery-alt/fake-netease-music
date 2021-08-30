import React, { Suspense, useEffect } from 'react';
import type { RouteConfig } from '@/router';
import { Switch, Route, useLocation } from 'react-router-dom';
import './layout.less';
import Sidebar from './sidebar';
import Header from './header';
import Footer from './footer';
import NotFound from './not-found';
import Scrollbar from '@/components/scrollbar';
import { Spin } from 'antd';
import { clearRequests } from '@/api/api';

type Props = { routes?: Array<RouteConfig> };

const Layout: React.FC<Props> = ({ routes }) => {
  const { pathname } = useLocation();

  useEffect(() => {
    clearRequests();
  }, [pathname]);

  return (
    <>
      <Header />
      <section className="container">
        <Sidebar />
        <Scrollbar className="main">
          <Suspense fallback={<Spin className="main__loading" style={{ position: 'absolute' }} />}>
            <Switch>
              {routes && routes.map(route => <Route key={route.path} {...route} />)}
              <NotFound />
            </Switch>
          </Suspense>
        </Scrollbar>
      </section>
      <Footer />
    </>
  );
};

export default Layout;
