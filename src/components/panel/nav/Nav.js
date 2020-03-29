import React from 'react';
import { Link } from 'react-router-dom';
import routes from 'routes';
import cookie from 'js-cookie';
import { connect } from 'react-redux';
import { logout as logoutAction } from 'actions';

const Nav = (props) => {
  const handleLogout = (ev) => {
    ev.preventDefault();

    cookie.remove('token');
    props.logout();
  };

  return (
    <nav
      style={{
        background: 'grey',
        padding: '15px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}
    >
      <h1 style={{ margin: 0 }}>Laravel-Auth</h1>
      <div>
        {props.loggedIn ? (
          <>
            <Link to={routes.profile} style={{ marginLeft: '15px' }}>
              Profile
            </Link>
            <Link
              to="/logout"
              style={{ marginLeft: '15px' }}
              onClick={handleLogout}
            >
              Logout
            </Link>
          </>
        ) : (
          <>
            <Link to={routes.login} style={{ marginLeft: '15px' }}>
              Login
            </Link>
            <Link to={routes.register} style={{ marginLeft: '15px' }}>
              Register
            </Link>
          </>
        )}
      </div>
    </nav>
  );
};

const mapStateToProps = (state) => {
  return {
    loggedIn: state.auth.loggedIn,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    logout: () => dispatch(logoutAction()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Nav);
