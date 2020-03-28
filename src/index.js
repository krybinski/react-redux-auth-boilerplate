import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import axios from 'axios';
import cookie from 'js-cookie';
import jwt from 'jsonwebtoken';
import App from './App';
import store from './store';
import { LOGIN } from './actions/types';

import './index.css';

const jwtSecret =
  '4yV9MNxBhFuSLsV7vp5fTMjZiVl0OWKObbaZcXwuGO2TE46Ix707Mys1VocU67Ya';
let token = cookie.get('token');

if (token) {
  jwt.verify(token, jwtSecret, (err, decoded) => {
    const clearToken = () => {
      cookie.remove('token');
      token = null;
    };

    if (err) {
      clearToken();
    } else {
      if (decoded.iss !== 'http://laravel-auth.local/api/auth/login') {
        clearToken();
      }
    }
  });
}

const render = () => {
  ReactDOM.render(
    <Provider store={store}>
      <React.StrictMode>
        <App />
      </React.StrictMode>
    </Provider>,
    document.getElementById('root'),
  );
};

if (token) {
  axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  axios.post('http://laravel-auth.local/api/auth/me').then((res) => {
    store.dispatch({ type: LOGIN, payload: res.data });
    render();
  });
} else {
  render();
}
