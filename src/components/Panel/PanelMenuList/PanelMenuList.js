import React from 'react';
import DashboardIcon from '@material-ui/icons/Dashboard';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import routes from 'routes';
import MenuItem from 'components/Panel/MenuItem/MenuItem';

const PanelMenuList = () => {
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
    </>
  );
};

export default PanelMenuList;
