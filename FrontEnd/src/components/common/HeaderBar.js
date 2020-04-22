import React from 'react';
import Styled from 'styled-components';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import { useDispatch, useSelector } from 'react-redux';
import { openDrawer } from '../../modules/drawer';

const FullSizeTypo = Styled(Typography)`
  flex-grow: 1;
`;

const StyledAppBar = Styled(AppBar)`
.MuiAppBar-root{
  width: calc(100%-240px);
} 
`;

const HeaderBar = (props) => {
  const dispatch = useDispatch();

  const open = useSelector((state) => state.drawer.isOpen);

  const handleClickMenu = (e) => {
    dispatch(openDrawer());
    e.preventDefault();
  };

  return (
    <>
      <StyledAppBar position="static">
        <Toolbar>
          {!open && (
            <IconButton
              edge="start"
              color="inherit"
              aria-label="menu"
              onClick={handleClickMenu}
            >
              <MenuIcon />
            </IconButton>
          )}
          <FullSizeTypo variant="h5">{props.title}</FullSizeTypo>
        </Toolbar>
      </StyledAppBar>
    </>
  );
};

export default HeaderBar;
