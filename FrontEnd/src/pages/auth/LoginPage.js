import React from 'react';
import AuthLayout from '../../layouts/AuthLayout';
import LoginForm from '../../containers/auth/LoginForm';

const LoginPage = () => {
  return (
    <AuthLayout>
      <LoginForm />
    </AuthLayout>
  );
};

export default LoginPage;
