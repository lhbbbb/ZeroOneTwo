import React from 'react';
import { Route } from 'react-router-dom';
import LoginPage from './pages/auth/LoginPage';
import RegisterPage from './pages/auth/RegisterPage';
import BoardPage from './pages/board/BoardPage';

function App() {
  return (
    <>
      <Route component={LoginPage} path={['/', '/login']} exact />
      <Route component={BoardPage} path="/board" />
      <Route component={RegisterPage} path="/register" />
    </>
  );
}

export default App;
