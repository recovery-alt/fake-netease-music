import React, { Suspense } from 'react';
import { HashRouter, Route, Switch, Redirect } from 'react-router-dom';
import routes, { Page } from '@/router';
import { Provider } from 'react-redux';
import store from '@/store';
import { Spin } from 'antd';
import Header from '@/layout/header';

const App: React.FC = () => (
  <Provider store={store}>
    <HashRouter>
      <Header />
      <Suspense fallback={<Spin className="main__loading" style={{ position: 'absolute' }} />}>
        <Switch>
          <Redirect from={Page.root} to={Page.findMusic} exact />
          {routes.map(route => (
            <Route key={route.path} path={route.path}>
              <route.component {...route} />
            </Route>
          ))}
        </Switch>
      </Suspense>
    </HashRouter>
  </Provider>
);

export default App;
