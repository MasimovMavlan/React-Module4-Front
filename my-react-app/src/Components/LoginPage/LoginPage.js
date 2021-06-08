import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const LoginPage = ({ history }) => {
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
        alert(res.data.message);
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

  const loginChange = (e) => {
    setLogin(e.target.value);
  };

  const passwordChange = (e) => {
    setPassword(e.target.value);
  };

  return (
    <div>
      <h2>Войти в систему</h2>
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
      <button disabled={isDisabled} onClick={clickSubmit}>
        Войти
      </button>
      <Link to="/registr">Регистрация</Link>
    </div>
  );
};
export default LoginPage;
