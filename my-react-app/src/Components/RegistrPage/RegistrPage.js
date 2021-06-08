import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const RegistrPage = ({ history }) => {
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const isDisabled =
    !login || !password || !repeatPassword || password !== repeatPassword;

  const loginChange = (e) => {
    setLogin(e.target.value);
  };

  const passwordChange = (e) => {
    setPassword(e.target.value);
  };

  const passwordRepeatChange = (e) => {
    setRepeatPassword(e.target.value);
  };

  const registrUser = async (login, password, repeatPassword) => {
    await axios
      .post("http://localhost:5000/registr", {
        user: login,
        password: password,
      })
      .then((res) => {
        alert(res.data.message);
        history.push("/login");
      });
  };

  const clickSubmit = () => {
    registrUser(login, password, repeatPassword);
    setLogin("");
    setPassword("");
    setRepeatPassword("");
  };

  return (
    <div>
      <h2>Регистрация</h2>
      <span>Login:</span>
      <input
        value={login}
        type="text"
        placeholder="Введите Логин"
        onChange={loginChange}
      />
      <span>Password:</span>
      <input
        value={password}
        type="text"
        placeholder="Введите Пароль"
        onChange={passwordChange}
      />
      <span>Repeat password:</span>
      <input
        value={repeatPassword}
        type="text"
        placeholder="Повторите Пароль"
        onChange={passwordRepeatChange}
      />
      <button disabled={isDisabled} onClick={clickSubmit}>
        Зарегистрироваться
      </button>
      <Link to="/login">Авторизация</Link>
    </div>
  );
};
export default RegistrPage;
