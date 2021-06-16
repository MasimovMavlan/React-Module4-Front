import React from "react";
import Button from "@material-ui/core/Button";
import { useHistory } from "react-router";
import HeaderImg from "../../img/HeaderImg.png";
import "./HomeHeader.scss";

const HomeHeader = ({ headerText }) => {
  const history = useHistory();

  const logOut = () => {
    localStorage.clear();
    history.push("/login");
  };

  return (
    <div className="home-header">
      <img src={HeaderImg} alt="Logo" />
      <h1>{headerText}</h1>
      <Button variant="contained" onClick={logOut}>
        Выйти
      </Button>
    </div>
  );
};

export default HomeHeader;
