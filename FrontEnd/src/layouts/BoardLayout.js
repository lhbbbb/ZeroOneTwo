import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled, { css } from 'styled-components';
import HeaderBar from '../components/common/HeaderBar';
import SideMenu from '../components/common/SideMenu';
import { openDrawer, closeDrawer } from '../modules/drawer';

const drawerWidth = 240;

const MainLayoutWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const StyledMain = styled.main`
  padding: 1.5rem;
  transition: margin 195ms cubic-bezier(0.4, 0, 0.6, 1) 0ms;
  ${(props) =>
    props.open &&
    css`
      transition: margin 225ms cubic-bezier(0, 0, 0.2, 1) 0ms;
      margin-left: ${drawerWidth}px;
    `}
`;

const MainLayout = ({ title, children }) => {
  const dispatch = useDispatch();
  const open = useSelector((state) => state.drawer.open);

  const handleDrawerOpen = () => {
    dispatch(openDrawer(true));
  };

  const handleDrawerClose = () => {
    dispatch(closeDrawer(false));
  };
  const handleLogoutClick = () => {};

  return (
    <MainLayoutWrapper>
      <HeaderBar
        drawerWidth={drawerWidth}
        open={open}
        onDrawerOpen={handleDrawerOpen}
        onLogoutClick={handleLogoutClick}
        title={title}
      />
      <SideMenu
        drawerWidth={drawerWidth}
        open={open}
        onDrawerClose={handleDrawerClose}
      />

      <StyledMain open={open}>{children}</StyledMain>
    </MainLayoutWrapper>
  );
};

export default MainLayout;
