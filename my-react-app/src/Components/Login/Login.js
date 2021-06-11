import React from "react";
import Header from "../Header/Header";
import LoginPage from "../LoginPage/LoginPage";

const Login = () => {
  return (
    <div>
      <Header headerText="Войти в бар 'Голубая Устрица'" />
      <LoginPage />
    </div>
  );
};

export default Login;
