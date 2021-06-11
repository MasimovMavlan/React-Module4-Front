import React from "react";
import Button from "@material-ui/core/Button";
import { useHistory } from "react-router";

const HomeHeader = ({ headerText }) => {
  const history = useHistory();
  const logOut = () => {
    localStorage.clear();
    history.push("/login");
  };
  return (
    <div>
      <h1>{headerText}</h1>
      <Button variant="contained" onClick={logOut}>
        Выйти
      </Button>
    </div>
  );
};

export default HomeHeader;
