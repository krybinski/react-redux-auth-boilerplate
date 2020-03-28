import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Login from './Login';
import Home from './Home';
import Profile from './Profile';
import Register from './Register';
import GuestRoute from './components/GuestRoute';
import AuthRoute from './components/AuthRoute';
import Layout from './components/Layout';

function App() {
  return (
    <Router>
      <Layout>
        <Route path="/" exact component={Home} />
        <GuestRoute path="/login" component={Login} />
        <GuestRoute path="/register" component={Register} />
        <AuthRoute path="/profile" component={Profile} />
      </Layout>
    </Router>
  );
}

export default App;
