import React, { useCallback, useEffect, useState } from "react";
import HomeHeader from "../HomeHeader/HomeHeader";
import List from "../List/List";
import Inputs from "../Inputs/Inputs";
import Sort from "../Sort/Sort";
import Filter from "../Filter/Filter";
import { useHistory } from "react-router";
import axios from "axios";
import _ from "lodash";

const HomePage = () => {
  const [note, setNote] = useState([]);
  const [noteTemp, setNoteTemp] = useState([]);
  const [sort, setSort] = useState("default");
  const [sortDirection, setSortDirection] = useState("asc");
  const [styles, setSstyles] = useState("none");
  const [filterStart, setFilterStart] = useState("");
  const [filterEnd, setFilterEnd] = useState("");
  const history = useHistory();
  const token = localStorage.getItem("token");

  const fetchData = useCallback(async () => {
    try {
      await axios
        .get("http://localhost:5000/getNote", {
          headers: { authorization: token },
        })
        .then((res) => {
          setNote(res.data.data);
          setNoteTemp(res.data.data);
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

  const filterNotes = (start, end, array) => {
    const filterArray = array.filter(
      (element) => element.date > start && element.date < end
    );
    return filterArray;
  };

  const sortNotes = (field, direction, array) => {
    const sortArray = _.sortBy(array, field);
    setSstyles("block");
    return direction === "asc" ? sortArray : sortArray.reverse();
  };

  const filterSort = (field, direction, start, end, array) => {
    let arr = [];
    if (field === "default" && !start && !end) {
      arr = array;
      setSstyles("none");
    }

    if (field !== "default" && start && end) {
      arr = filterNotes(start, end, array);
      arr = sortNotes(field, direction, arr);
    }

    if (field !== "default" && !start && !end) {
      arr = sortNotes(field, direction, array);
    }

    if (field === "default" && start && end) {
      arr = filterNotes(start, end, array);
      setSstyles("none");
    }
    setNote(arr);
  };

  const props = {
    sort,
    sortDirection,
    filterSort,
    filterEnd,
    filterStart,
    setNoteTemp,
    noteTemp,
  };
  return (
    <div className="main-body">
      <HomeHeader headerText="Приемы" />
      <Inputs props={props} />
      <Sort
        props={props}
        setSort={setSort}
        setSortDirection={setSortDirection}
        styles={styles}
      />
      <Filter
        props={props}
        setFilterStart={setFilterStart}
        setFilterEnd={setFilterEnd}
      />
      <List props={props} setNoteTemp={setNoteTemp} note={note} />
    </div>
  );
};

export default HomePage;
