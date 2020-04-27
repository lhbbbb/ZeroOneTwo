import React from 'react';
import styled, { css } from 'styled-components';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
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

const HeaderBar = ({ drawerWidth, open, onDrawerOpen, title }) => {
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

          <IconButton color="inherit" edge="end">
            <AccountCircleIcon />
          </IconButton>
        </Toolbar>
      </StyledAppBar>
    </>
  );
};

export default HeaderBar;
