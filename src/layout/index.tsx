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
import store, { setPause, setShowDetail } from '@/store';
import { useDispatch } from 'react-redux';
import json from 'json5';

type Props = { routes?: Array<RouteConfig> };

const Layout: React.FC<Props> = ({ routes }) => {
  const { pathname } = useLocation();
  const dispatch = useDispatch();

  function interceptor() {
    const state = store.getState();
    localStorage.setItem('currentTrack', json.stringify(state.currentTrack));
    localStorage.setItem('controller', json.stringify({ ...state.controller, pause: true }));
  }

  function handleKeyup(e: KeyboardEvent) {
    if (e.code === 'Space') {
      const state = store.getState();
      dispatch(setPause(!state.controller.pause));
    }
  }

  useEffect(() => {
    dispatch(setShowDetail(false));
    clearRequests();
  }, [pathname]);

  useEffect(() => {
    window.addEventListener('beforeunload', interceptor);
    document.addEventListener('keyup', handleKeyup);

    return () => {
      window.removeEventListener('beforeunload', interceptor);
      document.removeEventListener('keyup', handleKeyup);
    };
  }, []);

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
