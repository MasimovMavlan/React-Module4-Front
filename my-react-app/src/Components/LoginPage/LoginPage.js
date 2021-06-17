import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import axios from "axios";
import Header from "../Header/Header";
import Logo from "../../img/Logo.png";
import { TextField, Button } from "@material-ui/core";
import "./LoginPage.scss";

const LoginPage = () => {
  const history = useHistory();
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const isDisabled = !login || !password;

  const authUser = async (login, password) => {
    await axios
      .post("http://localhost:5000/login", {
        user: login,
        password: password,
      })
      .then((res) => {
        localStorage.setItem("token", res.data.token);
        history.push("/home");
      })
      .catch((e) => {
        alert("Пароль или Логин не верный");
      });
  };

  const clickSubmit = () => {
    authUser(login, password);
    setLogin("");
    setPassword("");
  };

  const loginEnter = (e) => {
    if (e.key === "Enter") {
      clickSubmit();
    }
  };

  const valueChange = (e, value) => {
    value(e.target.value);
  };

  return (
    <div className="main-body">
      <Header headerText="Войти в систему" />
      <div className="main-page">
        <img src={Logo} alt="Logo" />
        <div className="auth-page login-page">
          <h2>Войти в систему</h2>
          <span className="text-for-input">Login:</span>
          <TextField
            variant="outlined"
            value={login}
            type="text"
            placeholder="Введите Логин"
            onChange={(e) => valueChange(e, setLogin)}
            onKeyDown={(e) => loginEnter(e)}
          />
          <span className="text-for-input">Password:</span>
          <TextField
            variant="outlined"
            value={password}
            type="password"
            placeholder="Введите Пароль"
            onChange={(e) => valueChange(e, setPassword)}
            onKeyDown={(e) => loginEnter(e)}
          />
          <div className="buttons">
            <Button
              variant="outlined"
              disabled={isDisabled}
              onClick={clickSubmit}
            >
              Войти
            </Button>
            <Link to="/registr">Регистрация</Link>
          </div>
        </div>
      </div>
    </div>
  );
};
export default LoginPage;
