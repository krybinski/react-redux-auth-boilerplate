import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import store from 'store';
import GuestRoute from 'routes/GuestRoute';
import AuthRoute from 'routes/AuthRoute';
import Login from 'views/Login';
import Home from 'views/Home';
import Profile from 'views/Profile';
import Register from 'views/Register';
import MainLayout from 'layouts/MainLayout';
import { routes } from 'routes';

const Root = () => {
  return (
    <Provider store={store}>
      <React.StrictMode>
        <BrowserRouter>
          <MainLayout>
            <Switch>
              <Route path={routes.home} exact component={Home} />
              <GuestRoute path={routes.login} component={Login} />
              <GuestRoute path={routes.register} component={Register} />
              <AuthRoute path={routes.profile} component={Profile} />
            </Switch>
          </MainLayout>
        </BrowserRouter>
      </React.StrictMode>
    </Provider>
  );
};

export default Root;
