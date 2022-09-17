import { Spin } from 'antd';
import { FC, Suspense } from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';

import Header from '@/layout/header';
import routes, { Page } from '@/router';
import store from '@/store';
import { classGenerator } from '@/utils';

const getClass = classGenerator('main');

const App: FC = () => (
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
