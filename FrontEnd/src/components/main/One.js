import React from 'react';
import styled from 'styled-components';
import OneImage from '../../assets/one.png';
import { Typography } from '@material-ui/core';

const OneWrapper = styled.div`
  width: inherit;
  height: inherit;
  background: url(${OneImage}) no-repeat center center;
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

const One = () => {
  return (
    <OneWrapper>
      <ToneBlock />
      <UpperTypo align="center" variant="h2">
        일(1)제히
      </UpperTypo>
      <UpperTypo align="center" variant="h5">
        모든 언어를 번역해줘요.
      </UpperTypo>
    </OneWrapper>
  );
};
export default One;
