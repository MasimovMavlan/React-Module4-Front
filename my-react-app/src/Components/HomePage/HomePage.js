import React, { useState } from "react";
import HomeHeader from "../HomeHeader/HomeHeader";
import List from "../List/List";
import Inputs from "../Inputs/Inputs";
import "./HomePage.scss";

const HomePage = () => {
  const [note, setNote] = useState([]);

  return (
    <div className="main-body">
      <HomeHeader headerText="Приемы" />
      <Inputs note={note} setNote={setNote} />
      <List note={note} setNote={setNote} />
    </div>
  );
};

export default HomePage;
