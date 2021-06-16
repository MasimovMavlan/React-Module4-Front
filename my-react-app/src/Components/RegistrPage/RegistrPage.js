import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import axios from "axios";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import "./RegistrPage.scss";

const RegistrPage = () => {
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const isDisabled = !login || !password || !repeatPassword;
  const regEx1 = /^[0-9a-zA-Z]+$/;
  const regEx2 = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
  const history = useHistory();

  const valueChange = (e, setValue) => {
    setValue(e.target.value.trim());
  };

  const registrUser = async (login, password) => {
    await axios
      .post("http://localhost:5000/registr", {
        user: login,
        password: password,
      })
      .then((res) => {
        localStorage.setItem("token", res.data.token);
        history.push("/home");
      })
      .catch((e) => {
        alert("Такой Логин уже занят, попробуйте другой");
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

  const registrEnter = (e) => {
    if (e.key === "Enter") {
      clickSubmit();
    }
  };

  return (
    <div className="RegistrPage">
      <h2>Регистрация</h2>

      <span className="textForInput">Login:</span>

      <TextField
        variant="outlined"
        value={login}
        type="text"
        placeholder="Введите Логин"
        onChange={(e) => valueChange(e, setLogin)}
        onKeyDown={(e) => registrEnter(e)}
      />

      <span className="textForInput">Password:</span>

      <TextField
        variant="outlined"
        value={password}
        type="password"
        placeholder="Введите Пароль"
        onChange={(e) => valueChange(e, setPassword)}
        onKeyDown={(e) => registrEnter(e)}
      />

      <span className="textForInput">Repeat password:</span>

      <TextField
        variant="outlined"
        value={repeatPassword}
        type="password"
        placeholder="Повторите Пароль"
        onChange={(e) => valueChange(e, setRepeatPassword)}
        onKeyDown={(e) => registrEnter(e)}
      />

      <div className="buttons">
        <Button
          variant="contained"
          disabled={isDisabled}
          onClick={(e) => clickSubmit(e)}
        >
          Зарегистрироваться
        </Button>

        <Link to="/login">Авторизация</Link>
      </div>
    </div>
  );
};
export default RegistrPage;
