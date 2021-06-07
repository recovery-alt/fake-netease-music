import React, { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom';
import { Spin } from 'antd';
import Home from './Layout/Home';

const modules = import.meta.glob('./views/*/index.tsx');

const pages: Array<{ name?: string; component: () => Promise<{ default: any }> }> = [];

Object.keys(modules).map(key => {
  const matcher = key.match(/views\/(.*)\/index\.tsx/);
  if (matcher?.[1]) {
    const name = matcher[1];
    const component = modules[key] as () => Promise<{ default: any }>;
    pages.push({ name, component });
  }
});

// function Nav() {
//   return (
//     <nav>
//       <ul>
//         <li>
//           <Link to="/">Home</Link>
//         </li>
//         {pages.map(page => (
//           <li key={page.name}>
//             <Link to={`/${page.name}`}>{page.name}</Link>
//           </li>
//         ))}
//       </ul>
//     </nav>
//   );
// }

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        {pages.map(page => {
          const Component = lazy(page.component);
          return (
            <Route path={'/' + page.name} key={page.name}>
              <Suspense fallback={<Spin />}>{<Component />}</Suspense>
            </Route>
          );
        })}
      </Switch>
    </Router>
  );
}

export default App;
