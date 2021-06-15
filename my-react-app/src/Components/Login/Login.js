import React from "react";
import Header from "../Header/Header";
import LoginPage from "../LoginPage/LoginPage";
import Logo from "../../img/Logo.png";

const Login = () => {
  return (
    <div className="mainBody">
      <Header headerText="Войти в систему" />
      <div className="mainPage">
        <img src={Logo} alt="Logo" />
        <LoginPage />
      </div>
    </div>
  );
};

export default Login;
