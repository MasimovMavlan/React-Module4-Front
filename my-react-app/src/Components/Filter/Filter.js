import React, { useState } from "react";
import { TextField, Button } from "@material-ui/core";
import "./Filter.scss";

const Filter = ({ options, setFilterStart, setFilterEnd }) => {
  const { sort, sortDirection, filterSort, filterEnd, filterStart, noteTemp } =
    options;
  const [filterBlock, setFilterBlock] = useState(true);

  const handleFilterStart = (e) => {
    setFilterStart(e.target.value);
  };

  const handleFilterEnd = (e) => {
    setFilterEnd(e.target.value);
  };

  const handleFilterBlock = () => {
    setFilterBlock(false);
  };

  const handleFilterCancel = () => {
    setFilterBlock(true);
    setFilterStart("");
    setFilterEnd("");
    filterSort(sort, sortDirection, "", "", noteTemp);
  };

  const handleFilter = (e) => {
    filterSort(sort, sortDirection, filterStart, filterEnd, noteTemp);
  };

  if (filterBlock) {
    return (
      <div className="FilterButton">
        <span>Добавить фильтр по дате:</span>
        <Button variant="contained" onClick={() => handleFilterBlock()}>
          +
        </Button>
      </div>
    );
  } else {
    return (
      <div className="FilterList">
        <span>C:</span>
        <TextField
          variant="outlined"
          type="date"
          onChange={(e) => handleFilterStart(e)}
        />
        <span>По:</span>
        <TextField
          variant="outlined"
          type="date"
          onChange={(e) => handleFilterEnd(e)}
        />
        <Button variant="contained" onClick={() => handleFilter()}>
          Фильтровать
        </Button>
        <Button variant="contained" onClick={() => handleFilterCancel()}>
          Отменить
        </Button>
      </div>
    );
  }
};

export default Filter;
