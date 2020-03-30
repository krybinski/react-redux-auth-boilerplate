import React from 'react';
import cookie from 'js-cookie';
import DashboardIcon from '@material-ui/icons/Dashboard';
import ExitToApp from '@material-ui/icons/ExitToApp';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import routes from 'routes';
import { connect } from 'react-redux';
import { logout as logoutAction } from 'actions';
import MenuItem from 'components/Panel/MenuItem/MenuItem';

const PanelMenuList = (props) => {
  const handleLogout = (ev) => {
    ev.preventDefault();

    cookie.remove('token');
    props.logout();
  };

  return (
    <>
      <MenuItem
        to={routes.dashboard}
        icon={<DashboardIcon />}
        primary="Dashboard"
      />
      <MenuItem
        to={routes.profile}
        icon={<AccountCircleIcon />}
        primary="Profile"
      />
      <MenuItem
        to={routes.login}
        icon={<ExitToApp />}
        primary="Logout"
        onClick={handleLogout}
      />
    </>
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

export default connect(mapStateToProps, mapDispatchToProps)(PanelMenuList);
