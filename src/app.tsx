import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import routes from '@/router';

function App() {
  return (
    <Router>
      <Switch>
        {routes.map((route, i) => (
          <Route
            key={i}
            path={route.path}
            render={props => (
              // pass the sub-routes down to keep nesting
              <route.component {...props} routes={route.routes} />
            )}
          />
        ))}
      </Switch>
    </Router>
  );
}

export default App;
