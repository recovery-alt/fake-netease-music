import React, { Suspense } from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import routes, { Page } from '@/router';
import { Provider } from 'react-redux';
import store from '@/store';
import { Spin } from 'antd';
import Header from '@/layout/header';
import { getClass } from '@/layout';

const App: React.FC = () => (
  <Provider store={store}>
    <BrowserRouter>
      <Header />
      <Suspense
        fallback={<Spin className={getClass('loading')} style={{ position: 'absolute' }} />}
      >
        <Switch>
          <Redirect from={Page.root} to={Page.findMusic} exact />
          {routes.map(route => (
            <Route key={route.path} path={route.path}>
              <route.component {...route} />
            </Route>
          ))}
        </Switch>
      </Suspense>
    </BrowserRouter>
  </Provider>
);

export default App;
