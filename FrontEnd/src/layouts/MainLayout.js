import React from 'react';
import styled from 'styled-components';
import MainHeaderBar from '../components/common/MainHeaderBar';

const MainLayoutWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;
const MainLayout = ({ children }) => {
  return (
    <MainLayoutWrapper>
      <MainHeaderBar />
      {children}
    </MainLayoutWrapper>
  );
};

export default MainLayout;
