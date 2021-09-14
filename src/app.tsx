import React from 'react';
import { HashRouter, Route, Switch, Redirect } from 'react-router-dom';
import routes from '@/router';
import { Provider } from 'react-redux';
import store from '@/store';

const App: React.FC = () => (
  <Provider store={store}>
    <HashRouter>
      <Switch>
        <Redirect from="/" to="/find-music" exact />
        {routes.map(route => (
          <Route key={route.path} path={route.path}>
            <route.component {...route} />
          </Route>
        ))}
      </Switch>
    </HashRouter>
  </Provider>
);

export default App;
