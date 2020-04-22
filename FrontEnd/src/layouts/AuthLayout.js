import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

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
`;

const AuthLayout = ({ children }) => {
  return (
    <AuthLayoutWrapper>
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
