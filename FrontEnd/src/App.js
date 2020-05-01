import React from 'react';
import { Route } from 'react-router-dom';
import LoginPage from './pages/auth/LoginPage';
import RegisterPage from './pages/auth/RegisterPage';
import BoardListPage from './pages/board/BoardListPage';
import BoardMainPage from './pages/board/BoardMainPage';
import MainPage from './pages/main/MainPage';
import ReceiptResultPage from './pages/receipt/ReceiptResultPage';

function App() {
  return (
    <>
      <Route component={LoginPage} path="/login" />
      <Route component={RegisterPage} path="/register" />
      <Route component={BoardListPage} path="/board" exact />
      <Route component={BoardMainPage} path="/board/:id" exact />
      <Route component={MainPage} path={['/main', '/']} exact />
      <Route component={ReceiptResultPage} path="/result" />
    </>
  );
}

export default App;
