import React, { Suspense, useEffect } from 'react';
import type { RouteConfig } from '@/router';
import { Switch, Route, useLocation } from 'react-router-dom';
import './layout.less';
import Sidebar from './sidebar';
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
    const { cacheCurrent, current: rawCurrent } = state.currentTrack;
    let current = rawCurrent;
    // 缓存过值，就需要读取
    if (cacheCurrent !== undefined) current = cacheCurrent;
    localStorage.setItem(
      'currentTrack',
      json.stringify({ ...state.currentTrack, current, autoPlay: false, fm: [] })
    );
    localStorage.setItem('controller', json.stringify({ ...state.controller, pause: true }));
  }

  function preventKeyDefault(e: KeyboardEvent, cb?: () => void) {
    if (e.code === 'Space') {
      const focusDom = document.activeElement;
      // 当前不存在聚焦元素或聚焦元素为body
      if (!focusDom || focusDom === document.body) {
        e.stopPropagation();
        e.preventDefault();
        cb?.();
      }
    }
  }

  function handleKeyup(e: KeyboardEvent) {
    preventKeyDefault(e, () => {
      const state = store.getState();
      dispatch(setPause(!state.controller.pause));
    });
  }

  useEffect(() => {
    dispatch(setShowDetail(false));
    clearRequests();
  }, [pathname]);

  useEffect(() => {
    window.addEventListener('beforeunload', interceptor);
    document.addEventListener('keyup', handleKeyup);
    document.addEventListener('keydown', preventKeyDefault);

    return () => {
      window.removeEventListener('beforeunload', interceptor);
      document.removeEventListener('keyup', handleKeyup);
      document.removeEventListener('keydown', preventKeyDefault);
    };
  }, []);

  return (
    <>
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
