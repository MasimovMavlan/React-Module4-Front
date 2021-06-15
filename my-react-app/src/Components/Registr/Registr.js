import React from "react";
import Header from "../Header/Header";
import RegistrPage from "../RegistrPage/RegistrPage";
import Logo from "../../img/Logo.png";

const Registr = () => {
  return (
    <div className="mainBody">
      <Header headerText="Зарегистрироваться в системе" />
      <div className="mainPage">
        <img src={Logo} alt="Logo" />
        <RegistrPage />
      </div>
    </div>
  );
};

export default Registr;
