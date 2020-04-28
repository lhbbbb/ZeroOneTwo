import React from 'react';
import MainLayout from '../../layouts/MainLayout';
import Result from '../../components/receipt/Result';

const MainPage = () => {
  return (
    <MainLayout title="Main">
      hello world!
      <Result />
    </MainLayout>
  );
};

export default MainPage;
