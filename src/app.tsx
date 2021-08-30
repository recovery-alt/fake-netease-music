import React from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import routes from '@/router';
import { Provider } from 'react-redux';
import store from '@/store';

const App: React.FC = () => (
  <Provider store={store}>
    <BrowserRouter>
      <Switch>
        <Redirect from="/" to="/find-music" exact />
        {routes.map(route => (
          <Route key={route.path} path={route.path}>
            <route.component {...route} />
          </Route>
        ))}
      </Switch>
    </BrowserRouter>
  </Provider>
);

export default App;
