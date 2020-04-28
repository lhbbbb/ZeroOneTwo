import React, { useState } from 'react';
import styled, { css } from 'styled-components';
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Menu,
  MenuItem,
} from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';

const FullSizeTypo = styled(Typography)`
  flex-grow: 1;
`;

const StyledAppBar = styled(AppBar)`
  transition: margin 195ms cubic-bezier(0.4, 0, 0.6, 1) 0ms,
    width 195ms cubic-bezier(0.4, 0, 0.6, 1) 0ms;
  ${(props) =>
    props.open &&
    css`
      width: calc(100% - ${props.drawerwidth}px) !important;
      margin-left: ${props.drawerwidth}px;
      transition: margin 225ms cubic-bezier(0, 0, 0.2, 1) 0ms,
        width 225ms cubic-bezier(0, 0, 0.2, 1) 0ms;
    `};
`;

const HeaderBar = ({
  drawerWidth,
  open,
  onDrawerOpen,
  title,
  onLogoutClick,
}) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const menuOpen = Boolean(anchorEl);
  const handleMenu = (e) => {
    setAnchorEl(e.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <>
      <StyledAppBar position="sticky" open={open} drawerwidth={drawerWidth}>
        <Toolbar>
          {!open && (
            <IconButton
              color="inherit"
              aria-label="open drawer"
              onClick={onDrawerOpen}
              edge="start"
            >
              <MenuIcon />
            </IconButton>
          )}
          <FullSizeTypo variant="h6" noWrap>
            {title}
          </FullSizeTypo>

          <IconButton color="inherit" edge="end" onClick={handleMenu}>
            <AccountCircleIcon />
          </IconButton>
          <Menu
            anchorEl={anchorEl}
            anchorOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            keepMounted
            transformOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            open={menuOpen}
            onClose={handleClose}
          >
            <MenuItem onClick={onLogoutClick}>로그아웃</MenuItem>
          </Menu>
        </Toolbar>
      </StyledAppBar>
    </>
  );
};

export default HeaderBar;
