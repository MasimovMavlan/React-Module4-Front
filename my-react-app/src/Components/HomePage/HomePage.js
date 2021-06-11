import React, { useState } from "react";
import HomeHeader from "../HomeHeader/HomeHeader";
import List from "../List/List";
import Inputs from "../Inputs/Inputs";

const HomePage = () => {
  const [note, setNote] = useState([]);

  return (
    <div>
      <HomeHeader headerText="Запись на прием в баре 'Голубая Устрица'" />
      <Inputs note={note} setNote={setNote} />
      <List note={note} setNote={setNote} />
    </div>
  );
};

export default HomePage;
