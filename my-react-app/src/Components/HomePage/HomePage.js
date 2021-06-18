import React, { useCallback, useEffect, useState } from "react";
import HomeHeader from "../HomeHeader/HomeHeader";
import List from "../List/List";
import Inputs from "../Inputs/Inputs";
import Sort from "../Sort/Sort";
import { useHistory } from "react-router";
import axios from "axios";
import _ from "lodash";

const HomePage = () => {
  const [note, setNote] = useState([]);
  const history = useHistory();
  const token = localStorage.getItem("token");
  const [sort, setSort] = useState("default");
  const [sortDirection, setSortDirection] = useState("asc");
  const [styles, setSstyles] = useState("none");

  const fetchData = useCallback(async () => {
    try {
      await axios
        .get("http://localhost:5000/getNote", {
          headers: { authorization: token },
        })
        .then((res) => {
          setNote(res.data.data);
        });
    } catch (e) {
      if (e.response.status === 403) {
        localStorage.clear();
        history.push("/login");
      }
    }
  }, [history, token]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const sortNotes = (field, direction, array) => {
    if (field !== "default") {
      const sortArray = _.sortBy(array, field);
      setNote(direction === "asc" ? sortArray : sortArray.reverse());
      setSstyles("block");
    } else {
      fetchData();
      setSstyles("none");
    }
  };

  return (
    <div className="main-body">
      <HomeHeader headerText="Приемы" />
      <Inputs
        note={note}
        sort={sort}
        sortDirection={sortDirection}
        sortNotes={sortNotes}
      />
      <Sort
        note={note}
        sort={sort}
        sortDirection={sortDirection}
        sortNotes={sortNotes}
        setSort={setSort}
        setSortDirection={setSortDirection}
        styles={styles}
      />
      <List
        note={note}
        sort={sort}
        sortDirection={sortDirection}
        sortNotes={sortNotes}
      />
    </div>
  );
};

export default HomePage;
