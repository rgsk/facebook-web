import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import App from './App';
import { RecoilRoot } from 'recoil';
import RecoilizeDebugger from 'recoilize-fixed';
import { GlobalProvider } from './state/GlobalContext';
const app = document.getElementById('root');

ReactDOM.render(
  <RecoilRoot>
    <RecoilizeDebugger root={app} />
    <GlobalProvider>
      <App />
    </GlobalProvider>
  </RecoilRoot>,
  app
);
