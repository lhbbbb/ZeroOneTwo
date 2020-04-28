import React from 'react';
import TwoImage from '../../assets/two.jpg';
import { withStyles } from '@material-ui/core/styles';
import styled from 'styled-components';
import { Typography, Button } from '@material-ui/core';

const TwoWrapper = styled.div`
  width: inherit;
  height: inherit;
  background: url(${TwoImage}) no-repeat center center;
  background-size: cover;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;
const ToneBlock = styled.div`
  background-color: rgba(0, 0, 0, 0.6);
  width: inherit;
  height: inherit;
  position: absolute;
`;
const UpperTypo = styled(Typography)`
  z-index: 1001;
  font-weight: 700;
  color: white !important;
  & + .MuiTypography-h5 {
    margin-top: 2rem;
  }
`;

const styles = (theme) => ({
  button: {
    marginTop: theme.spacing(2),
    minWidth: 200,
    textAlign: 'center',
  },
});

const Two = (props) => {
  const { classes } = props;

  return (
    <TwoWrapper>
      <ToneBlock />
      <UpperTypo align="center" variant="h2">
        이(2)곳에
      </UpperTypo>
      <UpperTypo align="center" variant="h5">
        영수증 데이터를 모아서 보여줘요
      </UpperTypo>
      <Button
        color="secondary"
        variant="contained"
        size="large"
        className={classes.button}
        align="center"
        component="a"
        href="/login"
      >
        시작하기
      </Button>
    </TwoWrapper>
  );
};

export default withStyles(styles)(Two);
