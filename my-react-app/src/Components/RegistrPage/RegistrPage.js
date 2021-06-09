import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const RegistrPage = ({ history }) => {
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const isDisabled = !login || !password || !repeatPassword;
  const regEx1 = /^[0-9a-zA-Z]+$/;
  const regEx2 = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;

  const loginChange = (e) => {
    setLogin(e.target.value.trim());
  };

  const passwordChange = (e) => {
    setPassword(e.target.value.trim());
  };

  const passwordRepeatChange = (e) => {
    setRepeatPassword(e.target.value.trim());
  };

  const registrUser = async (login, password) => {
    await axios
      .post("http://localhost:5000/registr", {
        user: login,
        password: password,
      })
      .then((res) => {
        alert(res.data.message);
      })
      .catch((e) => {
        alert("Такой Логин уже занят, попробуйте другой");
      })
      .then((res) => {
        axios
          .post("http://localhost:5000/login", {
            user: login,
            password: password,
          })
          .then(() => {
            history.push("/home");
          });
      });
  };

  const clickSubmit = () => {
    if (
      !login.match(regEx1) ||
      !password.match(regEx1) ||
      !repeatPassword.match(regEx1)
    ) {
      alert(
        "Недопустимые символы. Используйте буквы латинского алфавита и цифры"
      );
    } else if (password !== repeatPassword) {
      alert("Пароли не совпадают");
    } else if (!password.match(regEx2)) {
      alert(
        "Пароль должен состоять из минимум восьми символов, по крайней мере одной заглавной буквы, одной строчной буквы и одной цифры"
      );
    } else {
      registrUser(login, password, repeatPassword);
      setLogin("");
      setPassword("");
      setRepeatPassword("");
    }
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
        type="password"
        placeholder="Введите Пароль"
        onChange={passwordChange}
      />
      <span>Repeat password:</span>
      <input
        value={repeatPassword}
        type="password"
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
