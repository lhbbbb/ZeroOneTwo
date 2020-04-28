import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import { Typography, Button } from '@material-ui/core';

const styles = (theme) => ({
  root: {
    display: 'flex',
    // backgroundColor: theme.palette.secondary.light,
    overflow: 'hidden',
  },
  container: {
    marginTop: theme.spacing(10),
    marginBottom: theme.spacing(15),
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  item: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: theme.spacing(0, 2),
  },
  title: {
    marginBottom: theme.spacing(10),
  },
  name: {
    fontSize: 24,
    fontFamily: theme.typography.fontFamily,
    color: theme.palette.secondary.main,
    fontWeight: theme.typography.fontWeightMedium,
  },
  image: {
    height: 150,
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(4),
  },
  curvyLines: {
    pointerEvents: 'none',
    position: 'absolute',
    top: -180,
    opacity: 0.7,
  },
  button: {
    marginTop: theme.spacing(8),
  },
});

const Members = (props) => {
  const { classes } = props;

  return (
    <section className={classes.root}>
      <Container className={classes.container}>
        <img
          src={require('../../assets/productCurvyLines.png')}
          className={classes.curvyLines}
          alt="curvy lines"
        />
        <Typography variant="h4" marked="center" className={classes.title} component="h2">
          Members
        </Typography>
        <div>
          <Grid container spacing={5}>
            <Grid item xs={4} sm={4} md={4}>
              <div className={classes.item}>
                <div className={classes.name}>하지수</div>
                <img
                  src={require('../../assets/하지수.jpg')}
                  alt="하지수"
                  className={classes.image}
                />
                <Typography variant="h6" align="center">
                  {'PM. NLP + Text classification.'}
                </Typography>
                <Typography variant="h6" align="center">
                  {'AI Engineer, SW Developer'}
                </Typography>
                <Typography variant="h6" align="center">
                  {'Tensorflow DL, Regular Expression'}
                </Typography>
              </div>
            </Grid>
            <Grid item xs={4} sm={4} md={4}>
              <div className={classes.item}>
                <div className={classes.name}>장영준</div>
                <img
                  src={require('../../assets/장영준.jpg')}
                  alt="장영준"
                  className={classes.image}
                />
                <Typography variant="h6" align="center">
                  {'Front-end.'}
                </Typography>
                <Typography variant="h6" align="center">
                  {'SW Developer, Infra Engineer'}
                </Typography>
                <Typography variant="h6" align="center">
                  {'React.js, AWS, Jenkins'}
                </Typography>
              </div>
            </Grid>
            <Grid item xs={4} sm={4} md={4}>
              <div className={classes.item}>
                <div className={classes.name}>박진홍</div>
                <img
                  src={require('../../assets/박진홍.jpg')}
                  alt="박진홍"
                  className={classes.image}
                />
                <Typography variant="h6" align="center">
                  {'Back-end.'}
                </Typography>
                <Typography variant="h6" align="center">
                  {'Data+Network Engineer '}
                </Typography>
                <Typography variant="h6" align="center">
                  {'django, AWS, MariaDB'}
                </Typography>
              </div>
            </Grid>
            <Grid item xs={4} sm={4} md={4}>
              <div className={classes.item}>
                <div className={classes.name}>이현빈</div>
                <img
                  src={require('../../assets/이현빈.jpg')}
                  alt="이현빈"
                  className={classes.image}
                />
                <Typography variant="h6" align="center">
                  {'Receipt image detection.'}
                </Typography>
                <Typography variant="h6" align="center">
                  {'AI Engineer'}
                </Typography>
                <Typography variant="h6" align="center">
                  {'OpenCV, Tensorflow DL'}
                </Typography>
              </div>
            </Grid>
            <Grid item xs={4} sm={4} md={4}>
              <div className={classes.item}>
                <div className={classes.name}>허재웅</div>
                <img
                  src={require('../../assets/허재웅.jpg')}
                  alt="허재웅"
                  className={classes.image}
                />
                <Typography variant="h6" align="center">
                  {'Image preprocess + NMT.'}
                </Typography>
                <Typography variant="h6" align="center">
                  {'AI Engineer'}
                </Typography>
                <Typography variant="h6" align="center">
                  {'OpenCV, Apache MXNet'}
                </Typography>
              </div>
            </Grid>
          </Grid>
        </div>
      </Container>
    </section>
  )
}

Members.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Members);