import React from 'react';
import styled from 'styled-components';
import { useSelector, useDispatch } from 'react-redux';
import Drawer from '@material-ui/core/Drawer';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import ListItem from '@material-ui/core/ListItem';
import List from '@material-ui/core/List';
import ListItemText from '@material-ui/core/ListItemText';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import { closeDrawer } from '../../modules/drawer';

const StyledDrawer = styled(Drawer)`
  flex-shrink: 0;
  width: 240px;
  paper {
    width: 240px;
  }
`;

const DrawerHeader = styled.div`
  display: flex;
  align-items: center;
  padding: 1rem;
  justify-content: flex-end;
`;

const SideMenu = () => {
  const dispatch = useDispatch();
  const open = useSelector((state) => state.drawer.isOpen);
  const handleDrawerClose = () => dispatch(closeDrawer());
  const menuList = ['내 보드, 분석 통계, 세팅'];
  return (
    <StyledDrawer variant="persistent" anchor="left" open={open}>
      <DrawerHeader>
        <IconButton onClick={handleDrawerClose}>
          <ChevronLeftIcon />
        </IconButton>
      </DrawerHeader>
      <Divider />
      <List>
        {menuList.map((text) => (
          <ListItem button key={text}>
            <ListItemText primary={text} />
          </ListItem>
        ))}
      </List>
      <Divider />
    </StyledDrawer>
  );
};

export default SideMenu;
