import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import styled from 'styled-components';
import { Typography } from '@material-ui/core';

// import imgZero from '../../assets/zero.jpg'

const imgZero = require('../../assets/zero.jpg');

const ZeroWrapper = styled.div`
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
    minWidth: 200,
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

const Zero = (props) => {
  const { classes } = props;

  return (
    <ZeroWrapper>
      <img src={imgZero} alt="imgZero" className={classes.img} />
      <Typography color="inherit" align="center" variant="h2" marked="center">
        영(0)수증을
      </Typography>
      <Typography color="inherit" align="center" variant="h5" className={classes.h5}>
        딥러닝 인공지능으로 분석해요
      </Typography>
      {/* <Button
        color="secondary"
        variant="contained"
        size="large"
        className={classes.button}
        component="a"
        href="/premium-themes/onepirate/sign-up/"
      >
        Register
      </Button>
      <Typography variant="body2" color="inherit" className={classes.more}>
        Discover the experience
      </Typography> */}
    </ZeroWrapper>
  )
}

Zero.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Zero);