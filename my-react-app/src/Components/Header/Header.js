import React from "react";
import HeaderImg from "../../img/HeaderImg.png";
import "./Header.scss";

const Header = ({ headerText }) => {
  return (
    <div className="header">
      <img src={HeaderImg} alt="Logo" />
      <h1>{headerText}</h1>
    </div>
  );
};

export default Header;
