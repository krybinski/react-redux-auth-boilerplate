import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import store from 'store';
import GuestRoute from 'routes/GuestRoute';
import AuthRoute from 'routes/AuthRoute';
import Login from 'views/Login';
import Profile from 'views/Profile';
import Register from 'views/Register';
import MainTemplate from 'templates/MainTemplate';
import routes from 'routes';

const Routing = () => (
  <Switch>
    <Route
      path={routes.home}
      exact
      component={() => <Redirect to={routes.login} />}
    />
    <GuestRoute path={routes.login} component={Login} />
    <GuestRoute path={routes.register} component={Register} />
    <AuthRoute path={routes.profile} component={Profile} />
  </Switch>
);

const Root = () => {
  return (
    <Provider store={store}>
      <React.StrictMode>
        <BrowserRouter>
          <MainTemplate>
            <Routing />
          </MainTemplate>
        </BrowserRouter>
      </React.StrictMode>
    </Provider>
  );
};

export default Root;
