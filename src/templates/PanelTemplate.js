import React from 'react';
import Nav from 'components/panel/nav/Nav';

const PanelTemplate = ({ children }) => {
  return (
    <div>
      <Nav />
      {children}
    </div>
  );
};

export default PanelTemplate;
