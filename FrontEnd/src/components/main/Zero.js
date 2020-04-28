import React from 'react';
import ZeroImage from '../../assets/zero.jpg';
import styled from 'styled-components';
import { Typography } from '@material-ui/core';

const ZeroWrapper = styled.div`
  width: inherit;
  height: inherit;
  background: url(${ZeroImage}) no-repeat center center;
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

const Zero = () => {
  return (
    <ZeroWrapper>
      <ToneBlock />
      <UpperTypo align="center" variant="h2">
        영(0)수증을
      </UpperTypo>
      <UpperTypo align="center" variant="h5">
        딥러닝 인공지능으로 분석해요
      </UpperTypo>
    </ZeroWrapper>
  );
};

export default Zero;
