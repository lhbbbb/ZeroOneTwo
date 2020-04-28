import React from 'react';
import styled from 'styled-components';
import { AppBar, Toolbar, Typography, Button } from '@material-ui/core';

const TransAppBar = styled(AppBar)`
  background-color: rgba(0, 0, 0, 0.2) !important;
  color: white !important;
`;
const MainTitle = styled(Typography)`
  flex-grow: 1;
`;
const MainHeaderBar = () => {
  return (
    <>
      <TransAppBar position="fixed" elevation={0}>
        <Toolbar>
          <MainTitle variant="h6">Zero-One-Two</MainTitle>
          <Button color="inherit" variant="outlined" href="/login">
            Login
          </Button>
        </Toolbar>
      </TransAppBar>
    </>
  );
};

export default MainHeaderBar;
