import { Redirect, Route, Switch } from "react-router-dom";
import Login from "./Components/Login/Login";
import Registr from "./Components/Registr/Registr";
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
              <Login />
            ) : (
              <Redirect from="/login" to="/home" />
            );
          }}
        />

        <Route
          path="/registr"
          render={() => {
            return !isLoggedIn() ? (
              <Registr />
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
