import React from 'react';
import styled from 'styled-components';
import { Typography, TextField, Button } from '@material-ui/core';
import { Link, useHistory } from 'react-router-dom';

import axios from 'axios';
import { useSelector } from 'react-redux';

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
  const history = useHistory();
  const loginData = useSelector((state) => state.auth.login);
  const registerData = useSelector((state) => state.auth.register);

  const postLogin = async () => {
    try {
      return await axios.post('http://13.124.235.236:8000/rest-auth/login/', {
        username: loginData.userEmail,
        password: loginData.password,
      });
    } catch (error) {
      console.error(error);
    }
  };

  const postRegister = async () => {
    try {
      return await axios.post(
        'http://13.124.235.236:8000/rest-auth/registration/',
        {
          username: registerData.userEmail,
          password1: registerData.password,
          password2: registerData.passwordConfirm,
        },
      );
    } catch (error) {
      console.error(error);
    }
  };

  const handleButtonClick = async () => {
    if (type === 'login') {
      const resData = await postLogin();
      console.log(resData);
      history.push('/board');
    } else {
      const resData = await postRegister();
      history.push('/login');
    }
  };

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
        <Button
          variant="contained"
          size="medium"
          color="primary"
          onClick={handleButtonClick}
        >
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
