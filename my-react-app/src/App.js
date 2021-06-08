import { Redirect, Route, Switch } from "react-router-dom";
import Login from "./Components/Login/Login";
import Registr from "./Components/Registr/Registr";
import HomePage from "./Components/HomePage/HomePage";
import "./App.scss";

function App() {
  return (
    <div className="App">
      <Switch>
        <Route path="/login">
          <Login />
        </Route>
        <Route path="/registr">
          <Registr />
        </Route>
        <Route path="/home">
          <HomePage />
        </Route>
        <Redirect from="/" to="/login" />
      </Switch>
    </div>
  );
}

export default App;
