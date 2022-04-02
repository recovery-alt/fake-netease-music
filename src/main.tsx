import { StrictMode } from 'react';
import { render } from 'react-dom';
import App from './app';
import '@/assets/style/main.less';

render(
  <StrictMode>
    <App />
  </StrictMode>,
  document.getElementById('root')
);
