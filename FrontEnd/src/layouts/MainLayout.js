import React from 'react';
import Styled from 'styled-components';
import HeaderBar from '../components/common/HeaderBar';
import SideMenu from '../components/common/SideMenu';

const LayoutDisplay = Styled.div`
  display: flex;
`;

const MainLayout = ({ children }) => {
  return (
    <LayoutDisplay>
      <HeaderBar title="Board Main Page" />
      <SideMenu />
      {children}
    </LayoutDisplay>
  );
};

export default MainLayout;
