import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import cookie from 'js-cookie';
import jwt from 'jsonwebtoken';
import Root from 'views/Root';
import store from 'store';
import { login as loginAction } from 'actions';

import 'index.css';

axios.defaults.baseURL = 'http://laravel-auth.local';

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
    } else if (decoded.iss !== `${axios.defaults.baseURL}/api/auth/login`) {
      clearToken();
    }
  });
}

const render = () => {
  ReactDOM.render(<Root />, document.getElementById('root'));
};

if (token) {
  axios.defaults.headers.common.Authorization = `Bearer ${token}`;
  axios.post('/api/auth/me').then((res) => {
    store.dispatch(loginAction(res.data));
    render();
  });
} else {
  render();
}
