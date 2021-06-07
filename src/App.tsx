import React, { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom';
import { Spin } from 'antd';
import Home from './views/Home';

// const modules = import.meta.glob('./views/*.tsx');

// const pages = Object.keys(modules).map(key => ({ key, component: lazy(modules[key]) }));

const PageA = lazy(() => import('./views/PageA'));
const PageB = lazy(() => import('./views/PageB'));

function Nav() {
  return (
    <nav>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/page-a">Page A</Link>
        </li>
        <li>
          <Link to="/page-b">Page B</Link>
        </li>
      </ul>
    </nav>
  );
}

function App() {
  return (
    <Router>
      <Nav />
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route path="/page-a">
          <Suspense fallback={<Spin />}>
            <PageA />
          </Suspense>
        </Route>
        <Route path="/page-b">
          <Suspense fallback={<Spin />}>
            <PageB />
          </Suspense>
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
