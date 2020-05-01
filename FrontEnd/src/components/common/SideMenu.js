import React from 'react';
import { useHistory } from 'react-router-dom';
import styled, { css } from 'styled-components';
import {
  Drawer,
  List,
  Divider,
  Button,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography,
} from '@material-ui/core';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import HomeIcon from '@material-ui/icons/Home';
import DeveloperBoardIcon from '@material-ui/icons/DeveloperBoard';
import SettingsIcon from '@material-ui/icons/Settings';

const StyledDrawer = styled(Drawer)`
  ${(props) => css`
    width: ${props.drawerwidth}px;
    flex-shrink: 0;
    .MuiDrawer-paper {
      width: ${props.drawerwidth}px;
    }
  `}
`;
const StyledButton = styled(Button)`
  margin: 1rem !important;
`;
const StyledFooter = styled.footer`
  margin: 1rem;
`;

const SideMenu = ({ drawerWidth, open, onDrawerClose }) => {
  const history = useHistory();
  const menuList = [
    {
      type: 'Board',
      text: '클립보드',
      icon: <DeveloperBoardIcon />,
      link: '/board',
    },
  ];
  const handleMenuSelect = (link) => {
    history.push(link);
  };
  return (
    <StyledDrawer
      variant="persistent"
      anchor="left"
      open={open}
      drawerwidth={drawerWidth}
    >
      <StyledButton
        variant="outlined"
        size="large"
        startIcon={<ChevronLeftIcon />}
        onClick={onDrawerClose}
      >
        메뉴 닫기
      </StyledButton>
      <Divider variant="middle" />
      <List style={{ flexGrow: 1 }}>
        {menuList.map((menu) => (
          <ListItem
            button
            key={menu.type}
            onClick={() => handleMenuSelect(menu.link)}
          >
            <ListItemIcon>{menu.icon}</ListItemIcon>
            <ListItemText primary={menu.text} />
          </ListItem>
        ))}
      </List>
      <Divider variant="middle" />
      <StyledFooter>
        <Typography
          variant="caption"
          color="textSecondary"
          paragraph
          align="center"
        >
          Copyright 2020-2020 by
          <br /> 'JisooHa and others'.
          <br />
          All Rights Reserved.
          <br />
          Powered by JisooHa.
        </Typography>
      </StyledFooter>
    </StyledDrawer>
  );
};

export default SideMenu;
