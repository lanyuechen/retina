import React from 'react';
import { Outlet } from 'react-router-dom';

const BasicLayout: React.FC = () => {
  return (
    <Outlet />
  );
};

export default BasicLayout;
