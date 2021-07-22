import React from 'react';
import type { RouteConfig } from '@/router';
import { Switch, Route, BrowserRouter as Router } from 'react-router-dom';
import './layout.less';
import Sidebar from './sidebar';
import Header from './header';
import Footer from './footer';
import NotFound from './not-found';
import routes from '@/router';

type Props = { routes?: Array<RouteConfig> };

const Layout: React.FC<Props> = () => (
  <>
    <Header />
    <section className="container">
      <Sidebar />
      <main className="main">
        <Router>
          <Switch>
            {routes &&
              routes.map(route => (
                <Route {...route} key={route.path}>
                  <route.component />
                </Route>
              ))}
            <Route component={NotFound} />
          </Switch>
        </Router>
      </main>
    </section>
    <Footer />
  </>
);

export default Layout;
