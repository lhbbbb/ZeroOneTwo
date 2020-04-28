import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import styled from 'styled-components';
import { Typography, Button } from '@material-ui/core';

// import imgZero from '../../assets/zero.jpg'

const imgTwo = require('../../assets/two.jpg');

const TwoWrapper = styled.div`
  text-align: center;
`;

const styles = (theme) => ({
  img: {
    display: 'block',
    marginBottom: '4rem',
    marginLeft: 'auto',
    marginRight: 'auto',
    maxWidth: '100%',
    height: 'auto',
  },
  button: {
    marginTop: theme.spacing(2),
    minWidth: 200,
    textAlign: 'center',
  },
  h5: {
    marginBottom: theme.spacing(4),
    marginTop: theme.spacing(4),
    [theme.breakpoints.up('sm')]: {
      marginTop: theme.spacing(10),
    },
  },
  more: {
    marginTop: theme.spacing(2),
  },
});

const Two = (props) => {
  const { classes } = props;

  return (
    <TwoWrapper>
      <img src={imgTwo} alt="imgZero" className={classes.img}/>
      <Typography color="inherit" align="center" variant="h2" marked="center">
        이(2)곳에
      </Typography>
      <Typography color="inherit" align="center" variant="h5" className={classes.h5}>
        영수증 데이터를 모아서 보여줘요
      </Typography>
      <Button
        color="secondary"
        variant="contained"
        size="large"
        className={classes.button}
        align="center"
        component="a"
        href="/"
      >
        GET STARTED
      </Button>
    </TwoWrapper>
  )
}

Two.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Two);