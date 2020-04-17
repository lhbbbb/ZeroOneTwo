import React from 'react';
import { Route } from 'react-router-dom';
import LoginPage from './pages/account/LoginPage';
import RegisterPage from './pages/account/RegisterPage';
import BoardPage from './pages/board/BoardPage';

function App() {
  return (
    <>
      <Route component={LoginPage} path={['/', '/login']} exact />
      <Route component={RegisterPage} path="/register" />
      <Route component={BoardPage} path="/board" />
    </>
  );
}

export default App;
