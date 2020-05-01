import React from 'react';
import AuthLayout from '../../layouts/AuthLayout';
import RegisterForm from '../../containers/auth/RegisterForm';

const RegisterPage = () => {
  return (
    <AuthLayout>
      <RegisterForm />
    </AuthLayout>
  );
};

export default RegisterPage;
