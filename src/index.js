import React from 'react';
import ReactDOM from 'react-dom';
import 'babel-polyfill';
import NotFound from './app/NotFound';
import App from './app/app';
require('babel-core/register');
require('babel-polyfill');
import 'regenerator-runtime/runtime';
import 'react-select/dist/react-select.css';
import 'primereact/resources/themes/nova-light/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';

import {BrowserRouter as Router, Route, Link, Switch} from 'react-router-dom';
import {Provider} from 'react-redux';
import store from './Store';
import './css/main.css';
import InfiniteGallery from './components/gallery/InfiniteGallery';

// basename must be match pom.xml's artifactId & WebSphere deployment root path
ReactDOM.render(<Provider store={store}>
  <Router>
    <App/>
  </Router>
</Provider>, document.getElementById('root'));

// eslint-disable-next-line no-process-env
if (process.env.NODE_ENV === 'production') {
  // eslint-disable-next-line no-undef
  serviceWorkerRegister();
}
