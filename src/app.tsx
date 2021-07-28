import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import routes from '@/router';
// import { Provider } from 'react-redux';
// import store from '@/store';

const App: React.FC = () => (
  // <Provider store={store}>
  <BrowserRouter>
    <Switch>
      {routes.map((route, i) => (
        <Route key={i} path={route.path}>
          <route.component {...route} />
        </Route>
      ))}
    </Switch>
  </BrowserRouter>
  // </Provider>
);

export default App;
