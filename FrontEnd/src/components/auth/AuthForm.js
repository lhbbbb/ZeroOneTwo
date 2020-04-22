import React from 'react';
import styled from 'styled-components';
import { Typography, TextField, Button } from '@material-ui/core';
import { Link } from 'react-router-dom';

const AuthFormWrapper = styled.div``;
const FooterBlock = styled.div`
  margin-top: 2rem;
  text-align: right;
`;
const FormBlock = styled.form`
  display: flex;
  flex-direction: column;
  div + div {
    margin-top: 0.5rem;
  }
  div + button {
    margin-top: 1rem;
  }
`;

const TitleText = {
  login: '로그인',
  register: '회원가입',
};

const AuthForm = ({ type, form, onChange, onSubmit }) => {
  const text = TitleText[type];
  return (
    <AuthFormWrapper>
      <Typography align="left" variant="h4">
        {text}
      </Typography>
      <FormBlock autoComplete="off" onSubmit={onSubmit}>
        <TextField
          name="userEmail"
          label="이메일"
          onChange={onChange}
          value={form.userEmail}
        />
        <TextField
          name="password"
          label="비밀번호"
          type="password"
          autoComplete="new-password"
          onChange={onChange}
          value={form.password}
        />
        {type === 'register' && (
          <TextField
            name="passwordConfirm"
            label="비밀번호 확인"
            type="password"
            autoComplete="new-password"
            onChange={onChange}
            value={form.passwordConfirm}
          />
        )}
        <Button variant="contained" size="medium" color="primary">
          {text}
        </Button>
      </FormBlock>
      <FooterBlock>
        {type === 'login' ? (
          <Link to="/register">회원가입</Link>
        ) : (
          <Link to="/login">로그인</Link>
        )}
      </FooterBlock>
    </AuthFormWrapper>
  );
};

export default AuthForm;
