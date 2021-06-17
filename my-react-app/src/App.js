import { Redirect, Route, Switch } from "react-router-dom";
import LoginPage from "./Components/LoginPage/LoginPage";
import RegistrPage from "./Components/RegistrPage/RegistrPage";
import HomePage from "./Components/HomePage/HomePage";
import "./App.scss";

function App() {
  const isLoggedIn = () => {
    return localStorage.getItem("token");
  };

  return (
    <div className="App">
      <Switch>
        <Route
          path="/login"
          render={() => {
            return !isLoggedIn() ? (
              <LoginPage />
            ) : (
              <Redirect from="/login" to="/home" />
            );
          }}
        />
        <Route
          path="/registr"
          render={() => {
            return !isLoggedIn() ? (
              <RegistrPage />
            ) : (
              <Redirect from="/registr" to="/home" />
            );
          }}
        />
        <Route
          path="/home"
          render={() => {
            return isLoggedIn() ? (
              <HomePage />
            ) : (
              <Redirect from="/home" to="/login" />
            );
          }}
        />
        <Redirect from="/" to="/home" />
        <Route path="*" component={() => "404 NOT FOUND"} />
      </Switch>
    </div>
  );
}

export default App;
