import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import styled from 'styled-components';
import { Typography } from '@material-ui/core';

// import imgZero from '../../assets/zero.jpg'

const imgOne = require('../../assets/one.png');

const OneWrapper = styled.div`
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

const One = (props) => {
  const { classes } = props;

  return (
    <OneWrapper>
      <img src={imgOne} alt="imgZero" className={classes.img} />
      <Typography color="inherit" align="center" variant="h2" marked="center">
        일(1)제히
      </Typography>
      <Typography color="inherit" align="center" variant="h5" className={classes.h5}>
        모든 언어를 번역해줘요.
      </Typography>
    </OneWrapper>
  )
}

One.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(One);