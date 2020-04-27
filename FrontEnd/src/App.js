import React from 'react';
import { Route } from 'react-router-dom';
import LoginPage from './pages/auth/LoginPage';
import RegisterPage from './pages/auth/RegisterPage';
import BoardListPage from './pages/board/BoardListPage';
import BoardMainPage from './pages/board/BoardMainPage';
import MainPage from './pages/main/MainPage';
import SettingPage from './pages/setting/SettingPage';
import ReceiptInsertPage from './pages/receipt/ReceiptInsertPage';

function App() {
  return (
    <>
      <Route component={LoginPage} path={['/', '/login']} exact />
      <Route component={BoardListPage} path="/board" exact />
      <Route component={BoardMainPage} path="/board/:id" exact />
      <Route component={ReceiptInsertPage} path="/board/:id/insert" />
      <Route component={RegisterPage} path="/register" />
      <Route component={SettingPage} path="/setting" exact />
      <Route component={MainPage} path="/main" />
    </>
  );
}

export default App;
