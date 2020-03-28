import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import cookie from 'js-cookie';
import { logout as logoutAction } from 'actions';

const MainLayout = (props) => {
  const handleLogout = (ev) => {
    ev.preventDefault();

    cookie.remove('token');
    props.logout();
  };

  return (
    <div>
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
          <Link to="/" style={{ marginLeft: '15px' }}>
            Home page
          </Link>
          {props.loggedIn ? (
            <>
              <Link to="/profile" style={{ marginLeft: '15px' }}>
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
              <Link to="/login" style={{ marginLeft: '15px' }}>
                Login
              </Link>
              <Link to="/register" style={{ marginLeft: '15px' }}>
                Register
              </Link>
            </>
          )}
        </div>
      </nav>
      {props.children}
    </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(MainLayout);
