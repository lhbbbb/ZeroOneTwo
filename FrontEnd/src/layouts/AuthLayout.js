import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import ReceiptBackground from '../assets/two.jpg';

const AuthLayoutWrapper = styled.div`
  display: flex;
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: url(${ReceiptBackground}) no-repeat center center;
  background-size: cover;
`;
const WhiteBlock = styled.div`
  .logo-area {
    display: block;
    padding-bottom: 2rem;
    text-align: center;
    font-weight: bold;
    letter-spacing: 2px;
  }
  box-shadow: 0 0 8px rgba(0, 0, 0, 0.025);
  padding: 2rem;
  width: 360px;
  background: white;
  border-radius: 2px;
  z-index: 1000;
`;
const ToneBlock = styled.div`
  background-color: rgba(0, 0, 0, 0.6);
  width: 100vw;
  height: 100vh;
  position: absolute;
`;

const AuthLayout = ({ children }) => {
  return (
    <AuthLayoutWrapper>
      <ToneBlock />
      <WhiteBlock>
        <div className="logo-area">
          <Link to="/">ZERO-ONE-TWO</Link>
        </div>
        {children}
      </WhiteBlock>
    </AuthLayoutWrapper>
  );
};

export default AuthLayout;
